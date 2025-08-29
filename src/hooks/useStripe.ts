import { useState } from 'react';

export function useStripe() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string, mode: 'payment' | 'subscription' = 'payment') => {
    setLoading(true);

    try {
      // Check if we're in development/local environment
      const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname.includes('webcontainer') ||
                           window.location.hostname.includes('stackblitz') ||
                           window.location.hostname.includes('bolt');

      if (isDevelopment) {
        // In development, simulate checkout and redirect to success page
        console.log('Development mode: Simulating Stripe checkout');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock session ID and redirect to success page
        const mockSessionId = 'mock_cs_' + Math.random().toString(36).substr(2, 9);
        window.location.href = `/success?session_id=${mockSessionId}&dev=true`;
        return;
      }

      // Production code for Netlify
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
        let errorMessage = 'Failed to create checkout session';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          }
        } catch (parseError) {
          // If parsing fails, use the raw response text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch {
            // If even text parsing fails, use the default message
          }
        }
        throw new Error(errorMessage);
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

  return { createCheckoutSession, loading };
}