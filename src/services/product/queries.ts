
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { ProductRow } from '@/lib/types/supabaseTypes';
import { ProductQueryFilters, ProductQueryResult } from './types';
import { handleSellerData } from './utils';
import { fetchAllProducts } from '@/lib/products';

export const getProducts = async (query: string): Promise<Product[]> => {
  // Fetch all products from the database
  const allProducts: Product[] = await fetchAllProducts();
  
  // If query is empty or contains only whitespace, return all products
  if (!query || !query.trim()) {
    return allProducts;
  }
  
  // Filter products by checking title and description (only if defined)
  return allProducts?.filter((product) => {
    const title = typeof product.title === 'string' ? product.title : '';
    const description = typeof product.description === 'string' ? product.description : '';
    
    return (
      title.toLowerCase().includes(query.toLowerCase()) ||
      description.toLowerCase().includes(query.toLowerCase())
    );
  });
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

export const upsertSeller = async (sellerData: {
    id: string;
    business_name: string;
    email: string;
    phone?: string;
    rating?: number;
    status?: string;
    verified?: boolean;
}) => {
    const { data, error } = await supabase
        .from('sellers')
        .upsert(sellerData as any)
        .single();
    if (error) {
        console.error('Error upserting seller:', error);
        throw error;
    }
    return data;
};
