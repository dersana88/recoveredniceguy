const REDDIT_PIXEL_ID = 'a2_hkh6ici6v6zy';
const REDDIT_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjo0OTEyNDA3NDk0LjY0MjUzOCwiaWF0IjoxNzU2NjQ3NDk0LjY0MjUzOCwianRpIjoiWndyQmVnTUZveThPQ240NTdKaUNkeVBaRHlNM0ZnIiwiY2lkIjoiMVExRU96VFBXbll2ZXJocHR2Z1dzUSIsImxpZCI6InQyXzF3dG04N2VkeGoiLCJhaWQiOiJ0Ml8xd3RtODdlZHhqIiwibGNhIjoxNzU2NjQ3NDkyODkxLCJzY3AiOiJlSnlLVmtwTUtVN096eXRMTFNyT3pNOHJWb29GQkFBQV9fOUJGZ2J1IiwiZmxvIjoxMCwibGwiOnRydWV9.Ugj7QdwTp_7F4uV3WFd_Q66toFOdMgts3-kGBiEpHf6KamQeqAUnncLHL61DL8CxkIKlx9CQ6RWk-nocBc3uodMb6mQHklLTIub4RSQ1lX4vu9bC5uahwSnR8oxZUaNNAwNg734zFkMaSyzFuRGvh5F9-VqpTTDZ4Zu0879WvIUTzGLz7yvjiTjYbVklBA3svvfVTn2uixg11kQfwYZ3uPqKZu3nOLSyJZEyw5HUHcxLr8lF4H_mYM3jL3IjvVRXBRnkk2e4S6mhtYQ-fPTZe3vVWIK1nF7mWzEdpewxHnOq_F4g6XEtjl9fEoS2vnUFVjSqMtVTPytyxv0GYo1LAg';

async function sendRedditConversion(eventType, conversionId, additionalData = {}) {
  try {
    const eventData = {
      test_mode: false,
      events: [
        {
          event_at: new Date().toISOString(),
          event_type: {
            tracking_type: eventType
          },
          conversion_id: conversionId,
          ...additionalData
        }
      ]
    };

    console.log('Sending Reddit conversion:', eventType, conversionId);

    const response = await fetch(`https://ads-api.reddit.com/api/v2.0/conversions/events/${REDDIT_PIXEL_ID}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REDDIT_AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reddit conversion API error:', response.status, errorText);
      return false;
    }

    const result = await response.json();
    console.log('✅ Reddit conversion sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Failed to send Reddit conversion:', error);
    return false;
  }
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { eventType, conversionId, additionalData } = JSON.parse(event.body);
    
    const success = await sendRedditConversion(eventType, conversionId, additionalData);
    
    return {
      statusCode: success ? 200 : 500,
      headers,
      body: JSON.stringify({ 
        success,
        message: success ? 'Conversion tracked' : 'Failed to track conversion'
      })
    };
    
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};