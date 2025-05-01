import { useState, useEffect, useCallback } from 'react';
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '@/services/category';
import { CategoryRow } from '@/lib/types/supabaseTypes';
import { toast } from 'sonner';
import { initializeSpecificSubcategories } from '@/services/category/categoryInitService';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      console.log('Fetching categories from database...');
      const data = await getCategories();
      console.log('Categories fetched:', data);
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (category: Omit<CategoryRow, "id" | "created_at" | "updated_at">) => {
    try {
      console.log('Adding category:', category);
      const newCategory = await createCategory(category);
      console.log('New category created:', newCategory);
      
      if (newCategory) {
        setCategories(prev => [...prev, newCategory]);
        toast.success('Category added successfully');
        return newCategory;
      }
      toast.error('Failed to add category - no data returned');
      return null;
    } catch (err) {
      console.error('Error adding category:', err);
      toast.error('Failed to add category');
      return null;
    }
  };

  const editCategory = async (id: string, category: Partial<Omit<CategoryRow, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      console.log('Updating category:', id, category);
      const updatedCategory = await updateCategory(id, category);
      console.log('Category updated:', updatedCategory);
      
      if (updatedCategory) {
        setCategories(prev => 
          prev.map(cat => cat.id === id ? updatedCategory : cat)
        );
        toast.success('Category updated successfully');
        return updatedCategory;
      }
      toast.error('Failed to update category - no data returned');
      return null;
    } catch (err) {
      console.error('Error updating category:', err);
      toast.error('Failed to update category');
      return null;
    }
  };

  const removeCategory = async (id: string) => {
    try {
      const success = await deleteCategory(id);
      if (success) {
        setCategories(prev => prev.filter(cat => cat.id !== id));
        toast.success('Category deleted successfully');
        return true;
      }
      toast.error('Failed to delete category');
      return false;
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Failed to delete category');
      return false;
    }
  };

  const toggleVisibility = useCallback(async (id: string, isPublished: boolean) => {
    try {
      console.log('Toggling visibility:', id, isPublished);
      
      // Get current category status
      const existingCategory = categories.find(cat => cat.id === id);
      if (existingCategory && existingCategory.is_published === isPublished) {
        console.log('Category visibility already matches requested state, no change needed');
        return existingCategory;
      }
      
      // Use the editCategory function which will handle updating the database
      const result = await editCategory(id, { is_published: isPublished });
      if (result) {
        // Force refresh categories to ensure we have the latest data
        await fetchCategories();
        toast.success(`Category ${isPublished ? 'published' : 'hidden'} successfully`);
      }
      return result;
    } catch (err) {
      console.error('Error toggling category visibility:', err);
      toast.error(`Failed to ${isPublished ? 'publish' : 'hide'} category`);
      return null;
    }
  }, [categories]);

  const toggleRestriction = useCallback(async (id: string, restricted: boolean) => {
    try {
      console.log('Toggling restriction:', id, restricted);
      const result = await editCategory(id, { restricted });
      if (result) {
        // Refresh after toggle to ensure data consistency
        await fetchCategories();
        toast.success(`Category ${restricted ? 'restricted' : 'unrestricted'} successfully`);
      }
      return result;
    } catch (err) {
      console.error('Error toggling category restriction:', err);
      toast.error(`Failed to ${restricted ? 'restrict' : 'unrestrict'} category`);
      return null;
    }
  }, []);

  const addPredefinedSubcategories = async () => {
    try {
      setLoading(true);
      const results = await initializeSpecificSubcategories();
      console.log('Subcategory initialization results:', results);
      
      // Show appropriate toasts based on results
      const successCount = Object.values(results).filter(Boolean).length;
      
      if (successCount === 3) {
        toast.success('All subcategories added successfully');
      } else if (successCount > 0) {
        toast.success(`Added subcategories to ${successCount} categories`);
      } else {
        toast.error('Failed to add subcategories');
      }
      
      // Refresh categories to show the new subcategories
      await fetchCategories();
      return results;
    } catch (err) {
      console.error('Error adding predefined subcategories:', err);
      toast.error('Failed to add subcategories');
      return {
        babyEssentials: false,
        antiques: false,
        booksMoviesMusic: false
      };
    } finally {
      setLoading(false);
    }
  };

  return { 
    categories, 
    loading, 
    error, 
    fetchCategories,
    addCategory, 
    editCategory, 
    removeCategory, 
    toggleVisibility,
    toggleRestriction,
    addPredefinedSubcategories
  };
};

export const useCategoryById = (id: string) => {
  const [category, setCategory] = useState<CategoryRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await getCategoryById(id);
        setCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch category'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  return { category, loading, error };
};
