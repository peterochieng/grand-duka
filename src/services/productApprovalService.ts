
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
      .eq('approval_status', 'pending_review')
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

// const { data: { session } } = await supabase.auth.getSession();



export const rejectProduct = async (
  productId: string,
  adminId: string,
  feedback: string
): Promise<boolean> => {
  try {
    // Try to update and return the updated row using .select()
    const { data, error } = await supabase
      .from('products')
      .update({
        approval_status: 'rejected',
        approved_at: new Date().toISOString(),
        approved_by: adminId,
        rejection_reason: feedback, // Must match exactly your column name
      })
      .eq('id', productId)
      .select();
      
    console.log('rejectProduct data:', data, 'error:', error);
      
    if (error) {
      return false;
    }
    // Optionally check that data was returned and rejection_reason is updated:
    if (data && data.length > 0 && data[0].rejection_reason === feedback) {
      return true;
    }
    return false;
  } catch (e) {
    console.error('Exception in rejectProduct:', e);
    return false;
  }
};

export const getRejectedListings = async (sellerId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('approval_status', 'rejected')
    .eq('seller_id', sellerId);
  if (error) {
    console.error('Error fetching rejected listings:', error);
    return [];
  }
  return data ? data.map(row => convertProductRowToProduct(row)) : [];
};

export const resubmitListing = async (productId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      approval_status: 'pending',
      rejection_reason: null,  // Clear previous rejection feedback
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)
    .select();

  if (error) {
    console.error('Error resubmitting listing:', error);
    return false;
  }
  if (!data || data.length === 0) {
    console.error('No rows updated for product id:', productId);
    return false;
  }
  // Optionally log the updated row(s)
  console.log('Resubmitted listing data:', data);
  return true;
};

export const challengeListing = async (productId: string, challengeComment: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      approval_status: 'challenged',
      challenge_reason: challengeComment,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)
    .select();
  
  if (error) {
    console.error('Error challenging listing:', error);
    return false;
  }
  if (!data || data.length === 0) {
    console.error('No rows updated for challenge on product id:', productId);
    return false;
  }
  console.log('Challenged listing data:', data);
  return true;
};

export const getSellerListings = async (sellerId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', sellerId);
    console.log(data);
  if (error) {
    console.error('Error fetching seller listings:', error);
    return [];
  }
  return data ? data.map((row) => convertProductRowToProduct(row)) : [];
};

export const getSellerListingsInventory = async (sellerId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', sellerId);
  console.log(data);
  if (error) {
    console.error('Error fetching seller listings:', error);
    return [];
  }
  return data
    ? data.map((row) => {
        const product = convertProductRowToProduct(row);
        // Preserve template and template_fields from the original row
        product.template = (row as any).template;
        (product as any).template_fields = (row as any).template_fields;
        return product;
      })
    : [];
};

export const togglePublishStatus = async (productId: string, publish: boolean): Promise<boolean> => {
  const newStatus = publish ? 'published' : 'pending'; // Change to 'draft' if applicable
  const { data, error } = await supabase
    .from('products')
    .update({
      approval_status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)
    .select();
  
  if (error) {
    console.error('Error updating publish status:', error);
    return false;
  }
  if (!data || data.length === 0) {
    console.error('No rows updated for product id:', productId);
    return false;
  }
  return true;
};

export const updateListing = async (productId: string, updatedFields: Partial<Product>): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updatedFields,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId)
      .select();
      
    if (error) {
      console.error('Error updating listing:', error);
      return false;
    }
    if (!data || data.length === 0) {
      console.error('No rows updated for product id:', productId);
      return false;
    }
    console.log('Updated listing data:', data);
    return true;
  } catch (e) {
    console.error('Exception in updateListing:', e);
    return false;
  }
};

export const deleteListing = async (productId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting listing:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Exception in deleteListing:', e);
    return false;
  }
};