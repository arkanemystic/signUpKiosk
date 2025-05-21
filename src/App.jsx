import React, { useState, useEffect } from 'react';
import CalendarView from './components/CalendarView';
import SignupForm from './components/SignupForm';
import MessageToast from './components/MessageToast';
import AdminControls from './components/AdminControls';
import { loadEvents, saveEvents, addSignup } from './utils/dataUtils';
import { exportToJSON, exportToCSV } from './utils/exportUtils';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userName, setUserName] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await loadEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo) => {
    // Convert eventId to number since FullCalendar passes it as string
    const eventId = parseInt(clickInfo.event.id, 10);
    const clickedEvent = events.find(e => e.id === eventId);
    
    if (!clickedEvent) {
      console.error('Event not found:', eventId);
      return;
    }

    if (clickedEvent.signups.length >= clickedEvent.capacity) {
      setToast({ message: 'This slot is full!', type: 'error' });
    } else {
      setSelectedEvent(clickedEvent);
      setUserName('');
    }
  };

  const handleSignup = () => {
    // Validate name input
    if (!userName || userName.trim() === '') {
      setToast({ message: 'Please enter your name.', type: 'error' });
      return;
    }

    // Check for duplicate signup
    const isDuplicate = selectedEvent.signups.some(
      signup => (typeof signup === 'string' ? signup : signup.name).toLowerCase() === userName.trim().toLowerCase()
    );
    if (isDuplicate) {
      setToast({ message: 'You have already signed up for this activity.', type: 'error' });
      return;
    }

    // Proceed with signup
    const updated = addSignup(events, selectedEvent.id, userName.trim());
    setEvents(updated);
    saveEvents(updated);
    setToast({ message: 'Signup successful!', type: 'success' });
    setSelectedEvent(null);
  };

  const handleAddActivity = (newActivity) => {
    const updatedEvents = [...events, newActivity];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setToast({ message: 'New activity added successfully!', type: 'success' });
  };

  // Handle data reset
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all data? This will clear all signups.')) {
      localStorage.removeItem('events');
      const data = await loadEvents(); // This will reload from events.json
      setEvents(data);
      setToast({ message: 'All data has been reset', type: 'success' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-blue-800">Activity Signup Kiosk</h1>
        </header>

        <div className="flex-1">
          <CalendarView
            events={events}
            initialDate={events.length ? events[0].start : undefined}
            onEventClick={handleEventClick}
          />
        </div>

        {selectedEvent && (
          <SignupForm
            event={selectedEvent}
            userName={userName}
            onUserNameChange={setUserName}
            onClose={() => setSelectedEvent(null)}
            onSignup={handleSignup}
          />
        )}

        {toast && (
          <MessageToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <AdminControls 
          events={events}
          onExportJSON={() => exportToJSON(events)}
          onExportCSV={() => exportToCSV(events)}
          onReset={handleReset}
          onAddActivity={handleAddActivity}
        />
      </div>
    </div>
  );
}

export default App;