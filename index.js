// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// YPareo API configuration
const YPAREO_BASE_URL = process.env.YPAREO_BASE_URL;
const YPAREO_TOKEN = process.env.YPAREO_TOKEN;

// Endpoint to receive HubSpot webhook
app.post('/webhook', async (req, res) => {
  try {
    console.log('Received webhook from HubSpot:', JSON.stringify(req.body, null, 2));
    
    // Extract data from HubSpot webhook
    const hubspotData = req.body;
    
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
            'X-Auth-Token': YPAREO_TOKEN,
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
    console.error('Error processing webhook:', error.message);
    console.error(error.stack);
    res.status(500).send('Error processing webhook');
  }
});

// Simple endpoint to test if the server is running
app.get('/', (req, res) => {
  res.send('HubSpot to YPareo integration is running!');
});

// Function to transform HubSpot data to YPareo format
function transformToYPareoFormat(hubspotData) {
  // Example mapping - you'll need to adjust based on your actual HubSpot data structure
  let properties = {};
  
  // Handle different HubSpot webhook formats
  if (hubspotData.properties) {
    // Newer HubSpot webhook format
    properties = hubspotData.properties;
  } else if (hubspotData.object && hubspotData.object.properties) {
    // Another possible format
    properties = hubspotData.object.properties;
  }
  
  return {
    "idSite": "1", // Site ID from YPareo
    "codeCiviliteApprenant": properties.gender === "male" ? 1 : 2,
    "nomApprenant": properties.lastname || properties.name || "Unknown",
    "prenomApprenant": properties.firstname || "Unknown",
    "idNationalite": "250", // Default to French nationality
    "adresse1Appr": properties.address || properties.street || "",
    "cpAppr": properties.zip || properties.postal_code || "",
    "villeAppr": properties.city || "",
    "tel1Appr": properties.phone || properties.mobilephone || "",
    "emailAppr": properties.email || "",
    "dateNaissance": formatDate(properties.date_of_birth || properties.birthdate || ""),
    "idFormationSouhait1": "123", // Map to appropriate formation ID
    // Add more fields as needed...
  };
}

// Format date from YYYY-MM-DD to DD/MM/YYYY
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  } catch (e) {
    console.error('Error formatting date:', e);
    return '';
  }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the webhook at: http://localhost:${PORT}/webhook`);
});