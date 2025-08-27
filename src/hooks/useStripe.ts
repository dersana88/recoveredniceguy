import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function useStripe() {
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  const createCheckoutSession = async (priceId: string, mode: 'payment' | 'subscription' = 'payment') => {
    if (!session) {
      throw new Error('User must be authenticated');
    }

    setLoading(true);

    try {
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${baseUrl}/`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: successUrl,
          cancel_url: cancelUrl,
          mode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
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

  const getSubscription = async () => {
    if (!session) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  };

  const getOrders = async () => {
    if (!session) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  return {
    createCheckoutSession,
    getSubscription,
    getOrders,
    loading,
  };
}