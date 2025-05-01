
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { updateOrderStatus, addTrackingNumber } from '@/services/orderService';
import { updatePaymentStatus } from '@/services/paymentService';
import { supabase } from '@/integrations/supabase/client';

interface UseTransactionManagerProps {
  orderId: string;
}

export const useTransactionManager = ({ orderId }: UseTransactionManagerProps) => {
  const { toast } = useToast();
  const [isAddingTracking, setIsAddingTracking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const completeTransaction = async () => {
    setIsProcessing(true);
    try {
      const success = await updateOrderStatus(orderId, 'delivered');
      
      if (success) {
        toast({
          title: "Transaction completed",
          description: "The order has been marked as completed."
        });
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (err) {
      console.error('Error completing transaction:', err);
      toast({
        title: "Error",
        description: "Failed to complete the transaction.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelTransaction = async () => {
    setIsProcessing(true);
    try {
      const orderSuccess = await updateOrderStatus(orderId, 'canceled');
      
      if (!orderSuccess) {
        throw new Error("Failed to update order status");
      }
      
      const { data: payments } = await supabase
        .from('payments')
        .select('*')
        .eq('order_id', orderId)
        .limit(1);
      
      if (payments && payments.length > 0) {
        const paymentSuccess = await updatePaymentStatus(payments[0].id, 'refunded');
        
        if (!paymentSuccess) {
          throw new Error("Failed to update payment status");
        }
      }
      
      toast({
        title: "Transaction canceled",
        description: "The order has been canceled and refund initiated."
      });
    } catch (err) {
      console.error('Error canceling transaction:', err);
      toast({
        title: "Error",
        description: "Failed to cancel the transaction.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleAddTracking = async (trackingNumber: string) => {
    setIsProcessing(true);
    try {
      const success = await addTrackingNumber(orderId, trackingNumber);
      
      if (success) {
        toast({
          title: "Tracking added",
          description: "Tracking number has been added and order status updated to shipping."
        });
        setIsAddingTracking(false);
      } else {
        throw new Error("Failed to add tracking number");
      }
    } catch (err) {
      console.error('Error adding tracking:', err);
      toast({
        title: "Error",
        description: "Failed to add tracking number.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isAddingTracking,
    isProcessing,
    setIsAddingTracking,
    completeTransaction,
    cancelTransaction,
    handleAddTracking
  };
};

