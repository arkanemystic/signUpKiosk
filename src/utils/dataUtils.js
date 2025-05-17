import _ from 'lodash';

// Load events from localStorage or from /public/events.json
export async function loadEvents() {
  const stored = localStorage.getItem('events');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Corrupted localStorage data');
      localStorage.removeItem('events');
    }
  }

  const response = await fetch('/events.json');
  if (!response.ok) throw new Error('Could not fetch events.json');
  const data = await response.json();
  localStorage.setItem('events', JSON.stringify(data));
  return data;
}

// Save events to localStorage
export function saveEvents(events) {
  localStorage.setItem('events', JSON.stringify(events));
}

// Add a signup (name) to an event if space is available
export function addSignup(events, eventId, name) {
  const updatedEvents = events.map(event => {
    if (event.id === eventId && event.signups.length < event.capacity) {
      const newSignups = [...event.signups, { name }];
      const isFull = newSignups.length >= event.capacity;

      return {
        ...event,
        signups: newSignups,
        classNames: isFull ? ['full-event'] : [],
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
