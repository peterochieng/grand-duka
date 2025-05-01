
import { supabase } from '@/integrations/supabase/client';

export interface Offer {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  expires_at: string;
  message?: string;
  seller_response?: string;
  created_at: string;
  updated_at: string;
  product?: {
    title: string;
    image: string;
  };
  buyer?: {
    name: string;
  };
  seller?: {
    business_name: string;
  };
}

export const makeOffer = async (
  productId: string,
  buyerId: string,
  sellerId: string,
  amount: number,
  currency: string = 'USD',
  message?: string
): Promise<Offer | null> => {
  try {
    // Set expiry time to 3 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);
    
    const { data, error } = await supabase
      .from('offers')
      .insert({
        product_id: productId,
        buyer_id: buyerId,
        seller_id: sellerId,
        amount,
        currency,
        message,
        expires_at: expiresAt.toISOString()
      })
      .select();
    
    if (error) {
      console.error('Error making offer:', error);
      return null;
    }
    
    return data[0] as Offer;
  } catch (e) {
    console.error('Exception in makeOffer:', e);
    return null;
  }
};

export const getOfferById = async (offerId: string): Promise<Offer | null> => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select(`
        *,
        product:product_id (
          title,
          image
        ),
        buyer:buyer_id (
          name
        ),
        seller:seller_id (
          business_name
        )
      `)
      .eq('id', offerId)
      .single();
    
    if (error) {
      console.error('Error fetching offer:', error);
      return null;
    }
    
    // Handle potential relation errors for nested properties
    const offer = data as any;
    
    if (offer.product && 'error' in offer.product) {
      offer.product = { title: 'Unknown Product', image: '/placeholder.svg' };
    }
    
    if (offer.buyer && 'error' in offer.buyer) {
      offer.buyer = { name: 'Unknown Buyer' };
    }
    
    if (offer.seller && 'error' in offer.seller) {
      offer.seller = { business_name: 'Unknown Seller' };
    }
    
    return offer as Offer;
  } catch (e) {
    console.error('Exception in getOfferById:', e);
    return null;
  }
};

export const getOffersByProduct = async (productId: string): Promise<Offer[]> => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select(`
        *,
        buyer:buyer_id (
          name
        )
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching product offers:', error);
      return [];
    }
    
    // Handle potential relation errors
    return (data || []).map((offer: any) => {
      if (offer.buyer && 'error' in offer.buyer) {
        offer.buyer = { name: 'Unknown Buyer' };
      }
      return offer as Offer;
    });
  } catch (e) {
    console.error('Exception in getOffersByProduct:', e);
    return [];
  }
};

export const getOffersByBuyer = async (buyerId: string): Promise<Offer[]> => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select(`
        *,
        product:product_id (
          title,
          image
        ),
        seller:seller_id (
          business_name
        )
      `)
      .eq('buyer_id', buyerId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching buyer offers:', error);
      return [];
    }
    
    // Handle potential relation errors
    return (data || []).map((offer: any) => {
      if (offer.product && 'error' in offer.product) {
        offer.product = { title: 'Unknown Product', image: '/placeholder.svg' };
      }
      
      if (offer.seller && 'error' in offer.seller) {
        offer.seller = { business_name: 'Unknown Seller' };
      }
      
      return offer as Offer;
    });
  } catch (e) {
    console.error('Exception in getOffersByBuyer:', e);
    return [];
  }
};

export const getOffersBySeller = async (sellerId: string): Promise<Offer[]> => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select(`
        *,
        product:product_id (
          title,
          image
        ),
        buyer:buyer_id (
          name
        )
      `)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching seller offers:', error);
      return [];
    }
    
    // Handle potential relation errors
    return (data || []).map((offer: any) => {
      if (offer.product && 'error' in offer.product) {
        offer.product = { title: 'Unknown Product', image: '/placeholder.svg' };
      }
      
      if (offer.buyer && 'error' in offer.buyer) {
        offer.buyer = { name: 'Unknown Buyer' };
      }
      
      return offer as Offer;
    });
  } catch (e) {
    console.error('Exception in getOffersBySeller:', e);
    return [];
  }
};

export const respondToOffer = async (
  offerId: string,
  status: 'accepted' | 'rejected',
  response?: string
): Promise<Offer | null> => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ 
        status,
        seller_response: response,
        updated_at: new Date().toISOString()
      })
      .eq('id', offerId)
      .select();
    
    if (error) {
      console.error('Error responding to offer:', error);
      return null;
    }
    
    return data[0] as Offer;
  } catch (e) {
    console.error('Exception in respondToOffer:', e);
    return null;
  }
};

export const withdrawOffer = async (offerId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('offers')
      .delete()
      .eq('id', offerId);
    
    if (error) {
      console.error('Error withdrawing offer:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Exception in withdrawOffer:', e);
    return false;
  }
};
