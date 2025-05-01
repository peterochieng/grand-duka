
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type Activity = {
  date: string;
  description: string;
  status: 'processing' | 'completed' | 'pending' | 'cancelled';
};

export const RecentActivity = () => {
  const { user } = useCurrentUser();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Fetch recent orders
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('id, created_at, status, total_amount')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (ordersError) {
          console.error('Error fetching recent orders:', ordersError);
          return;
        }
        
        // Convert orders to activity format
        const orderActivities: Activity[] = orders?.map(order => ({
          date: new Date(order.created_at).toLocaleDateString(),
          description: `Placed order #${order.id.substring(0, 5)}`,
          status: order.status as any
        })) || [];
        
        // Fetch recent profile updates
        const { data: profileUpdates, error: profileError } = await supabase
          .from('profiles')
          .select('updated_at')
          .eq('id', user.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile updates:', profileError);
        }
        
        // Add profile update activity if it exists
        const allActivities = [...orderActivities];
        
        if (profileUpdates && profileUpdates.updated_at) {
          allActivities.push({
            date: new Date(profileUpdates.updated_at).toLocaleDateString(),
            description: 'Updated profile information',
            status: 'completed'
          });
        }
        
        // Sort by date (newest first)
        allActivities.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setActivities(allActivities.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentActivity();
  }, [user?.id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
            Processing
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30">
            Completed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30">
            Cancelled
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

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading activity...</p>
          </div>
        ) : activities.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>
                    {getStatusBadge(activity.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No recent activity found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
