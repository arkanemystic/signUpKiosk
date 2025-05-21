# Local Kiosk Signup Web App

A React-based touchscreen kiosk application for managing activity signups. Built with Vite, React, and FullCalendar, this app allows users to sign up for scheduled activities while offline, featuring a weekly calendar view and local data persistence.

## Features

- 📅 Weekly calendar view with parallel activity time blocks
- 👆 Tap-to-signup interaction
- 🔄 Live updates of availability
- 🔲 Automatic greying out of fully booked slots
- 💾 Local data persistence (works offline)
- 📊 Export capabilities (JSON/CSV)
- ⚡ Lightweight and server-independent
- 🎯 Touch-optimized interface

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd signupWebApp
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Run both the frontend and backend servers:
```bash
npm run dev:all
```

This starts:
- Vite dev server (frontend) at http://localhost:5173
- Express server (backend) at http://localhost:3000

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The app will be available at http://localhost:3000

## Usage

### Managing Activities

1. **View Activities**
   - Open the calendar view to see all scheduled activities
   - Green slots are available
   - Grey slots are full

2. **Add New Activities**
   - Click the settings gear (⚙️) in bottom right
   - Click "Add New Activity"
   - Fill in:
     - Activity name
     - Capacity
     - Date
     - Start/End times

3. **Signing Up**
   - Tap any available (green) slot
   - Enter your name
   - Click "Sign Up"

4. **Exporting Data**
   - Click the settings gear (⚙️)
   - Choose:
     - "Export to JSON" for full data backup
     - "Export to CSV" for spreadsheet-compatible format

### Data Management

Activities can be managed in two ways:

1. **Through the UI**
   - All changes persist to both localStorage and events.json
   - Signup data stays in localStorage only

2. **Direct File Edit**
   - Edit `/public/events.json` for permanent changes
   - Restart the app to load changes

## Project Structure

```
signupWebApp/
├── public/
│   └── events.json       # Base activity data
├── src/
│   ├── components/       # React components
│   │   ├── ActivityForm.jsx
│   │   ├── AdminControls.jsx
│   │   ├── CalendarView.jsx
│   │   ├── ExportButtons.jsx
│   │   ├── MessageToast.jsx
│   │   └── SignupForm.jsx
│   ├── utils/           # Utility functions
│   │   ├── dataUtils.js
│   │   └── exportUtils.js
│   ├── App.jsx          # Main application
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── server.js            # Express server for data persistence
└── vite.config.js       # Vite configuration
```

## Technical Details

- **Frontend**: React 18 with Vite
- **UI Framework**: Tailwind CSS
- **Calendar**: FullCalendar
- **Icons**: Lucide React
- **Backend**: Express (minimal, for file operations)
- **Data Storage**: localStorage + JSON file
- **Build Tool**: Vite

## Development

### Adding New Features

1. Frontend components go in `src/components/`
2. Utility functions go in `src/utils/`
3. Server endpoints go in `server.js`

### Modifying the Calendar

1. Calendar configuration is in `CalendarView.jsx`
2. Base event data is in `public/events.json`
3. Event handling is in `App.jsx`

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
