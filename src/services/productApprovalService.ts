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
    // Only fetch products that need admin review: pending_review status.
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('approval_status', 'pending_review')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products for approval:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    return data.map(row => {
      const product = convertProductRowToProduct(row as ProductRow);
      // Override to preserve the approval_status field from the row.
      return {
        ...product,
        approval_status: (row as any).approval_status,
      } as ProductWithApproval;
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
    // IMPORTANT: When an admin approves a product, we update the status to "pending"
    // so that the seller can then see it and decide to publish it.
    const { error } = await supabase
      .from('products')
      .update({
        approval_status: 'pending',  // Changed from "approved" to "pending"
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
  adminId: string,
  feedback: string
): Promise<boolean> => {
  try {
    // When rejecting, set status to "rejected" and record the feedback.
    const { data, error } = await supabase
      .from('products')
      .update({
        approval_status: 'rejected',
        rejection_reason: feedback,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
      .select();
    
    if (error) {
      console.error('Error rejecting product:', error);
      return false;
    }
    if (!data || data.length === 0) {
      console.error('No rows updated for product id:', productId);
      return false;
    }
    return true;
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
      approval_status: 'pending_review', // Updated to mark it for review again.
      rejection_reason: null,  // Clear any previous rejection feedback.
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
  console.log('Resubmitted listing data:', data);
  return true;
};

export const challengeListing = async (productId: string, challengeComment: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      approval_status: 'pending_review', // Reset for re-review after challenge
      challenge_reason: challengeComment, // Save the seller's challenge comment
      updated_at: new Date().toISOString()
    })
    .eq('id', productId)
    .select();

  if (error) {
    console.error('Error challenging product:', error);
    return false;
  }
  if (!data || data.length === 0) {
    console.error('No rows updated for product id:', productId);
    return false;
  }
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
      console.log(row);
        const product = convertProductRowToProduct(row);
        console.log(product);
        // Return a new object that preserves the extra fields.
        return {
          ...product,
          template: (row as any).template,
          template_fields: (row as any).template_fields,
          approval_status: (row as any).approval_status
        };
      })
    : [];
};

export const togglePublishStatus = async (productId: string, publish: boolean): Promise<boolean> => {
  // For listings not requiring review, set status to "published".
  // For listings that need review, leave as "pending" (or "pending_review").
  const newStatus = publish ? 'published' : 'pending';
  const { data, error } = await supabase
    .from('products')
    .update({
      approval_status: newStatus,
      updated_at: new Date().toISOString()
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
        updated_at: new Date().toISOString()
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