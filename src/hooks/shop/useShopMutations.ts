
import { supabase } from '@/integrations/supabase/client';
import { ShopUpdateFields } from '@/types/shopTypes';
import { toast } from 'sonner';

export const useShopMutations = () => {
  const updateShopStatus = async (id: string, status: string) => {
    try {
      const updateData: ShopUpdateFields = { status };
      
      const { error: updateError } = await supabase
        .from('shops')
        .update(updateData)
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      toast.success(`Shop status updated to ${status}`);
      return true;
    } catch (err) {
      console.error('Error updating shop status:', err);
      toast.error('Failed to update shop status');
      return false;
    }
  };

  const toggleShopVerification = async (id: string, currentValue: boolean) => {
    try {
      const updateData: ShopUpdateFields = { verified: !currentValue };
      
      const { error: updateError } = await supabase
        .from('shops')
        .update(updateData)
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      toast.success(`Shop ${currentValue ? 'unverified' : 'verified'} successfully`);
      return true;
    } catch (err) {
      console.error('Error toggling shop verification:', err);
      toast.error('Failed to update shop verification status');
      return false;
    }
  };

  const toggleShopFeatured = async (id: string, currentValue: boolean) => {
    try {
      const { data, error: checkError } = await supabase
        .from('shops')
        .select('featured')
        .eq('id', id)
        .single();
        
      if (checkError && checkError.message.includes("column 'featured' does not exist")) {
        toast.error("The 'featured' field is not available in the database");
        return false;
      }
      
      const updateData: ShopUpdateFields = { featured: !currentValue };
      
      const { error: updateError } = await supabase
        .from('shops')
        .update(updateData)
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      toast.success(`Shop ${currentValue ? 'removed from' : 'marked as'} featured`);
      return true;
    } catch (err) {
      console.error('Error toggling shop featured status:', err);
      toast.error('Failed to update shop featured status');
      return false;
    }
  };

  return {
    updateShopStatus,
    toggleShopVerification,
    toggleShopFeatured
  };
};
