import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAvailableTemplates = (categoryId?: string, subcategoryId?: string) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      // Fetch all active templates
      const { data, error } = await supabase
        .from("subcategory_templates" as any)
        .select("*")
        .eq("is_active", true);
      if (error) {
        setError(error);
        setTemplates([]);
      } else {
        let filtered = data || [];
        // If either categoryId or subcategoryId is provided,
        // filter for:
        //  a) templates whose subcategory_id === subcategoryId OR
        //  b) templates whose category_id === categoryId and subcategory_id is null.
        if (subcategoryId || categoryId) {
          filtered = filtered.filter((template: any) => {
            const bySubcategory = subcategoryId && template.subcategory_id === subcategoryId;
            const byCategory = categoryId && template.category_id === categoryId && !template.subcategory_id;
            return bySubcategory || byCategory;
          });
        }
        setTemplates(filtered);
      }
      setLoading(false);
    };

    fetchTemplates();
  }, [categoryId, subcategoryId]);

  return { templates, loading, error };
};