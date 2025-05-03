import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';

export const useProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  };

  const approveProduct = async (productId: string): Promise<boolean> => {
    const { error } = await supabase
      .from('products')
      .update({ approval_status: 'approved' })
      .eq('id', productId);

    return !error;
  };

  const rejectProduct = async (productId: string, feedback: string): Promise<boolean> => {
    const { error } = await supabase
      .from('products')
      .update({ approval_status: 'rejected', rejection_reason: feedback })
      .eq('id', productId);

    return !error;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products: filter === 'all' ? products : products.filter((p) => p.approval_status === filter),
    loading,
    error,
    filter,
    setFilter,
    fetchProducts,
    approveProduct,
    rejectProduct,
  };
};