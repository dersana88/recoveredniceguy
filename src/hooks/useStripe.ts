import { useState } from 'react';

export function useStripe() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string, mode: string = 'payment') => {
    setLoading(true);
    
    try {
      console.log('Creating checkout session with price ID:', priceId);
      
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Checkout failed:', errorText);
        throw new Error(`Checkout failed: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.url) {
        console.log('Redirecting to:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Re-throw the error so calling components can handle it
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createCheckoutSession, loading };
}