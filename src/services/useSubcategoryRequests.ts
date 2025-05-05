import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SubcategoryRequest {
  id: string;
  category_id: string;
  category_name: string;
  subcategory_name: string;
  requested_by: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const useSubcategoryRequests = () => {
  const [requests, setRequests] = useState<SubcategoryRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subcategory_requests' as any)  // make sure this table exists
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { requests, loading, error, fetchRequests };
};