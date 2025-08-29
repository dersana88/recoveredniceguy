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
        // In development, simulate checkout process
        console.log('Development mode: Simulating checkout process');
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect to success page with mock session
        const mockSessionId = 'mock_cs_' + Math.random().toString(36).substr(2, 9);
        window.location.href = `/success?session_id=${mockSessionId}&dev=true`;
        setLoading(false);
        return;
      }

      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode }),
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
            errorMessage = errorText || `Error: ${response.status} ${response.statusText}`;
          }
        } catch (parseError) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Invalid response from server');
      }
      
      if (data.url) {
        window.location.href = data.url;
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