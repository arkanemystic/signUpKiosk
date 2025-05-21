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
    // Remove signup data before saving to events.json
    const baseEvents = events.map(event => ({
      ...event,
      signups: [], // Reset signups when saving to events.json
      title: `${event.activity} (${event.capacity}/${event.capacity} spots left)`,
      color: '#4CAF50'
    }));
    
    await writeFile(
      join(__dirname, 'public', 'events.json'),
      JSON.stringify(baseEvents, null, 2)
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving events:', error);
    res.status(500).json({ error: 'Failed to save events' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
