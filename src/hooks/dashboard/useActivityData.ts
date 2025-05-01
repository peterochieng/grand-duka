
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ActivityData } from './types/dashboardTypes';

export const useActivityData = () => {
  const [activityOverview, setActivityOverview] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true);
        
        // Get date ranges for queries
        const now = new Date();
        
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
        console.error('Error fetching activity overview data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch activity overview data'));
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  return { activityOverview, loading, error };
};
