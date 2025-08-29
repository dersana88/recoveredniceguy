const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // CORS headers für alle Responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
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
    console.log('📝 Received checkout request:', event.body);
    
    const requestBody = JSON.parse(event.body);
    
    // Handle both priceId and price_id for compatibility
    const priceId = requestBody.priceId || requestBody.price_id;
    const mode = requestBody.mode || 'payment';
    
    if (!priceId) {
      console.error('❌ No price ID provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Price ID is required' })
      };
    }

    console.log('🔄 Creating checkout session with price ID:', priceId);
    
    // Get site URL from environment or use default
    const siteUrl = process.env.SITE_URL || process.env.URL || 'https://recoveredniceguy.com';
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: mode,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}`,
      // Wichtig für digitale Produkte
      customer_creation: 'always',
      // Metadata für spätere Verarbeitung im Webhook
      metadata: {
        product: 'ghost-recovery-protocol',
        price_id: priceId
      },
      // Email collection für digitale Lieferung
      customer_email: requestBody.customer_email || null,
      // Erlaubt Promotion Codes
      allow_promotion_codes: true,
      // Automatische Steuerberechnung (optional)
      automatic_tax: {
        enabled: false
      }
    });

    console.log('✅ Checkout session created:', session.id);
    console.log('🔗 Checkout URL:', session.url);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url: session.url,
        sessionId: session.id 
      })
    };
    
  } catch (error) {
    console.error('❌ Stripe error:', error);
    
    // Detaillierte Fehlerbehandlung
    let errorMessage = 'An error occurred creating checkout session';
    let statusCode = 500;

    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = `Invalid request: ${error.message}`;
      statusCode = 400;
    } else if (error.type === 'StripeAPIError') {
      errorMessage = 'Stripe API error. Please try again.';
      statusCode = 502;
    } else if (error.type === 'StripeConnectionError') {
      errorMessage = 'Network error. Please check your connection.';
      statusCode = 503;
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Authentication failed. Check API keys.';
      statusCode = 401;
    }

    return {
      statusCode: statusCode,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};