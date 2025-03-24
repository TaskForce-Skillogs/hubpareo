import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { IHubSpotWebhook } from './types';
import { transformToYPareoFormat } from './transformers';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// YPareo API configuration
const YPAREO_BASE_URL = process.env.YPAREO_BASE_URL;
const YPAREO_TOKEN = process.env.YPAREO_TOKEN;

// Endpoint to receive HubSpot webhook
app.post('/webhook', async (req, res) => {
  try {
    // Extract data from HubSpot webhook
    const hubspotData = req.body as IHubSpotWebhook;
    
    // Transform HubSpot data to YPareo format
    const ypareoCandidat = transformToYPareoFormat(hubspotData);
    
    // Send data to YPareo
    const response = await axios.post(
      `${YPAREO_BASE_URL}/r/v1/preinscription/candidat`,
      ypareoCandidat,
      {
        headers: {
          'X-Auth-Token': YPAREO_TOKEN as string,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Candidate created in YPareo:', response.data);
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

// Simple endpoint to test if the server is running
app.get('/', (req, res) => {
  res.send('HubSpot to YPareo integration is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});