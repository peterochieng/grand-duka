
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { ProductRow } from '@/lib/types/supabaseTypes';
import { handleSellerData } from './utils';

export const createProduct = async (
  product: Omit<ProductRow, 'id' | 'created_at' | 'updated_at' | 'approval_status' | 'approved_at' | 'approved_by'>
): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...product,
        approval_status: 'pending'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      return null;
    }
    
    // Get seller info
    const { data: sellerData, error: sellerError } = await supabase
      .from('sellers')
      .select('business_name, rating, verified')
      .eq('id', product.seller_id)
      .single();
    
    if (sellerError) {
      console.error('Error fetching seller for new product:', sellerError);
    }
    
    const productRow = data as ProductRow;
    const newProduct = handleSellerData(productRow);
    
    // Add seller info if available
    if (sellerData) {
      newProduct.seller = {
        id: product.seller_id,
        name: sellerData.business_name,
        rating: sellerData.rating,
        verified: sellerData.verified
      };
    }
    
    return newProduct;
  } catch (e) {
    console.error('Exception in createProduct:', e);
    return null;
  }
};

export const updateProduct = async (
  id: string,
  updates: Partial<Omit<ProductRow, 'id' | 'created_at' | 'updated_at' | 'seller_id'>>
): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      return null;
    }
    
    const productRow = data as ProductRow;
    const updatedProduct = handleSellerData(productRow);
    
    return updatedProduct;
  } catch (e) {
    console.error('Exception in updateProduct:', e);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Exception in deleteProduct:', e);
    return false;
  }
};
