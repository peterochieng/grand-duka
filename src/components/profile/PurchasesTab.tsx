
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Order } from '@/services/orderService';

export const PurchasesTab = () => {
  const { user } = useCurrentUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Fetch orders for this user
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
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching orders:', error);
          return;
        }
        
        // Handle shipping_address conversion from JSON
        const processedOrders = data.map((order: any) => ({
          ...order,
          shipping_address: order.shipping_address as any
        }));
        
        setOrders(processedOrders);
      } catch (error) {
        console.error('Error in fetchOrders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user?.id]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30">
            Delivered
          </Badge>
        );
      case 'shipping':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30">
            Shipped
          </Badge>
        );
      case 'paid':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
            Paid
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30">
            Canceled
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800/30">
            Pending
          </Badge>
        );
    }
  };
  
  // Get button action based on order status
  const getOrderAction = (order: Order) => {
    switch (order.status) {
      case 'delivered':
        return (
          <Button variant="ghost" size="sm">Review</Button>
        );
      case 'shipping':
        return (
          <Button variant="ghost" size="sm">Track</Button>
        );
      case 'pending':
      case 'paid':
        return (
          <Button variant="ghost" size="sm">View</Button>
        );
      case 'canceled':
        return (
          <Button variant="ghost" size="sm">Details</Button>
        );
      default:
        return (
          <Button variant="ghost" size="sm">View</Button>
        );
    }
  };

  // Get item description
  const getOrderItems = (order: Order) => {
    if (order.product && 'title' in order.product) {
      return order.product.title;
    }
    return 'Product details unavailable';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>Track your recent and past orders</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.substring(0, 5)}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{getOrderItems(order)}</TableCell>
                  <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    {getOrderAction(order)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No orders found.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Orders</Button>
      </CardFooter>
    </Card>
  );
};
