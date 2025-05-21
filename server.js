import express from 'express';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the dist directory
app.use(express.static('dist'));

// Endpoint to update events.json
app.post('/api/events', async (req, res) => {
  try {
    const events = req.body;
    // Keep all event data including signups
    const updatedEvents = events.map(event => {
      const filledSpots = event.signups.length;
      return {
        ...event,
        title: `${event.activity} (${filledSpots}/${event.capacity} spots filled)`,
        color: filledSpots === event.capacity ? '#9E9E9E' : (event.originalColor || event.color)
      };
    });
    
    await writeFile(
      join(__dirname, 'public', 'events.json'),
      JSON.stringify(updatedEvents, null, 2)
    );
    
    // Send back the updated events
    res.json(updatedEvents);
  } catch (error) {
    console.error('Error saving events:', error);
    res.status(500).json({ error: 'Failed to save events' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
