
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  product?: {
    title?: string;
    image?: string;
  };
  seller?: {
    business_name?: string;
  };
  buyer?: {
    email?: string;
  };
  total_amount: number;
  shipping_fee: number;
  tax: number;
  status: 'pending' | 'paid' | 'shipping' | 'delivered' | 'canceled';
  payment_status: string;
  shipping_address: any;
  created_at: string;
  updated_at: string;
  tracking_number?: string;
  delivery_method: string;
}

export const getSellerOrders = async (sellerId: string): Promise<{ orders: Order[], total: number }> => {
  try {
    // Get total count
    const countResponse = await supabase
      .from('orders')
      .select('id', { count: 'exact' })
      .eq('seller_id', sellerId);
      
    const total = countResponse.count || 0;
    
    // Get orders with product and buyer details
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        product:product_id (
          title,
          image
        ),
        buyer:buyer_id (
          email
        )
      `)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching seller orders:', error);
      return { orders: [], total: 0 };
    }
    
    // Handle shipping_address conversion from JSON
    const processedOrders = data.map((order: any) => ({
      ...order,
      shipping_address: order.shipping_address as any
    }));
    
    return { orders: processedOrders, total };
  } catch (error) {
    console.error('Error in getSellerOrders:', error);
    return { orders: [], total: 0 };
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', orderId);
      
    if (error) {
      console.error('Error updating order status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    return false;
  }
};

export const addTrackingNumber = async (orderId: string, trackingNumber: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ 
        tracking_number: trackingNumber, 
        status: 'shipping',
        updated_at: new Date().toISOString() 
      })
      .eq('id', orderId);
      
    if (error) {
      console.error('Error adding tracking number:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in addTrackingNumber:', error);
    return false;
  }
};

export const getBuyerOrders = async (buyerId: string): Promise<{ orders: Order[], total: number }> => {
  try {
    // Get total count
    const countResponse = await supabase
      .from('orders')
      .select('id', { count: 'exact' })
      .eq('buyer_id', buyerId);
      
    const total = countResponse.count || 0;
    
    // Get orders with product and seller details
    const { data, error } = await supabase
      .from('orders')
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
      console.error('Error fetching buyer orders:', error);
      return { orders: [], total: 0 };
    }
    
    // Handle shipping_address conversion from JSON
    const processedOrders = data.map((order: any) => ({
      ...order,
      shipping_address: order.shipping_address as any
    }));
    
    return { orders: processedOrders, total };
  } catch (error) {
    console.error('Error in getBuyerOrders:', error);
    return { orders: [], total: 0 };
  }
};
