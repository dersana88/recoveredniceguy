const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing configuration' })
    };
  }

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object;
      
      console.log('💰 Payment successful!');
      console.log('Customer:', session.customer_email);
      console.log('Amount:', session.amount_total / 100, session.currency);
      console.log('Session ID:', session.id);
      
      // Check if this is for the Ghost Recovery Protocol
      if (session.metadata?.price_id === 'price_1S1OHkEk4co9sYTKSsSpwUFm') {
        console.log('✅ Ghost Recovery Protocol purchased!');
        
        // TODO: Implement these actions:
        // 1. Send download email with the guide
        // 2. Save purchase to database
        // 3. Add to email automation sequence
        // 4. Track conversion in analytics
      }
      
      break;
    }
    
    case 'checkout.session.expired': {
      const session = stripeEvent.data.object;
      console.log('Session expired:', session.id);
      // TODO: Send recovery email
      break;
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = stripeEvent.data.object;
      console.log('Payment failed:', paymentIntent.id);
      break;
    }
    
    default:
      console.log(`Unhandled event type: ${stripeEvent.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
};