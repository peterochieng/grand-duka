
import { supabase } from '@/integrations/supabase/client';

export interface Bid {
  id: string;
  product_id: string;
  bidder_id: string;
  seller_id: string;
  amount: number;
  currency: string;
  status: 'active' | 'won' | 'outbid' | 'canceled';
  created_at: string;
  updated_at: string;
  product?: {
    title: string;
    image: string;
  };
  bidder?: {
    name: string;
  };
}

export const placeBid = async (
  productId: string,
  bidderId: string,
  sellerId: string,
  amount: number,
  currency: string = 'USD'
): Promise<Bid | null> => {
  try {
    // Check if this is higher than existing bids
    const { data: existingBids, error: fetchError } = await supabase
      .from('bids')
      .select('amount')
      .eq('product_id', productId)
      .eq('status', 'active')
      .order('amount', { ascending: false })
      .limit(1);
    
    if (fetchError) {
      console.error('Error fetching existing bids:', fetchError);
      return null;
    }
    
    if (existingBids && existingBids.length > 0 && existingBids[0].amount >= amount) {
      console.error('Bid amount must be higher than current highest bid');
      return null;
    }
    
    // Mark previous bids as outbid
    if (existingBids && existingBids.length > 0) {
      const { error: updateError } = await supabase
        .from('bids')
        .update({ status: 'outbid', updated_at: new Date().toISOString() })
        .eq('product_id', productId)
        .eq('status', 'active');
        
      if (updateError) {
        console.error('Error updating previous bids:', updateError);
      }
    }
    
    // Place new bid
    const { data, error: insertError } = await supabase
      .from('bids')
      .insert({
        product_id: productId,
        bidder_id: bidderId,
        seller_id: sellerId,
        amount,
        currency
      })
      .select();
    
    if (insertError) {
      console.error('Error placing bid:', insertError);
      return null;
    }
    
    return data[0] as Bid;
  } catch (e) {
    console.error('Exception in placeBid:', e);
    return null;
  }
};

export const getBidsByProduct = async (productId: string): Promise<Bid[]> => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        bidder:bidder_id (
          name
        )
      `)
      .eq('product_id', productId)
      .order('amount', { ascending: false });
    
    if (error) {
      console.error('Error fetching product bids:', error);
      return [];
    }
    
    // Handle potential relations errors by providing fallback values
    return (data || []).map((bid: any) => {
      // If there's a relation error, provide default values
      if (bid.bidder && 'error' in bid.bidder) {
        bid.bidder = { name: 'Unknown Bidder' };
      }
      return bid as Bid;
    });
  } catch (e) {
    console.error('Exception in getBidsByProduct:', e);
    return [];
  }
};

export const getBidsByBidder = async (bidderId: string): Promise<Bid[]> => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        product:product_id (
          title,
          image
        )
      `)
      .eq('bidder_id', bidderId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching bidder bids:', error);
      return [];
    }
    
    // Handle potential relation errors by providing fallback values
    return (data || []).map((bid: any) => {
      // If there's a relation error, provide default values
      if (bid.product && 'error' in bid.product) {
        bid.product = { title: 'Unknown Product', image: '/placeholder.svg' };
      }
      return bid as Bid;
    });
  } catch (e) {
    console.error('Exception in getBidsByBidder:', e);
    return [];
  }
};

export const getHighestBid = async (productId: string): Promise<Bid | null> => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        bidder:bidder_id (
          name
        )
      `)
      .eq('product_id', productId)
      .eq('status', 'active')
      .order('amount', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('Error fetching highest bid:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      return null;
    }
    
    // Handle potential relation errors
    const bid = data[0] as any;
    if (bid.bidder && 'error' in bid.bidder) {
      bid.bidder = { name: 'Unknown Bidder' };
    }
    
    return bid as Bid;
  } catch (e) {
    console.error('Exception in getHighestBid:', e);
    return null;
  }
};

export const cancelBid = async (bidId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bids')
      .update({ 
        status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('id', bidId);
    
    if (error) {
      console.error('Error canceling bid:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Exception in cancelBid:', e);
    return false;
  }
};

export const markBidAsWinner = async (bidId: string): Promise<Bid | null> => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .update({ 
        status: 'won',
        updated_at: new Date().toISOString()
      })
      .eq('id', bidId)
      .select();
    
    if (error) {
      console.error('Error marking bid as winner:', error);
      return null;
    }
    
    return data[0] as Bid;
  } catch (e) {
    console.error('Exception in markBidAsWinner:', e);
    return null;
  }
};
