
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { ProductRow, convertProductRowToProduct } from '@/lib/types/supabaseTypes';

// Extended product interface with approval fields
export interface ProductWithApproval extends Product {
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
}

export const getProductsForApproval = async (): Promise<ProductWithApproval[]> => {
  try {
    const { data: productRows, error } = await supabase
      .from('products')
      .select('*')
      .eq('approval_status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products for approval:', error);
      return [];
    }

    if (!productRows || productRows.length === 0) {
      return [];
    }

    // Fetch sellers to populate product seller information
    const sellerIds = [...new Set(productRows.map(product => product.seller_id))];
    
    if (sellerIds.length === 0) {
      return [];
    }
    
    const { data: sellers } = await supabase
      .from('sellers')
      .select('*')
      .in('id', sellerIds);
    
    const sellerMap = new Map(sellers?.map(seller => [seller.id, seller]) || []);

    return productRows.map(row => {
      const product = convertProductRowToProduct(row as any);
      const seller = sellerMap.get(row.seller_id);
      
      if (seller) {
        product.seller.name = seller.business_name;
        product.seller.rating = seller.rating || 0;
        product.seller.verified = seller.verified;
      }
      
      return {
        ...product,
        approvalStatus: row.approval_status as 'pending' | 'approved' | 'rejected',
        approvedBy: row.approved_by || undefined,
        approvedAt: row.approved_at || undefined
      };
    });
  } catch (e) {
    console.error('Exception in getProductsForApproval:', e);
    return [];
  }
};

export const approveProduct = async (
  productId: string,
  adminId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .update({
        approval_status: 'approved',
        approved_by: adminId,
        approved_at: new Date().toISOString()
      })
      .eq('id', productId);
    
    if (error) {
      console.error('Error approving product:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Exception in approveProduct:', e);
    return false;
  }
};

export const rejectProduct = async (
  productId: string,
  adminId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .update({
        approval_status: 'rejected',
        approved_by: adminId,
        approved_at: new Date().toISOString()
      })
      .eq('id', productId);
    
    if (error) {
      console.error('Error rejecting product:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Exception in rejectProduct:', e);
    return false;
  }
};
