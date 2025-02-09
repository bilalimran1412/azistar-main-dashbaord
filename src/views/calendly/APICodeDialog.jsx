// pages/api/calendly.js
import axios from 'axios';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    try {
      const response = await axios.post(
        'https://api.calendly.com/invitee_no_shows',
        body,
        {
          headers: {
            'Authorization': `Bearer YOUR_CALDENDLY_API_KEY`,
            'Content-Type': 'application/json'
          }
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Calendly API error:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}