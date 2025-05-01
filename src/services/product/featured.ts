
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { handleSellerData } from './utils';

export const getFeaturedProducts = async (limit: number = 6): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller:seller_id (
          business_name,
          rating,
          verified
        )
      `)
      .eq('featured', true)
      .limit(limit)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
    
    return (data || []).map((row: any) => handleSellerData(row));
  } catch (e) {
    console.error('Exception in getFeaturedProducts:', e);
    return [];
  }
};

export const getRelatedProducts = async (
  productId: string,
  category: string,
  limit: number = 4
): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller:seller_id (
          business_name,
          rating,
          verified
        )
      `)
      .eq('category', category)
      .neq('id', productId)
      .limit(limit)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
    
    return (data || []).map((row: any) => handleSellerData(row));
  } catch (e) {
    console.error('Exception in getRelatedProducts:', e);
    return [];
  }
};
