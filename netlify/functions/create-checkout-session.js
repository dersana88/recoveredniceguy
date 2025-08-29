const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    console.log('Request body:', event.body);
    
    const requestBody = JSON.parse(event.body);
    console.log('Parsed body:', requestBody);
    
    // Handle both priceId and price_id for compatibility
    const priceId = requestBody.priceId || requestBody.price_id;
    const mode = requestBody.mode || 'payment';
    
    if (!priceId) {
      console.error('No price ID provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Price ID is required' })
      };
    }

    console.log('Creating checkout session with price ID:', priceId);
    
    // Get site URL from environment or use default
    const siteUrl = process.env.SITE_URL || process.env.URL || 'https://recoveredniceguy.com';
    
    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: mode,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: siteUrl,
    });

    console.log('Checkout session created:', session.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};