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
    // Check if Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Server configuration error' 
        })
      };
    }

    const requestBody = JSON.parse(event.body);
    
    // Get price ID - mit Fallback auf deine spezifische Price ID
    const priceId = requestBody.priceId || 
                    requestBody.price_id || 
                    'price_1S1OHkEk4co9sYTKSsSpwUFm'; // Fallback auf deine Price ID
    
    const mode = requestBody.mode || 'payment';
    
    console.log('Creating session with Price ID:', priceId);
    
    // Get site URL
    const siteUrl = process.env.SITE_URL || 'https://recoveredniceguy.com';
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: mode,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: siteUrl,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'AU', 'NZ']
      },
      metadata: {
        product: 'ghost-recovery-protocol',
        price_id: priceId
      },
      allow_promotion_codes: true,
      locale: 'auto' // Automatische Spracherkennung
    });

    console.log('✅ Session created:', session.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url: session.url,
        sessionId: session.id 
      })
    };
    
  } catch (error) {
    console.error('Stripe Error:', error.message);
    console.error('Error Type:', error.type);
    console.error('Error Code:', error.code);
    
    // Spezifische Fehlermeldungen
    let userMessage = 'Unable to create checkout session';
    
    if (error.code === 'resource_missing') {
      userMessage = 'Product configuration error. Please contact support.';
    } else if (error.type === 'StripeAuthenticationError') {
      userMessage = 'Payment system configuration error.';
    } else if (error.type === 'StripeInvalidRequestError') {
      userMessage = 'Invalid checkout request. Please try again.';
    }
    
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: userMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};