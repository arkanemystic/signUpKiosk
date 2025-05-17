import React from 'react';
import { Save, FileText } from 'lucide-react';

const ExportButtons = ({ onExportJSON, onExportCSV }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button 
        onClick={onExportJSON} 
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow flex items-center text-lg"
      >
        <Save className="mr-2" size={20} />
        Export to JSON
      </button>
      <button 
        onClick={onExportCSV} 
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow flex items-center text-lg"
      >
        <FileText className="mr-2" size={20} />
        Export to CSV
      </button>
    </div>
  );
};

export default ExportButtons;