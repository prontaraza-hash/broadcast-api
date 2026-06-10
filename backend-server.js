require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Health Check
app.get('/', (req, res) => {
      res.json({
              status: 'OK',
              message: 'Line OA Broadcast API is running',
              timestamp: new Date().toISOString()
      });
});

// Webhook from Line OA
app.post('/api/line-webhook', (req, res) => {
      try {
              const events = req.body.events;
              console.log(`Received ${events.length} events`);
              res.json({ message: 'Webhook processed', count: events.length });
      } catch (error) {
              console.error('Webhook error:', error);
              res.status(500).json({ error: error.message });
      }
});

// Analytics endpoint
app.get('/api/analytics/health', (req, res) => {
      res.json({
              service: 'analytics',
              status: 'operational'
      });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});
