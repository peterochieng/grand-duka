
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackingDialog } from './transaction/TrackingDialog';
import { TransactionActions } from './transaction/TransactionActions';
import { useTransactionManager } from '@/hooks/useTransactionManager';

interface TransactionManagerProps {
  orderId: string;
}

export const TransactionManager = ({ orderId }: TransactionManagerProps) => {
  const {
    isAddingTracking,
    isProcessing,
    setIsAddingTracking,
    completeTransaction,
    cancelTransaction,
    handleAddTracking
  } = useTransactionManager({ orderId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Management</CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionActions
          onComplete={completeTransaction}
          onCancel={cancelTransaction}
          onAddTracking={() => setIsAddingTracking(true)}
          isProcessing={isProcessing}
        />
      </CardContent>
      
      <TrackingDialog
        isOpen={isAddingTracking}
        onClose={() => setIsAddingTracking(false)}
        onSubmit={handleAddTracking}
        isProcessing={isProcessing}
      />
    </Card>
  );
};

