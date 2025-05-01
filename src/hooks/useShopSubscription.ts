
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useShopSubscription = (shopId: string) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, [shopId]);

  const checkSubscriptionStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('shop_subscriptions')
        .select('id')
        .eq('shop_id', shopId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setIsSubscribed(!!data);
    } catch (err) {
      console.error('Error checking subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('shop_subscriptions')
        .insert({
          shop_id: shopId,
          user_id: user.id
        });

      if (error) throw error;
      setIsSubscribed(true);
      toast.success('Successfully subscribed to shop');
    } catch (err) {
      console.error('Error subscribing:', err);
      toast.error('Failed to subscribe to shop');
    }
  };

  const unsubscribe = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('shop_subscriptions')
        .delete()
        .eq('shop_id', shopId)
        .eq('user_id', user.id);

      if (error) throw error;
      setIsSubscribed(false);
      toast.success('Successfully unsubscribed from shop');
    } catch (err) {
      console.error('Error unsubscribing:', err);
      toast.error('Failed to unsubscribe from shop');
    }
  };

  return {
    isSubscribed,
    loading,
    subscribe,
    unsubscribe
  };
};
