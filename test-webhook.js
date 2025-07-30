const axios = require('axios');
const fs = require('fs');

async function testWebhook() {
  try {
    // First, check if server is running
    try {
      const healthCheck = await axios.get('http://localhost:3002/');
      console.log('✅ Server is running:', healthCheck.data);
    } catch (error) {
      console.log('❌ Server is not running. Please start it with: PORT=3002 npm run dev');
      return;
    }

    // Read test data
    const testData = JSON.parse(fs.readFileSync('./test-webhook.json', 'utf8'));
    console.log('\n📋 Sending test webhook data...');
    
    // Send webhook request
    const response = await axios.post('http://localhost:3002/webhook', testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Webhook successful!');
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    
  } catch (error) {
    console.log('❌ Webhook failed!');
    console.log('Error:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testWebhook();
