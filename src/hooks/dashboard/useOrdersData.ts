
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { OrderData } from './types/dashboardTypes';

export const useOrdersData = () => {
  const [weeklyOrders, setWeeklyOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeeklyOrders = async () => {
      try {
        setLoading(true);
        
        // Get date ranges for queries
        const now = new Date();
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        
        // Past 7 days, one day at a time
        const weeklyOrdersData: OrderData[] = [];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);
          
          const startOfDay = new Date(date);
          startOfDay.setHours(0, 0, 0, 0);
          
          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);
          
          // Get orders for this day
          const { count, error } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfDay.toISOString())
            .lte('created_at', endOfDay.toISOString());
          
          if (error) {
            console.error('Error fetching orders for day:', error);
          }
          
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          weeklyOrdersData.push({
            name: dayName,
            orders: count || 0
          });
        }
        
        setWeeklyOrders(weeklyOrdersData);
      } catch (err) {
        console.error('Error fetching weekly orders data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch weekly orders data'));
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyOrders();
  }, []);

  return { weeklyOrders, loading, error };
};
