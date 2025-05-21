import React, { useState } from 'react';
import { Save, FileText, RefreshCw, Settings, Plus } from 'lucide-react';
import ActivityForm from './ActivityForm';

const AdminControls = ({ events, onExportJSON, onExportCSV, onReset, onAddActivity }) => {
  const [showControls, setShowControls] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <button
        onClick={() => setShowControls(!showControls)}
        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg mb-2"
        aria-label="Toggle admin controls"
      >
        <Settings size={24} />
      </button>

      {showControls && (
        <div className="bg-white rounded-lg shadow-xl p-4 mb-2 space-y-2">
          <h3 className="text-lg font-semibold mb-3">Admin Controls</h3>
          
          <div className="space-y-2">
            <button 
              onClick={() => setShowActivityForm(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <Plus className="mr-2" size={20} />
              Add New Activity
            </button>
            
            <button 
              onClick={onExportJSON} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <Save className="mr-2" size={20} />
              Export to JSON
            </button>
            
            <button 
              onClick={onExportCSV} 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <FileText className="mr-2" size={20} />
              Export to CSV
            </button>
            
            <button 
              onClick={onReset} 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <RefreshCw className="mr-2" size={20} />
              Reset All Data
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Total Events: {events.length}</p>
            <p>Total Signups: {events.reduce((acc, event) => acc + event.signups.length, 0)}</p>
          </div>
        </div>
      )}

      {showActivityForm && (
        <ActivityForm
          onClose={() => setShowActivityForm(false)}
          onSubmit={onAddActivity}
        />
      )}
    </div>
  );
};

export default AdminControls;
