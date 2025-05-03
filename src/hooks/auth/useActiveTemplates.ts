import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useActiveTemplates = (subcategoryId?: string) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      let query = supabase.from('subcategory_templates' as any).select('*').eq('is_active', true);
      if (subcategoryId) {
        // Use the "or" filter to fetch templates with a matching subcategory OR global templates (subcategory_id is null)
        query = supabase
          .from('subcategory_templates' as any)
          .select('*')
          .eq('is_active', true)
          .or(`subcategory_id.eq.${subcategoryId},subcategory_id.is.null`);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching active templates:', error);
      } else {
        setTemplates(data || []);
      }
      setLoading(false);
    };

    fetchTemplates();
  }, [subcategoryId]);

  return { templates, loading };
};