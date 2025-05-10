import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_published", true)  // Only published categories
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};