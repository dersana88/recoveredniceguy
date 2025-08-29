const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Webhook benötigt keine CORS headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Webhooks sind immer POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get the signature from Stripe
  const sig = event.headers['stripe-signature'];
  
  if (!sig) {
    console.error('❌ No Stripe signature found in headers');
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'No signature found' })
    };
  }

  // Get webhook secret from environment
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('❌ No webhook secret configured');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Webhook secret not configured' })
    };
  }

  let stripeEvent;

  try {
    // Verify the webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
    
    console.log('✅ Webhook verified:', stripeEvent.type);
    
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: `Webhook Error: ${err.message}` 
      })
    };
  }

  // Handle the event
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        
        console.log('💰 Payment successful!');
        console.log('📧 Customer email:', session.customer_email);
        console.log('💳 Payment status:', session.payment_status);
        console.log('🆔 Session ID:', session.id);
        console.log('📦 Metadata:', session.metadata);
        
        // TODO: Hier implementieren:
        // 1. Email mit Download-Link senden
        // 2. Kauf in Datenbank speichern
        // 3. Analytics tracken
        
        // Beispiel für Email-Versand (mit SendGrid, Mailgun, etc.)
        /*
        await sendEmail({
          to: session.customer_email,
          subject: 'Your Ghost Recovery Protocol is Ready!',
          template: 'purchase-confirmation',
          data: {
            downloadUrl: generateSecureDownloadUrl(session.id),
            customerName: session.customer_details?.name || 'there'
          }
        });
        */
        
        break;
      }
      
      case 'checkout.session.expired': {
        const session = stripeEvent.data.object;
        console.log('⏰ Checkout session expired:', session.id);
        
        // Optional: Sende Recovery-Email
        /*
        if (session.customer_email) {
          await sendRecoveryEmail(session.customer_email);
        }
        */
        
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object;
        console.log('✅ Payment intent succeeded:', paymentIntent.id);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object;
        console.log('❌ Payment failed:', paymentIntent.id);
        console.log('Failure message:', paymentIntent.last_payment_error?.message);
        
        // Optional: Sende Email über fehlgeschlagene Zahlung
        break;
      }
      
      case 'customer.created': {
        const customer = stripeEvent.data.object;
        console.log('👤 New customer created:', customer.email);
        
        // Optional: Füge zu Email-Liste hinzu
        break;
      }
      
      case 'charge.dispute.created': {
        const dispute = stripeEvent.data.object;
        console.log('⚠️ Dispute created:', dispute.id);
        
        // WICHTIG: Benachrichtige dich selbst über Dispute
        // Pausiere Zugang zum Produkt
        break;
      }
      
      default:
        console.log(`📌 Unhandled event type: ${stripeEvent.type}`);
    }

    // Erfolgreiche Verarbeitung
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        received: true,
        type: stripeEvent.type 
      })
    };
    
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    
    // Fehler beim Verarbeiten (nicht bei Verifizierung)
    // Returning 200 verhindert Stripe Retry-Spam
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        received: true,
        error: 'Processing failed but acknowledged' 
      })
    };
  }
};

// Hilfsfunktion für sicheren Download-Link (Beispiel)
function generateSecureDownloadUrl(sessionId) {
  // Generiere einen zeitlich begrenzten, sicheren Download-Link
  const downloadToken = Buffer.from(`${sessionId}:${Date.now()}`).toString('base64');
  return `https://recoveredniceguy.com/download?token=${downloadToken}`;
}