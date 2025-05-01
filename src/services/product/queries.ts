
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { ProductRow } from '@/lib/types/supabaseTypes';
import { ProductQueryFilters, ProductQueryResult } from './types';
import { handleSellerData } from './utils';

export const getProducts = async (
  filters?: ProductQueryFilters
): Promise<ProductQueryResult> => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        seller:seller_id (
          business_name,
          rating,
          verified
        )
      `, { count: 'exact' });
    
    if (filters) {
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.subcategory) {
        query = query.eq('subcategory', filters.subcategory);
      }
      
      if (filters.sellerId) {
        query = query.eq('seller_id', filters.sellerId);
      }
      
      if (filters.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }
      
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if (filters.condition) {
        query = query.eq('condition', filters.condition);
      }
      
      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }
    }
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      return { products: [], count: 0 };
    }
    
    const products = (data || []).map((row: any) => handleSellerData(row));
    
    return { products, count: count || 0 };
  } catch (e) {
    console.error('Exception in getProducts:', e);
    return { products: [], count: 0 };
  }
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
