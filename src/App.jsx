import React, { useState, useEffect } from 'react';
import { loadEvents, saveEvents, addSignup } from './utils/dataUtils';
import CalendarView from './components/CalendarView';
import SignupForm from './components/SignupForm';
import ExportButtons from './components/ExportButtons';
import MessageToast from './components/MessageToast';

function App() {
  const [events, setEvents] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toast, setToast] = useState(null);

  // Load events data on startup (from localStorage or sample file)
  useEffect(() => {
    const initData = async () => {
      try {
        const initialEvents = await loadEvents();
        setEvents(initialEvents);
      } catch (err) {
        console.error('Error loading events:', err);
        setToast({ message: 'Failed to load events data.', type: 'error' });
        setEvents([]); // proceed with empty data
      }
    };
    initData();
  }, []);

  // Handle click on an event (time slot) in the calendar
  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    const eventObj = events.find(e => e.id == eventId);
    if (!eventObj) return;
    // If event is full, show an error toast; otherwise open the signup form
    if (eventObj.signups.length >= eventObj.capacity) {
      setToast({ message: 'This time slot is fully booked!', type: 'error' });
    } else {
      setSelectedEvent(eventObj);
    }
  };

  // Handle submission of the signup form
  const handleSignupSubmit = (name) => {
    if (!selectedEvent) return;
    const updatedEvents = addSignup(events, selectedEvent.id, name);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    // Show success message and close form
    setToast({ message: `Signed up for ${selectedEvent.title} successfully!`, type: 'success' });
    setSelectedEvent(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Export buttons at top-right */}
      <div className="flex justify-end p-2 bg-gray-100">
        {events && <ExportButtons events={events} />}
      </div>
      {/* Calendar view filling the rest of the screen */}
      <div className="flex-1">
        {events && (
          <CalendarView
            events={events}
            initialDate={events.length ? events[0].start : undefined}
            onEventClick={handleEventClick}
          />
        )}
      </div>
      {/* Signup form modal, shown when an event is selected for sign-up */}
      {selectedEvent && (
        <SignupForm
          event={selectedEvent}
          onSubmit={handleSignupSubmit}
          onCancel={() => setSelectedEvent(null)}
        />
      )}
      {/* Toast message for notifications */}
      {toast && (
        <MessageToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
