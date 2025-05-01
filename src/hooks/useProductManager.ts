
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  approval_status: string;
  seller_id: string;
  created_at: string;
  updated_at?: string;
  approved_at?: string;
  approved_by?: string;
}

export const useProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase.from('products').select('*');
      
      if (filter !== 'all') {
        query = query.eq('approval_status', filter);
      }
      
      const { data, error: fetchError } = await query.order('created_at', { ascending: false }).limit(50);
      
      if (fetchError) {
        throw new Error(fetchError.message);
      }
      
      setProducts(data || []);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error fetching products');
      console.error('Error in products fetch:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const handleApprove = async (id: string) => {
    try {
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          approval_status: 'approved', 
          approved_at: new Date().toISOString() 
        })
        .eq('id', id);
      
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      // Update local state
      setProducts(prev => 
        prev.map(product => 
          product.id === id 
            ? { ...product, approval_status: 'approved', approved_at: new Date().toISOString() } 
            : product
        )
      );
      
      toast.success('Product approved successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error approving product');
      console.error('Error in product approval:', error);
      toast.error(`Error approving product: ${error.message}`);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          approval_status: 'rejected',
          approved_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      // Update local state
      setProducts(prev => 
        prev.map(product => 
          product.id === id 
            ? { ...product, approval_status: 'rejected', approved_at: new Date().toISOString() } 
            : product
        )
      );
      
      toast.success('Product rejected successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error rejecting product');
      console.error('Error in product rejection:', error);
      toast.error(`Error rejecting product: ${error.message}`);
    }
  };

  return {
    products,
    loading,
    error,
    filter,
    setFilter,
    fetchProducts,
    handleApprove,
    handleReject
  };
};
