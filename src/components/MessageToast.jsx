import React from 'react';

const MessageToast = ({ message, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg animate-fade-in">
      {message}
    </div>
  );
};

export default MessageToast;