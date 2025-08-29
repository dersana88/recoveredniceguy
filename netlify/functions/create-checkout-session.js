const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: 'Method Not Allowed',
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }

  try {
    const { priceId } = JSON.parse(event.body);
    
    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.SITE_URL,
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};