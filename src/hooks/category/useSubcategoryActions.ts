
import { useState, useCallback } from 'react';
import { useSubcategories } from '../useSubcategories';
import { CategoryRow, SubcategoryRow } from '@/lib/types/supabaseTypes';
import { toast } from 'sonner';

export const useSubcategoryActions = (selectedCategory: CategoryRow | null) => {
  // Subcategories state from the base hook
  const { 
    subcategories,
    loading: loadingSubcategories,
    error: subcategoryError,
    fetchSubcategories,
    addSubcategory,
    editSubcategory,
    removeSubcategory,
    toggleVisibility: toggleSubcatVisibility
  } = useSubcategories(selectedCategory?.id);

  // Local state for subcategory operations
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoryRow | null>(null);
  const [subcategoryFormOpen, setSubcategoryFormOpen] = useState(false);
  const [confirmSubcatDeleteOpen, setConfirmSubcatDeleteOpen] = useState(false);
  const [isSubcatEditMode, setIsSubcatEditMode] = useState(false);

  // Handle subcategory operations
  const handleAddSubcategory = useCallback(() => {
    if (!selectedCategory) {
      toast.error('Please select a category first');
      return;
    }
    
    setSelectedSubcategory(null);
    setIsSubcatEditMode(false);
    setSubcategoryFormOpen(true);
  }, [selectedCategory]);

  const handleEditSubcategory = useCallback((subcategory: SubcategoryRow) => {
    setSelectedSubcategory(subcategory);
    setIsSubcatEditMode(true);
    setSubcategoryFormOpen(true);
  }, []);

  const handleDeleteSubcategory = useCallback((subcategory: SubcategoryRow) => {
    setSelectedSubcategory(subcategory);
    setConfirmSubcatDeleteOpen(true);
  }, []);

  const handleConfirmDeleteSubcategory = useCallback(async () => {
    if (!selectedSubcategory) return;
    
    try {
      const success = await removeSubcategory(selectedSubcategory.id);
      if (success) {
        setSelectedSubcategory(null);
        setConfirmSubcatDeleteOpen(false);
        toast.success('Subcategory deleted successfully');
      } else {
        toast.error('Failed to delete subcategory');
      }
    } catch (err) {
      console.error('Error deleting subcategory:', err);
      toast.error('Error deleting subcategory');
    }
  }, [selectedSubcategory, removeSubcategory]);

  const handleSubcategorySubmit = useCallback(async (subcategoryData: Omit<SubcategoryRow, "id" | "created_at" | "updated_at">) => {
    try {
      // Make sure category_id is set if we're adding a new subcategory
      if (!isSubcatEditMode && selectedCategory && !subcategoryData.category_id) {
        subcategoryData.category_id = selectedCategory.id;
      }

      console.log('Submitting subcategory data:', subcategoryData);

      if (isSubcatEditMode && selectedSubcategory) {
        const updatedSubcategory = await editSubcategory(selectedSubcategory.id, subcategoryData);
        if (updatedSubcategory) {
          setSubcategoryFormOpen(false);
          setIsSubcatEditMode(false);
          return updatedSubcategory;
        }
      } else {
        const newSubcategory = await addSubcategory(subcategoryData);
        if (newSubcategory) {
          setSubcategoryFormOpen(false);
          return newSubcategory;
        }
      }
      return null;
    } catch (err) {
      console.error('Error saving subcategory:', err);
      toast.error('Error saving subcategory');
      return null;
    }
  }, [isSubcatEditMode, selectedCategory, selectedSubcategory, editSubcategory, addSubcategory]);

  return {
    // Subcategory state
    subcategories,
    loadingSubcategories,
    subcategoryError,
    selectedSubcategory,
    subcategoryFormOpen,
    confirmSubcatDeleteOpen,
    isSubcatEditMode,
    
    // Subcategory actions
    fetchSubcategories,
    setSubcategoryFormOpen,
    setConfirmSubcatDeleteOpen,
    handleAddSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,
    handleConfirmDeleteSubcategory,
    handleSubcategorySubmit,
    toggleSubcatVisibility,
    setIsSubcatEditMode,
    setSelectedSubcategory,
  };
};
