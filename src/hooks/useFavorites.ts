
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useFavorites = (productId?: string) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user?.id || !productId) return;

      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('id')
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .single();

        if (error) throw error;
        setIsFavorite(!!data);
      } catch (err) {
        console.error('Error checking favorite status:', err);
      }
    };

    checkFavoriteStatus();
  }, [user?.id, productId]);

  const toggleFavorite = async () => {
    if (!user?.id || !productId) return;
    
    setLoading(true);
    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
        toast({
          title: "Removed from favorites",
          description: "Item has been removed from your favorites."
        });
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            listing_type: 'favorite',
            price: 0,
            quantity: 1
          });

        if (error) throw error;
        toast({
          title: "Added to favorites",
          description: "Item has been added to your favorites."
        });
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
      toast({
        title: "Error",
        description: "Failed to update favorites.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return { isFavorite, loading, toggleFavorite };
};
