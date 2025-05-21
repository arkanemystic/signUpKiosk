import _ from 'lodash';

// Load events from events.json and merge with localStorage data
export async function loadEvents() {
  try {
    // Always fetch the latest events.json
    const response = await fetch('/events.json');
    if (!response.ok) throw new Error('Could not fetch events.json');
    const baseEvents = await response.json();
    
    // Get stored signups from localStorage
    const stored = localStorage.getItem('events');
    if (stored) {
      const storedEvents = JSON.parse(stored);
      // Merge base events with stored signups
      const mergedEvents = baseEvents.map(baseEvent => {
        const storedEvent = storedEvents.find(e => e.id === baseEvent.id);
        if (storedEvent) {
          // Keep the base event data but use stored signups
          return {
            ...baseEvent,
            signups: storedEvent.signups,
            title: `${baseEvent.activity} (${storedEvent.signups.length}/${baseEvent.capacity} spots left)`,
            color: storedEvent.signups.length >= baseEvent.capacity ? '#9E9E9E' : '#4CAF50'
          };
        }
        return baseEvent;
      });
      return mergedEvents;
    }
    return baseEvents;
  } catch (error) {
    console.error('Error loading events:', error);
    // If we can't load from events.json, try to use localStorage as fallback
    const stored = localStorage.getItem('events');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Corrupted localStorage data');
        localStorage.removeItem('events');
      }
    }
    // If all else fails, return an empty array
    return [];
  }
}

// Save events both to localStorage and events.json
export async function saveEvents(events) {
  // Save to localStorage
  localStorage.setItem('events', JSON.stringify(events));
  
  // Save to events.json via server
  try {
    const response = await fetch('http://localhost:3000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(events),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save events to server');
    }
  } catch (error) {
    console.error('Error saving to events.json:', error);
    // Continue even if server save fails - data is still in localStorage
  }
}

// Add a signup (name) to an event if space is available
export function addSignup(events, eventId, name) {
  const updatedEvents = events.map(event => {
    // Convert both IDs to numbers to ensure consistent comparison
    if (Number(event.id) === Number(eventId) && event.signups.length < event.capacity) {
      const newSignups = [...event.signups, { name }];
      const isFull = newSignups.length >= event.capacity;
      const spotsLeft = event.capacity - newSignups.length;

      return {
        ...event,
        signups: newSignups,
        title: `${event.activity} (${spotsLeft}/${event.capacity} spots left)`,
        color: isFull ? '#9E9E9E' : '#4CAF50', // Gray if full, Green if available
      };
    }
    return event;
  });
  return updatedEvents;
}

// Generate sample events programmatically
export function generateSampleEvents() {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const activities = ['Yoga', 'Dance', 'Painting', 'Meditation', 'Pilates', 'Book Club', 'Cooking Class'];
  const capacities = [5, 8, 12, 10, 6, 15, 20];
  let id = 1;
  const events = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    ['09:00', '14:00', '18:00'].forEach(time => {
      const activity = activities[Math.floor(Math.random() * activities.length)];
      const capacity = capacities[activities.indexOf(activity)];
      const [hour, minute] = time.split(':');
      const start = new Date(day);
      start.setHours(+hour, +minute);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 90);

      events.push({
        id: id++,
        title: `${activity} (${capacity}/${capacity} spots left)`,
        activity,
        start: start.toISOString(),
        end: end.toISOString(),
        capacity,
        signups: [],
        color: '#4CAF50',
      });
    });
  }

  return events;
}
