
import { SupabaseClient } from '@supabase/supabase-js';

// Helper to calculate growth percentage
export const calculateGrowth = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

// Helper to fetch count with date filter
export const fetchCountWithDateFilter = async (
  supabase: SupabaseClient,
  table: string,
  beforeDate?: string,
  additionalFilters?: Record<string, any>
) => {
  let query = supabase.from(table).select('*', { count: 'exact', head: true });
  
  if (beforeDate) {
    query = query.lt('created_at', beforeDate);
  }
  
  if (additionalFilters) {
    Object.entries(additionalFilters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }
  
  const { count, error } = await query;
  
  if (error) {
    console.error(`Error fetching ${table} count:`, error);
    return 0;
  }
  
  return count || 0;
};

// Safe way to extract profile data
export const getProfileName = (profile: any): string => {
  if (!profile) return '';
  const firstName = profile.first_name || '';
  const lastName = profile.last_name || '';
  return `${firstName} ${lastName}`.trim() || 'Unknown';
};

// Safe way to get user role from app_metadata
export const getUserRole = (user: any): string => {
  try {
    return user?.app_metadata?.role || 'buyer';
  } catch (e) {
    return 'buyer';
  }
};
