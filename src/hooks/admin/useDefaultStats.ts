
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminStatsData } from './types/statsTypes';
import { calculateGrowth, fetchCountWithDateFilter } from './statsHelpers';

export const useDefaultStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStatsData>({
    totalProducts: 0,
    totalUsers: 0,
    totalShops: 0,
    pendingVerifications: 0,
    productGrowth: 0,
    userGrowth: 0,
    shopGrowth: 0,
    verificationGrowth: 0
  });

  useEffect(() => {
    const fetchDefaultStats = async () => {
      try {
        setLoading(true);
        // Get date from 30 days ago for comparison
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const pastDateStr = thirtyDaysAgo.toISOString();
        
        // Current counts
        const productsCount = await fetchCountWithDateFilter(supabase, 'products');
        const usersCount = await fetchCountWithDateFilter(supabase, 'profiles');
        const shopsCount = await fetchCountWithDateFilter(supabase, 'shops');
        const pendingCount = await fetchCountWithDateFilter(supabase, 'shops', undefined, { status: 'pending' });
        
        // Past counts for comparison
        const pastProductsCount = await fetchCountWithDateFilter(supabase, 'products', pastDateStr);
        const pastUsersCount = await fetchCountWithDateFilter(supabase, 'profiles', pastDateStr);
        const pastShopsCount = await fetchCountWithDateFilter(supabase, 'shops', pastDateStr);
        const pastPendingCount = await fetchCountWithDateFilter(supabase, 'shops', pastDateStr, { status: 'pending' });
        
        // Calculate growth percentages
        const productGrowth = calculateGrowth(productsCount, pastProductsCount);
        const userGrowth = calculateGrowth(usersCount, pastUsersCount);
        const shopGrowth = calculateGrowth(shopsCount, pastShopsCount);
        const verificationGrowth = calculateGrowth(pendingCount, pastPendingCount);
        
        setStats({
          totalProducts: productsCount,
          totalUsers: usersCount,
          totalShops: shopsCount,
          pendingVerifications: pendingCount,
          productGrowth,
          userGrowth,
          shopGrowth,
          verificationGrowth
        });
      } catch (error) {
        console.error('Error fetching default stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultStats();
  }, []);

  return { loading, stats };
};
