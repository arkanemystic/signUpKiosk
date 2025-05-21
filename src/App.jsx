import React, { useState, useEffect } from 'react';
import CalendarView from './components/CalendarView';
import SignupForm from './components/SignupForm';
import MessageToast from './components/MessageToast';
import AdminControls from './components/AdminControls';
import TagFilter from './components/TagFilter';
import { loadEvents, saveEvents, addSignup } from './utils/dataUtils';
import { exportToJSON, exportToCSV } from './utils/exportUtils';
import { getTagColor } from './utils/tagsConfig';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userName, setUserName] = useState('');
  const [toast, setToast] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

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

  const handleSignup = async () => {
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
    try {
      const updated = addSignup(events, selectedEvent.id, userName.trim());
      const savedEvents = await saveEvents(updated);
      setEvents(savedEvents);
      setToast({ message: `Thank you! You've successfully signed up for ${selectedEvent.activity}.`, type: 'success' });
      setSelectedEvent(null);
    } catch (error) {
      setToast({ message: 'Failed to sign up. Please try again.', type: 'error' });
    }
  };

  const handleAddActivity = async (newActivity) => {
    try {
      const updatedEvents = [...events, newActivity];
      const savedEvents = await saveEvents(updatedEvents);
      setEvents(savedEvents);
      setToast({ message: 'New activity added successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to add activity. Please try again.', type: 'error' });
    }
  };

  // Handle data reset
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all data? This will clear all signups.')) {
      try {
        // Save events with cleared signups
        // Reset all events to their initial state
        const resetEvents = events.map(event => ({
          ...event,
          signups: [],
          title: `${event.activity} (0/${event.capacity} spots filled)`,
          color: event.originalColor || getTagColor(event.tag)
        }));
        const savedEvents = await saveEvents(resetEvents);
        setEvents(savedEvents);
        setToast({ message: 'All data has been reset', type: 'success' });
      } catch (error) {
        setToast({ message: 'Failed to reset data. Please try again.', type: 'error' });
      }
    }
  };

  // Filter events based on selected tags
  const filteredEvents = events.filter(event => 
    selectedTags.length === 0 || selectedTags.includes(event.tag)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <img src="/SSSGC-Logo.png" alt="SSSGC Logo" className="h-20 w-auto" />
            <h1 className="text-3xl font-bold text-center text-blue-800">Seva Signup Kiosk</h1>
          </div>
        </header>

        <div className="mb-4">
          <TagFilter 
            selectedTags={selectedTags} 
            onTagChange={setSelectedTags}
          />
        </div>

        <div className="flex-1">
          <CalendarView
            events={filteredEvents}
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