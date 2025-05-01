
import { supabase } from '@/integrations/supabase/client';
import { Order } from './orderService';

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  provider: string;
  provider_payment_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payer_email?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
  order?: Order;
}

export const createPayment = async (
  orderId: string,
  amount: number,
  currency: string,
  paymentMethod: string,
  provider: string,
  providerPaymentId?: string,
  payerEmail?: string,
  receiptUrl?: string
): Promise<Payment | null> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        order_id: orderId,
        amount,
        currency,
        payment_method: paymentMethod,
        provider,
        provider_payment_id: providerPaymentId,
        payer_email: payerEmail,
        receipt_url: receiptUrl,
        status: 'completed'
      })
      .select();
    
    if (error) {
      console.error('Error creating payment:', error);
      return null;
    }
    
    // Update order payment status
    await supabase
      .from('orders')
      .update({
        payment_status: 'completed',
        status: 'paid',
        transaction_id: providerPaymentId,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);
    
    return data[0] as Payment;
  } catch (e) {
    console.error('Exception in createPayment:', e);
    return null;
  }
};

export const getPaymentsByOrder = async (orderId: string): Promise<Payment[]> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching payments for order:', error);
      return [];
    }
    
    return data as Payment[] || [];
  } catch (e) {
    console.error('Exception in getPaymentsByOrder:', e);
    return [];
  }
};

export const getPaymentsByBuyer = async (buyerId: string): Promise<Payment[]> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        order:order_id (
          *,
          product:product_id (
            title,
            image
          )
        )
      `)
      .eq('order.buyer_id', buyerId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching payments for buyer:', error);
      return [];
    }
    
    // Handle shipping_address conversion and potential relation errors
    return (data || []).map((payment: any) => {
      if (payment.order) {
        if (payment.order.shipping_address) {
          payment.order.shipping_address = payment.order.shipping_address as unknown as any;
        }
        
        if (payment.order.product && 'error' in payment.order.product) {
          payment.order.product = { title: 'Unknown Product', image: '/placeholder.svg' };
        }
      }
      
      return payment as Payment;
    });
  } catch (e) {
    console.error('Exception in getPaymentsByBuyer:', e);
    return [];
  }
};

export const updatePaymentStatus = async (
  paymentId: string,
  status: 'pending' | 'completed' | 'failed' | 'refunded'
): Promise<Payment | null> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentId)
      .select();
    
    if (error) {
      console.error('Error updating payment status:', error);
      return null;
    }
    
    // If refunded, update the order status
    if (status === 'refunded') {
      const payment = data[0] as Payment;
      await supabase
        .from('orders')
        .update({
          payment_status: 'refunded',
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.order_id);
    }
    
    return data[0] as Payment;
  } catch (e) {
    console.error('Exception in updatePaymentStatus:', e);
    return null;
  }
};

export const getPaymentReceipt = async (paymentId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('receipt_url')
      .eq('id', paymentId)
      .single();
    
    if (error) {
      console.error('Error fetching payment receipt:', error);
      return null;
    }
    
    return data?.receipt_url || null;
  } catch (e) {
    console.error('Exception in getPaymentReceipt:', e);
    return null;
  }
};
