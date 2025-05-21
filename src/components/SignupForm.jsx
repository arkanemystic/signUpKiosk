import React from 'react';
import { X } from 'lucide-react';

const SignupForm = ({ event, userName, onUserNameChange, onClose, onSignup }) => {
  if (!event) return null;

  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const filledSpots = event.signups.length;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    onSignup();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{event.activity} Signup</h2>
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
            <span className="font-semibold">Date:</span> {startDate.toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Time:</span> {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div>
            <span className="font-semibold">Spots filled:</span> {filledSpots} of {event.capacity}
          </div>

          <div className="mt-6">
            <label htmlFor="name" className="block text-gray-700 mb-2 text-lg">Your Name</label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => onUserNameChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 py-3 px-5 rounded-lg text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg text-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;