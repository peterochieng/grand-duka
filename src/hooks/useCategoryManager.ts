import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "./use-toast";

export const useCategoryManager = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<Error | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [categoryFormOpen, setCategoryFormOpen] = useState<boolean>(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*, subcategories(*)")
      .order("name", { ascending: true });
    if (error) {
      setCategoryError(error);
      console.error("Error fetching categories:", error);
      setCategories([]);
    } else {
      setCategories(data || []);
    }
    setLoadingCategories(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

// Helper to add a new category with duplicate-name check (case-insensitive)
const addCategory = async (
  categoryData: Omit<any, "id" | "created_at" | "updated_at">
) => {
  // First, check if a category with the same name (ignoring case) exists.
  const { data: existing, error: existingError } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", categoryData.name) // case-insensitive comparison
    .maybeSingle();
  
  if (existing) {
    throw new Error(`Category with name "${categoryData.name}" already exists.`);
  }
  
  if (existingError) {
    // If there's an error during the check, throw it.
    throw existingError;
  }

  // Proceed with inserting the new category since no duplicate was found.
  const { data, error } = await supabase
    .from("categories")
    .insert([categoryData])
    .single();
  if (error) {
    throw error;
  }
  return data;
};

  // Helper to update an existing category
  const updateCategory = async (categoryData: any) => {
    const { id, ...updateData } = categoryData;
    const { data, error } = await supabase
      .from("categories")
      .update(updateData)
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  };

  // handleCategorySubmit decides whether to insert or update the category.
  const handleCategorySubmit = useCallback(
    async (categoryData: any) => {
      console.log(categoryData);
      try {
        if (isEditMode && categoryData?.id) {
          // Edit mode: update existing category
          await updateCategory(categoryData);
        } else {
          // Insertion mode: add new category
          await addCategory(categoryData);
        }
        await fetchCategories();
        setIsEditMode(false);
        setCategoryFormOpen(false);
      } catch (error) {
        console.error("Error saving category:", error);
        toast({ message: error.message || "Failed to save category", variant: "error" });
        throw error;
      }
    },
    [isEditMode, fetchCategories]
  );

  // Toggle published status for a given category
  const toggleVisibility = async (id: string, newState: boolean) => {
    const { error } = await supabase
      .from("categories")
      .update({ is_published: newState })
      .eq("id", id);
    if (error) {
      console.error("Error toggling visibility:", error);
    } else {
      await fetchCategories();
      console.log("Visibility updated for", id, "to", newState);
    }
  };

  // Toggle restricted flag for a given category
  const toggleRestriction = async (id: string, newState: boolean) => {
    const { error } = await supabase
      .from("categories")
      .update({ restricted: newState })
      .eq("id", id);
    if (error) {
      console.error("Error toggling restriction:", error);
    } else {
      await fetchCategories();
      console.log("Restriction toggled for", id, "to", newState);
    }
  };

  const handleAddCategory = () => {
    setCategoryFormOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setIsEditMode(true);
    setCategoryFormOpen(true);
  };

  const handleDeleteCategory = async (category: any) => {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", category.id);
      if (error) {
        throw error;
      }
      await fetchCategories();
      console.log("Category deleted:", category.id);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  const handleConfirmDeleteCategory = async () => {
    // Implement confirm delete logic if needed.
  };

  return {
    categories,
    loadingCategories,
    categoryError,
    isEditMode,
    categoryFormOpen,
    confirmDeleteOpen,
    searchTerm,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleConfirmDeleteCategory,
    handleCategorySubmit,
    toggleVisibility,
    toggleRestriction,
    setCategoryFormOpen,
    setConfirmDeleteOpen,
    setSearchTerm,
  };
};