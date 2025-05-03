
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { ProductRow } from '@/lib/types/supabaseTypes';
import { ProductQueryFilters, ProductQueryResult } from './types';
import { handleSellerData } from './utils';
import { fetchAllProducts } from '@/lib/products';

export const getProducts = async (query: string): Promise<Product[]> => {
  // Replace with your real data fetching logic (e.g., API call to your Supabase database)
  const allProducts: Product[] = await fetchAllProducts(); // your actual function to fetch products
  if (!query.trim()) return allProducts;
  return allProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
};

export const getProductById = async (id: string): Promise<Product | null> => {
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
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
    
    return handleSellerData(data as ProductRow);
  } catch (e) {
    console.error('Exception in getProductById:', e);
    return null;
  }
};
