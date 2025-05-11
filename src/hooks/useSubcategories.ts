import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useSubcategories = (categoryId?: string) => {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubcategories = useCallback(async () => {
    if (!categoryId) {
      setSubcategories([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("subcategories")
      .select("*")
      .eq("category_id", categoryId)
      .order("name", { ascending: true });
    if (error) {
      console.error("Error fetching subcategories:", error);
      setError(error);
      setSubcategories([]);
    } else {
      setSubcategories(data || []);
      console.log(data)
    }
    setLoading(false);
  }, [categoryId]);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  const addSubcategory = async (subcategoryData: any) => {
    const { data, error } = await supabase
      .from("subcategories")
      .insert([subcategoryData])
      .single();
    if (error) throw error;
    await fetchSubcategories();
    return data;
  };

  // New update function
  const updateSubcategory = async (subcategoryData: any) => {
    const { id, ...updateData } = subcategoryData;
    const { data, error } = await supabase
      .from("subcategories")
      .update(updateData)
      .eq("id", id)
      .single();
    if (error) throw error;
    await fetchSubcategories();
    return data;
  };

  const toggleSubcategoryVisibility = async (id: string, newState: boolean) => {
    const { error } = await supabase
      .from("subcategories")
      .update({ is_published: newState })
      .eq("id", id);
    if (error) {
      console.error("Error toggling subcategory visibility:", error);
    } else {
      await fetchSubcategories();
    }
  };

  const toggleSubcategoryRestriction = async (id: string, newState: boolean) => {
    const { error } = await supabase
      .from("subcategories")
      .update({ restricted: newState })
      .eq("id", id);
    if (error) {
      console.error("Error toggling subcategory restriction:", error);
    } else {
      await fetchSubcategories();
    }
  };
  

  return {
    subcategories,
    loading,
    error,
    fetchSubcategories,
    addSubcategory,
    updateSubcategory,
    toggleSubcategoryVisibility,
    toggleSubcategoryRestriction,
  };
};