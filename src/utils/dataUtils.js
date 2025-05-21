import _ from 'lodash';
import { getTagColor } from './tagsConfig';

// Load events directly from events.json
export async function loadEvents() {
  try {
    const response = await fetch('/events.json');
    if (!response.ok) throw new Error('Could not fetch events.json');
    const events = await response.json();
    
    // Process events to ensure proper color handling
    return events.map(event => {
      const filledSpots = event.signups.length;
      return {
        ...event,
        title: `${event.activity} (${filledSpots}/${event.capacity} spots filled)`,
        originalColor: getTagColor(event.tag),
        color: filledSpots === event.capacity ? '#9E9E9E' : event.originalColor || getTagColor(event.tag)
      };
    });
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
}

// Save events directly to events.json
export async function saveEvents(events) {
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
    
    // Get the updated events directly from the response
    const savedEvents = await response.json();
    return savedEvents.map(event => ({
      ...event,
      originalColor: getTagColor(event.tag),
      color: event.signups.length >= event.capacity ? '#9E9E9E' : getTagColor(event.tag)
    }));
  } catch (error) {
    console.error('Error saving events:', error);
    throw error;
  }
}

// Add a signup (name) to an event if space is available
export function addSignup(events, eventId, name) {
  const updatedEvents = events.map(event => {
    // Convert both IDs to numbers to ensure consistent comparison
    if (Number(event.id) === Number(eventId) && event.signups.length < event.capacity) {
      const newSignups = [...event.signups, { name }];
      const filledSpots = newSignups.length;

      return {
        ...event,
        signups: newSignups,
        title: `${event.activity} (${filledSpots}/${event.capacity} spots filled)`,
        color: filledSpots === event.capacity ? '#9E9E9E' : event.originalColor || getTagColor(event.tag),
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
        title: `${activity} (0/${capacity} spots filled)`,
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
