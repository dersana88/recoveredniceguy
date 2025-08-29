import { useState } from 'react';

export function useStripe() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string, mode: 'payment' | 'subscription' = 'payment') => {
    setLoading(true);

    try {
      // NO development mode check - always use real Stripe
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          mode,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Checkout failed: ${errorText}`);
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
  };
}