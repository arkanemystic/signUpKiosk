import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ACTIVITY_TAGS, getTagColor } from '../utils/tagsConfig';

const ActivityForm = ({ onClose, onSubmit }) => {
  const [activity, setActivity] = useState({
    activity: '',
    capacity: 5,
    date: '',
    startTime: '',
    endTime: '',
    tag: Object.keys(ACTIVITY_TAGS)[0] // Default to first tag
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDateTime = new Date(`${activity.date}T${activity.startTime}`);
    const endDateTime = new Date(`${activity.date}T${activity.endTime}`);

    const newActivity = {
      id: Date.now(),
      title: `${activity.activity} (0/${activity.capacity} spots filled)`,
      activity: activity.activity,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      capacity: parseInt(activity.capacity),
      signups: [],
      tag: activity.tag,
      color: getTagColor(activity.tag),
      originalColor: getTagColor(activity.tag)
    };

    onSubmit(newActivity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Activity</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Activity Name</label>
            <input
              type="text"
              required
              value={activity.activity}
              onChange={(e) => setActivity({...activity, activity: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="e.g., Seva, Bhajan, etc."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Activity Type</label>
            <select
              required
              value={activity.tag}
              onChange={(e) => setActivity({...activity, tag: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              {Object.entries(ACTIVITY_TAGS).map(([key, tag]) => (
                <option key={key} value={key}>
                  {tag.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Capacity</label>
            <input
              type="number"
              required
              min="1"
              value={activity.capacity}
              onChange={(e) => setActivity({...activity, capacity: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              required
              value={activity.date}
              onChange={(e) => setActivity({...activity, date: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                required
                value={activity.startTime}
                onChange={(e) => setActivity({...activity, startTime: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                required
                value={activity.endTime}
                onChange={(e) => setActivity({...activity, endTime: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
