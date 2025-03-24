import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import axios from 'axios';
import { IHubSpotWebhook, IYPareoCandidat } from './types';
import { transformToYPareoFormat } from './transformers';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// YPareo API configuration
const YPAREO_BASE_URL = process.env.YPAREO_BASE_URL;
const YPAREO_TOKEN = process.env.YPAREO_TOKEN;

// Endpoint to receive HubSpot webhook
app.post('/webhook', async (req: Request, res: Response) => {
  try {
    console.log('Received webhook from HubSpot:', JSON.stringify(req.body, null, 2));
    
    // Extract data from HubSpot webhook
    const hubspotData = req.body as IHubSpotWebhook;
    
    // Transform HubSpot data to YPareo format
    const ypareoCandidat = transformToYPareoFormat(hubspotData);
    
    console.log('Transformed data for YPareo:', JSON.stringify(ypareoCandidat, null, 2));
    
    // In development, we can skip the actual API call to YPareo
    // and just log what would be sent
    if (process.env.NODE_ENV === 'production') {
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
    } else {
      console.log('Development mode: Skipping actual API call to YPareo');
    }
    
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('Error processing webhook:', error instanceof Error ? error.message : 'Unknown error');
    console.error(error instanceof Error ? error.stack : '');
    res.status(500).send('Error processing webhook');
  }
});

// Simple endpoint to test if the server is running
app.get('/', (_req: Request, res: Response) => {
  res.send('HubSpot to YPareo integration is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the webhook at: http://localhost:${PORT}/webhook`);
});