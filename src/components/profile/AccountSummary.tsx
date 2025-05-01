
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Truck, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const AccountSummary = () => {
  const { user } = useCurrentUser();
  const [stats, setStats] = useState({
    balance: 0,
    activeOrders: 0,
    savedItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountStats = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Fetch active orders count
        const { count: ordersCount, error: ordersError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('buyer_id', user.id)
          .eq('status', 'processing');
          
        if (ordersError) console.error('Error fetching orders:', ordersError);
        
        // Fetch saved items (watchlist/favorites)
        const { count: itemsCount, error: itemsError } = await supabase
          .from('cart_items')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (itemsError) console.error('Error fetching saved items:', itemsError);
        
        // Calculate account balance from completed orders
        const { data: payments, error: paymentsError } = await supabase
          .from('payments')
          .select('amount')
          .eq('status', 'completed');
          
        if (paymentsError) console.error('Error fetching payments:', paymentsError);
        
        const balance = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
        
        setStats({
          balance: balance,
          activeOrders: ordersCount || 0,
          savedItems: itemsCount || 0
        });
      } catch (error) {
        console.error('Error fetching account stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAccountStats();
  }, [user?.id]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
            <div className="p-2 rounded-full bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-2 text-xl font-bold">
              {loading ? '...' : formatCurrency(stats.balance)}
            </h3>
            <p className="text-sm text-muted-foreground">Account Balance</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
              <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mt-2 text-xl font-bold">
              {loading ? '...' : stats.activeOrders}
            </h3>
            <p className="text-sm text-muted-foreground">Active Orders</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mt-2 text-xl font-bold">
              {loading ? '...' : stats.savedItems}
            </h3>
            <p className="text-sm text-muted-foreground">Saved Items</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
