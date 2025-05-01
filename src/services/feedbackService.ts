
import { supabase } from '@/integrations/supabase/client';
import { FeedbackRow } from '@/lib/types/supabaseTypes';
import { getFeedbackForSeller as getMockFeedback } from '@/lib/feedback';

export const getFeedbackForSeller = async (sellerId: string): Promise<FeedbackRow[]> => {
  try {
    // First attempt to fetch from Supabase
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback from database:', error);
      // Fall back to mock data if there's an error
      const mockData = await getMockFeedback(sellerId);
      
      // Convert mock data to match FeedbackRow format
      return mockData.map(item => ({
        seller_id: item.sellerId,
        buyer_name: item.buyer.name,
        rating: item.rating,
        comment: item.comment,
        created_at: item.createdAt,
        verified_purchase: item.verifiedPurchase,
        buyer_id: item.buyerId,
        buyer_image: item.buyer.image || null,
        product_id: item.productId || null,
        product_name: item.productName || null,
        seller_response: item.sellerResponse || null,
        helpful: item.helpful,
        id: ''  // Mock ID
      }));
    }

    return data as FeedbackRow[];
  } catch (e) {
    console.error('Exception in getFeedbackForSeller:', e);
    // Fall back to mock data
    const mockData = await getMockFeedback(sellerId);
    
    // Convert mock data to match FeedbackRow format
    return mockData.map(item => ({
      seller_id: item.sellerId,
      buyer_name: item.buyer.name,
      rating: item.rating,
      comment: item.comment,
      created_at: item.createdAt,
      verified_purchase: item.verifiedPurchase,
      buyer_id: item.buyerId,
      buyer_image: item.buyer.image || null,
      product_id: item.productId || null,
      product_name: item.productName || null,
      seller_response: item.sellerResponse || null,
      helpful: item.helpful,
      id: ''  // Mock ID
    }));
  }
};
