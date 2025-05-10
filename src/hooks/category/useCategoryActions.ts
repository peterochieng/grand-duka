
import { useState, useCallback } from 'react';
import { useCategories } from '../useCategories';
import { CategoryRow } from '@/lib/types/supabaseTypes';
import { toast } from 'sonner';

export const useCategoryActions = () => {
  // Categories state from the base hook
  const { 
    categories,
    loading: loadingCategories,
    error: categoryError,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
    toggleVisibility,
    toggleRestriction
  } = useCategories();

  // Local state for category operations
  const [selectedCategory, setSelectedCategory] = useState<CategoryRow | null>(null);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle category operations
  const handleAddCategory = useCallback(() => {
    console.log('Opening form to add a new category');
    setSelectedCategory(null);
    setIsEditMode(false);
    setCategoryFormOpen(true);
  }, []);

  const handleEditCategory = useCallback((category: CategoryRow) => {
    console.log('Opening form to edit category:', category);
    setSelectedCategory(category);
    setIsEditMode(true);
    setCategoryFormOpen(true);
  }, []);

  const handleDeleteCategory = useCallback((category: CategoryRow) => {
    console.log('Opening confirmation to delete category:', category);
    setSelectedCategory(category);
    setConfirmDeleteOpen(true);
  }, []);

  const handleConfirmDeleteCategory = useCallback(async () => {
    if (!selectedCategory) {
      console.error('No category selected for deletion');
      return;
    }
    
    console.log('Confirming deletion of category:', selectedCategory);
    
    try {
      const success = await removeCategory(selectedCategory.id);
      if (success) {
        console.log('Category deleted successfully');
        setSelectedCategory(null);
        setConfirmDeleteOpen(false);
        toast.success('Category deleted successfully');
      } else {
        console.error('Failed to delete category');
        toast.error('Failed to delete category');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Error deleting category');
    }
  }, [selectedCategory, removeCategory]);

  const handleCategorySubmit = useCallback(async (categoryData: CategoryRow) => {
    console.log('Submitting category data:', categoryData, 'isEditMode:', isEditMode);
    
    try {
      if (isEditMode && selectedCategory) {
        console.log('Updating existing category:', selectedCategory.id);
        const updatedCategory = await editCategory(selectedCategory.id, categoryData);
        
        if (updatedCategory) {
          console.log('Category updated successfully:', updatedCategory);
          setCategoryFormOpen(false);
          setIsEditMode(false);
          setSelectedCategory(updatedCategory);
          return updatedCategory;
        } else {
          console.error('Failed to update category - no data returned');
          return null;
        }
      } else {
        console.log('Creating new category');
        const newCategory = await addCategory(categoryData);
        
        if (newCategory) {
          console.log('Category added successfully:', newCategory);
          setCategoryFormOpen(false);
          return newCategory;
        } else {
          console.error('Failed to add category - no data returned');
          return null;
        }
      }
    } catch (err) {
      console.error('Error saving category:', err);
      toast.error('Error saving category');
      return null;
    }
  }, [isEditMode, selectedCategory, editCategory, addCategory]);

  return {
    // Category state
    categories,
    loadingCategories,
    categoryError,
    selectedCategory,
    categoryFormOpen,
    confirmDeleteOpen,
    isEditMode,
    searchTerm,
    
    // Category actions
    setCategoryFormOpen,
    setConfirmDeleteOpen,
    setSearchTerm,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleConfirmDeleteCategory,
    handleCategorySubmit,
    setSelectedCategory,
    toggleVisibility,
    toggleRestriction,
    setIsEditMode,
    fetchCategories,
  };
};
