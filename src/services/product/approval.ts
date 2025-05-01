
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { ProductRow } from '@/lib/types/supabaseTypes';
import { ApprovalStatus } from './types';
import { handleSellerData } from './utils';

export const approveProduct = async (
  id: string,
  approverId: string
): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        approval_status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: approverId,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error approving product:', error);
      return null;
    }
    
    return handleSellerData(data as ProductRow);
  } catch (e) {
    console.error('Exception in approveProduct:', e);
    return null;
  }
};

export const rejectProduct = async (
  id: string,
  approverId: string
): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        approval_status: 'rejected',
        approved_at: new Date().toISOString(),
        approved_by: approverId,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error rejecting product:', error);
      return null;
    }
    
    return handleSellerData(data as ProductRow);
  } catch (e) {
    console.error('Exception in rejectProduct:', e);
    return null;
  }
};

export const getProductsByApprovalStatus = async (
  status: ApprovalStatus,
  limit: number = 20,
  offset: number = 0
): Promise<{ products: Product[]; count: number }> => {
  try {
    const { data, error, count } = await supabase
      .from('products')
      .select(`
        *,
        seller:seller_id (
          business_name,
          rating,
          verified
        )
      `, { count: 'exact' })
      .eq('approval_status', status)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching ${status} products:`, error);
      return { products: [], count: 0 };
    }
    
    const products = (data || []).map((row: any) => handleSellerData(row));
    
    return { products, count: count || 0 };
  } catch (e) {
    console.error(`Exception in getProductsByApprovalStatus for ${status}:`, e);
    return { products: [], count: 0 };
  }
};
