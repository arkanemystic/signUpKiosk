// Export data to JSON file
export const exportToJSON = (events) => {
  const dataStr = JSON.stringify(events, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'events.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export data to CSV
export const exportToCSV = (events) => {
  // Format data for CSV
  const csvRows = [];
  
  // Add header row
  const headers = ['Activity', 'Date', 'Start Time', 'End Time', 'Capacity', 'Signups', 'Spots Left'];
  csvRows.push(headers.join(','));
  
  // Add data rows
  events.forEach(event => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    
    const row = [
      `"${event.activity}"`,
      `"${startDate.toLocaleDateString()}"`,
      `"${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}"`,
      `"${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}"`,
      event.capacity,
      `"${event.signups.map(s => s.name).join(', ')}"`,
      event.capacity - event.signups.length
    ];
    
    csvRows.push(row.join(','));
  });
  
  // Create and download CSV file
  const csvString = csvRows.join('\n');
  const csvBlob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(csvBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'kiosk_signups.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Format time for display
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};