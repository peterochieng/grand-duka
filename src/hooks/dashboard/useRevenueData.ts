
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RevenueData } from './types/dashboardTypes';

export const useRevenueData = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        setLoading(true);
        
        const now = new Date();
        
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
      } catch (err) {
        console.error('Error fetching monthly revenue data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch monthly revenue data'));
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  return { monthlyRevenue, loading, error };
};
