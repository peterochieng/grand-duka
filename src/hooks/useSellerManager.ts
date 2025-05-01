
import { useState, useEffect } from 'react';
import { getSellers, getSellersByType, updateSellerStatus, toggleSellerVerification } from '@/services/sellerService';
import { SellerRow } from '@/lib/types/supabaseTypes';
import { toast } from 'sonner';

export const useSellerManager = () => {
  const [sellers, setSellers] = useState<SellerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<'all' | 'sole-proprietor' | 'shop' | 'pending' | 'active' | 'suspended'>('all');

  const fetchSellers = async () => {
    try {
      setLoading(true);
      
      let data: SellerRow[] = [];
      
      if (filter === 'all' || filter === 'sole-proprietor' || filter === 'shop') {
        // Business type filters
        data = await getSellersByType(filter === 'all' ? undefined : filter);
      } else {
        // Status filters
        const allSellers = await getSellers();
        data = allSellers.filter(seller => seller.status === filter);
      }
      
      setSellers(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error fetching sellers');
      console.error('Error in sellers fetch:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const success = await updateSellerStatus(id, status);
      
      if (success) {
        // Update local state
        setSellers(prev => 
          prev.map(seller => 
            seller.id === id 
              ? { ...seller, status } 
              : seller
          )
        );
        
        toast.success(`Seller status updated to ${status}`);
      } else {
        toast.error('Failed to update seller status');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error updating seller');
      console.error('Error updating seller status:', error);
      toast.error(`Error updating seller: ${error.message}`);
    }
  };

  const toggleVerification = async (id: string, verified: boolean) => {
    try {
      const success = await toggleSellerVerification(id, verified);
      
      if (success) {
        // Update local state
        setSellers(prev => 
          prev.map(seller => 
            seller.id === id 
              ? { ...seller, verified } 
              : seller
          )
        );
        
        toast.success(verified ? 'Seller verified successfully' : 'Seller verification removed');
      } else {
        toast.error('Failed to update seller verification');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error updating seller');
      console.error('Error updating seller verification:', error);
      toast.error(`Error updating seller: ${error.message}`);
    }
  };

  return {
    sellers,
    loading,
    error,
    filter,
    setFilter,
    fetchSellers,
    updateStatus,
    toggleVerification
  };
};
