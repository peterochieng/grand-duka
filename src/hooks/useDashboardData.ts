
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface OrderData {
  name: string;
  orders: number;
}

export interface RevenueData {
  name: string;
  revenue: number;
}

export interface ActivityData {
  date: string;
  listings: number;
  shops: number;
  inspections: number;
}

export const useDashboardData = () => {
  const [weeklyOrders, setWeeklyOrders] = useState<OrderData[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueData[]>([]);
  const [activityOverview, setActivityOverview] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get date ranges for queries
        const now = new Date();
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        
        // ===== WEEKLY ORDERS DATA =====
        // Fetch real orders data from the past 7 days
        const weeklyOrdersData: OrderData[] = [];
        
        // Past 7 days, one day at a time
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
        
        // ===== MONTHLY REVENUE DATA =====
        // Fetch real revenue data from the past 6 months
        const monthlyRevenueData: RevenueData[] = [];
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(now.getMonth() - i);
          
          const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
          
          // Get payments for this month
          const { data: monthPayments, error } = await supabase
            .from('payments')
            .select('amount')
            .gte('created_at', startOfMonth.toISOString())
            .lte('created_at', endOfMonth.toISOString());
          
          if (error) {
            console.error('Error fetching revenue for month:', error);
          }
          
          // Calculate total revenue for the month
          const totalRevenue = monthPayments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
          
          const monthName = date.toLocaleDateString('en-US', { month: 'short' });
          monthlyRevenueData.push({
            name: monthName,
            revenue: totalRevenue
          });
        }
        
        setMonthlyRevenue(monthlyRevenueData);
        
        // ===== ACTIVITY OVERVIEW =====
        // Create 6 data points (5 days apart) for the past 30 days
        const activityData: ActivityData[] = [];
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - (i * 5));
          
          const dayStr = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
          
          // Get product listings created up to this date
          const { count: listingsCount, error: listingsError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .lte('created_at', date.toISOString());
          
          if (listingsError) {
            console.error('Error fetching listings count:', listingsError);
          }
          
          // Get shops created up to this date
          const { count: shopsCount, error: shopsError } = await supabase
            .from('shops')
            .select('*', { count: 'exact', head: true })
            .lte('created_at', date.toISOString());
          
          if (shopsError) {
            console.error('Error fetching shops count:', shopsError);
          }
          
          // Get inspections (products with approval_status=approved) up to this date
          const { count: inspectionsCount, error: inspectionsError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('approval_status', 'approved')
            .lte('created_at', date.toISOString());
          
          if (inspectionsError) {
            console.error('Error fetching inspections count:', inspectionsError);
          }
          
          activityData.push({
            date: dayStr,
            listings: listingsCount || 0,
            shops: shopsCount || 0,
            inspections: inspectionsCount || 0
          });
        }
        
        setActivityOverview(activityData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return {
    weeklyOrders,
    monthlyRevenue,
    activityOverview,
    loading,
    error
  };
};
