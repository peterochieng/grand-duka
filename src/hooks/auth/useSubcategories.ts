import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSubcategories = () => {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('subcategories').select('*');
      if (error) {
        console.error('Error fetching subcategories:', error);
      } else {
        setSubcategories(data || []);
      }
      setLoading(false);
    };

    fetchSubcategories();
  }, []);

  return { subcategories, loading };
};