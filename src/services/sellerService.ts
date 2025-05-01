
import { supabase } from '@/integrations/supabase/client';
import { SellerRow } from '@/lib/types/supabaseTypes';

export const getSellers = async (): Promise<SellerRow[]> => {
  try {
    const { data, error } = await supabase
      .from('sellers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    
    return data as SellerRow[];
  } catch (err) {
    console.error('Error fetching sellers:', err);
    return [];
  }
};

export const getSellerById = async (id: string): Promise<SellerRow | null> => {
  try {
    const { data, error } = await supabase
      .from('sellers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching seller:', error);
      return null;
    }

    return data as SellerRow;
  } catch (e) {
    console.error('Exception in getSellerById:', e);
    return null;
  }
};

export const getSellersByIds = async (ids: string[]): Promise<SellerRow[]> => {
  try {
    const { data, error } = await supabase
      .from('sellers')
      .select('*')
      .in('id', ids);

    if (error) {
      console.error('Error fetching sellers:', error);
      return [];
    }

    return data as SellerRow[];
  } catch (e) {
    console.error('Exception in getSellersByIds:', e);
    return [];
  }
};

export const createSeller = async (seller: Omit<SellerRow, 'id' | 'products_count' | 'rating' | 'verified' | 'revenue' | 'updated_at'>): Promise<SellerRow | null> => {
  try {
    const { data, error } = await supabase
      .from('sellers')
      .insert({
        business_name: seller.business_name,
        owner_name: seller.owner_name,
        email: seller.email,
        location: seller.location,
        business_type: seller.business_type,
        phone: seller.phone,
        status: seller.status
      })
      .select();

    if (error) {
      console.error('Error creating seller:', error);
      return null;
    }

    return data[0] as SellerRow;
  } catch (e) {
    console.error('Exception in createSeller:', e);
    return null;
  }
};

export const updateSeller = async (id: string, updates: Partial<Omit<SellerRow, 'id' | 'updated_at'>>): Promise<SellerRow | null> => {
  try {
    const { data, error } = await supabase
      .from('sellers')
      .update({
        ...updates,
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating seller:', error);
      return null;
    }

    return data[0] as SellerRow;
  } catch (e) {
    console.error('Exception in updateSeller:', e);
    return null;
  }
};

export const getTopSellers = async (limit: number = 10): Promise<SellerRow[]> => {
  try {
    const { data, error } = await supabase
      .from('sellers')
      .select('*')
      .eq('verified', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching top sellers:', error);
      return [];
    }

    return data as SellerRow[];
  } catch (e) {
    console.error('Exception in getTopSellers:', e);
    return [];
  }
};

export const updateSellerStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('sellers')
      .update({ status })
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    
    return true;
  } catch (err) {
    console.error('Error updating seller status:', err);
    return false;
  }
};

export const toggleSellerVerification = async (id: string, verified: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('sellers')
      .update({ verified })
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    
    return true;
  } catch (err) {
    console.error('Error toggling seller verification:', err);
    return false;
  }
};

export const getSellersByType = async (businessType?: string): Promise<SellerRow[]> => {
  try {
    let query = supabase
      .from('sellers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (businessType && businessType !== 'all') {
      query = query.eq('business_type', businessType);
    }
    
    const { data, error } = await query;
    
    if (error) throw new Error(error.message);
    
    return data as SellerRow[];
  } catch (err) {
    console.error('Error fetching sellers by type:', err);
    return [];
  }
};
