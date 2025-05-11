import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAllSubcategories = () => {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllSubcategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("subcategories")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        console.error("Error fetching all subcategories:", error);
        setError(error);
        setSubcategories([]);
      } else {
        setSubcategories(data || []);
      }
      setLoading(false);
    };

    fetchAllSubcategories();
  }, []);

  return { subcategories, loading, error };
};