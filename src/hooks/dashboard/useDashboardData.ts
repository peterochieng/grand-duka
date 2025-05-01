
import { useState, useEffect } from 'react';
import { useOrdersData } from './useOrdersData';
import { useRevenueData } from './useRevenueData';
import { useActivityData } from './useActivityData';
import { DashboardData } from './types/dashboardTypes';

export const useDashboardData = (): DashboardData => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { weeklyOrders, loading: ordersLoading, error: ordersError } = useOrdersData();
  const { monthlyRevenue, loading: revenueLoading, error: revenueError } = useRevenueData();
  const { activityOverview, loading: activityLoading, error: activityError } = useActivityData();

  useEffect(() => {
    // Update loading state based on all data fetches
    setLoading(ordersLoading || revenueLoading || activityLoading);
    
    // Capture any errors
    if (ordersError) setError(ordersError);
    else if (revenueError) setError(revenueError);
    else if (activityError) setError(activityError);
    else setError(null);
  }, [
    ordersLoading, revenueLoading, activityLoading,
    ordersError, revenueError, activityError
  ]);

  return {
    weeklyOrders,
    monthlyRevenue,
    activityOverview,
    loading,
    error
  };
};
