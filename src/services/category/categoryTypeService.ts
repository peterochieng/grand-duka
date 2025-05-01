
import { supabase } from '@/integrations/supabase/client';
import { CategoryRow } from '@/lib/types/supabaseTypes';

/**
 * Fetches categories filtered by trading type
 */
export const getCategoriesByType = async (tradingType: 'retail' | 'wholesale' | 'both'): Promise<{ data: CategoryRow[] | null, error: Error | null }> => {
  try {
    let query = supabase
      .from('categories')
      .select('*')
      .eq('is_published', true);
    
    if (tradingType !== 'both') {
      query = query.eq('trading_type', tradingType);
    }
    
    const { data, error } = await query.order('name', { ascending: true });
    
    if (error) throw new Error(error.message);
    
    return { data: data as CategoryRow[], error: null };
  } catch (err) {
    console.error('Error fetching categories by type:', err);
    return { data: null, error: err instanceof Error ? err : new Error('Unknown error') };
  }
};
