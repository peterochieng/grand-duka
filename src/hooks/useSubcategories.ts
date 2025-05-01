
import { useState, useEffect, useCallback } from 'react';
import { 
  getSubcategories, 
  createSubcategory, 
  updateSubcategory, 
  deleteSubcategory 
} from '@/services/category';
import { SubcategoryRow } from '@/lib/types/supabaseTypes';
import { toast } from 'sonner';

export const useSubcategories = (categoryId?: string) => {
  const [subcategories, setSubcategories] = useState<SubcategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubcategories = useCallback(async (catId?: string) => {
    try {
      setLoading(true);
      const idToUse = catId || categoryId;
      console.log('Fetching subcategories for category:', idToUse);
      
      if (!idToUse) {
        console.log('No category ID provided, returning empty array');
        setSubcategories([]);
        return [];
      }
      
      const data = await getSubcategories(idToUse);
      console.log('Subcategories fetched:', data);
      setSubcategories(data);
      setError(null);
      return data;
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch subcategories'));
      toast.error('Failed to load subcategories');
      return [];
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setLoading(false);
    }
  }, [categoryId, fetchSubcategories]);

  const addSubcategory = async (subcategory: Omit<SubcategoryRow, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Adding subcategory:', subcategory);
      const newSubcategory = await createSubcategory(subcategory);
      console.log('New subcategory created:', newSubcategory);
      
      if (newSubcategory) {
        setSubcategories(prev => [...prev, newSubcategory]);
        toast.success('Subcategory added successfully');
        return newSubcategory;
      }
      
      toast.error('Failed to add subcategory - no data returned');
      return null;
    } catch (err) {
      console.error('Error adding subcategory:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to add subcategory');
      return null;
    }
  };

  const editSubcategory = async (id: string, subcategory: Partial<Omit<SubcategoryRow, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      console.log('Updating subcategory:', id, subcategory);
      const updatedSubcategory = await updateSubcategory(id, subcategory);
      console.log('Subcategory updated:', updatedSubcategory);
      
      if (updatedSubcategory) {
        setSubcategories(prev => 
          prev.map(subcat => subcat.id === id ? updatedSubcategory : subcat)
        );
        toast.success('Subcategory updated successfully');
        return updatedSubcategory;
      }
      
      toast.error('Failed to update subcategory - no data returned');
      return null;
    } catch (err) {
      console.error('Error updating subcategory:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update subcategory');
      return null;
    }
  };

  const removeSubcategory = async (id: string) => {
    try {
      const success = await deleteSubcategory(id);
      if (success) {
        setSubcategories(prev => prev.filter(subcat => subcat.id !== id));
        toast.success('Subcategory deleted successfully');
        return true;
      }
      toast.error('Failed to delete subcategory');
      return false;
    } catch (err) {
      console.error('Error deleting subcategory:', err);
      toast.error('Failed to delete subcategory');
      return false;
    }
  };

  const toggleVisibility = async (id: string, isPublished: boolean) => {
    try {
      console.log('Toggling subcategory visibility:', id, isPublished);
      
      // Get current subcategory status
      const existingSubcategory = subcategories.find(subcat => subcat.id === id);
      if (existingSubcategory && existingSubcategory.is_published === isPublished) {
        console.log('Subcategory visibility already matches requested state, no change needed');
        return existingSubcategory;
      }
      
      const result = await editSubcategory(id, { is_published: isPublished });
      if (result) {
        // Refresh data after toggling visibility
        if (categoryId) {
          await fetchSubcategories(categoryId);
        }
        toast.success(`Subcategory ${isPublished ? 'published' : 'hidden'} successfully`);
      }
      return result;
    } catch (err) {
      console.error('Error toggling subcategory visibility:', err);
      toast.error(err instanceof Error ? err.message : `Failed to ${isPublished ? 'publish' : 'hide'} subcategory`);
      return null;
    }
  };

  return { 
    subcategories, 
    loading, 
    error, 
    fetchSubcategories,
    addSubcategory, 
    editSubcategory, 
    removeSubcategory,
    toggleVisibility
  };
};
