import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuyerTransactionActions } from '@/components/buyer/BuyerTransactionActions';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const TransactionsTab = () => {
  const { user } = useCurrentUser();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('payments')
          .select(`
            *,
            order:order_id (
              *
            )
          `)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching transactions:', error);
          return;
        }
        
        const userPayments = data.filter((payment) => {
          return payment.order && 
            (payment.order.buyer_id === user.id || payment.order.seller_id === user.id);
        });
        
        setPayments(userPayments);
      } catch (error) {
        console.error('Error in fetchTransactions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, [user?.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30">
            Completed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30">
            Failed
          </Badge>
        );
      case 'refunded':
        return (
          <Badge className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30">
            Refunded
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800/30">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your recent transactions and payment history</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        ) : payments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{formatDate(payment.created_at)}</TableCell>
                  <TableCell>
                    {user?.id === payment.order.buyer_id 
                      ? `Payment for Order #${payment.order_id.substring(0, 5)}`
                      : `Received for Order #${payment.order_id.substring(0, 5)}`
                    }
                  </TableCell>
                  <TableCell className={user?.id === payment.order.buyer_id 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-green-600 dark:text-green-400"
                  }>
                    {user?.id === payment.order.buyer_id ? '-' : '+'}{formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell>
                    {user?.id === payment.order.buyer_id && 
                      payment.order.status !== 'delivered' && (
                        <BuyerTransactionActions 
                          orderId={payment.order_id}
                          sellerId={payment.order.seller_id}
                        />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No transactions found.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Transactions</Button>
      </CardFooter>
    </Card>
  );
};
