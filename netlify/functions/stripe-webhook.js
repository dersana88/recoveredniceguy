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

  // Forward to n8n webhook
  const n8nWebhookUrl = 'https://implementify.xyz/webhook/9f6ffb8e-1756-4120-b8fe-efcbb542f925/webhook';

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object;
      
      console.log('💰 Payment successful! Forwarding to n8n...');
      
      try {
        // Send all relevant data to n8n
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'checkout.session.completed',
            sessionId: session.id,
            customerEmail: session.customer_email,
            customerName: session.customer_details?.name,
            amountPaid: session.amount_total / 100,
            amountInCents: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
            metadata: session.metadata,
            productInfo: {
              priceId: session.metadata?.price_id,
              product: session.metadata?.product
            },
            stripeCustomerId: session.customer,
            timestamp: new Date().toISOString(),
            rawSession: session // Include full session object for flexibility
          })
        });

        if (!response.ok) {
          console.error('n8n webhook returned error:', response.status);
        } else {
          console.log('✅ Successfully forwarded to n8n');
        }
      } catch (error) {
        console.error('Failed to forward to n8n:', error);
        // Don't return error to Stripe - we still want to acknowledge receipt
      }
      
      break;
    }
    
    case 'checkout.session.expired': {
      const session = stripeEvent.data.object;
      console.log('Session expired, forwarding to n8n...');
      
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'checkout.session.expired',
            sessionId: session.id,
            timestamp: new Date().toISOString(),
            rawSession: session
          })
        });
      } catch (error) {
        console.error('Failed to forward expired session to n8n:', error);
      }
      
      break;
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = stripeEvent.data.object;
      console.log('Payment failed, forwarding to n8n...');
      
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'payment_intent.payment_failed',
            paymentIntentId: paymentIntent.id,
            failureMessage: paymentIntent.last_payment_error?.message,
            timestamp: new Date().toISOString(),
            rawPaymentIntent: paymentIntent
          })
        });
      } catch (error) {
        console.error('Failed to forward payment failure to n8n:', error);
      }
      
      break;
    }
    
    default:
      console.log(`Unhandled event type: ${stripeEvent.type}`);
  }

  // Always return success to Stripe
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
};