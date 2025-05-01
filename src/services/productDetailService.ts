
import { supabase } from '@/integrations/supabase/client';
import { ProductDetailRow } from '@/lib/types/supabaseTypes';

export const getProductDetailsByProductId = async (productId: string): Promise<ProductDetailRow | null> => {
  try {
    const { data, error } = await supabase
      .from('product_details')
      .select('*')
      .eq('product_id', productId)
      .single();

    if (error) {
      console.error('Error fetching product details:', error);
      return null;
    }

    return data as ProductDetailRow;
  } catch (e) {
    console.error('Exception in getProductDetailsByProductId:', e);
    return null;
  }
};

export const saveProductDetails = async (details: {
  product_id: string;
  detail_type: string;
  details: any;
}): Promise<ProductDetailRow | null> => {
  try {
    // Make sure the details object has all required fields for the insert
    const detailsToInsert = {
      product_id: details.product_id,
      detail_type: details.detail_type,
      details: details.details
    };

    const { data, error } = await supabase
      .from('product_details')
      .insert(detailsToInsert)
      .select()
      .single();

    if (error) {
      console.error('Error saving product details:', error);
      return null;
    }

    return data as ProductDetailRow;
  } catch (e) {
    console.error('Exception in saveProductDetails:', e);
    return null;
  }
};
