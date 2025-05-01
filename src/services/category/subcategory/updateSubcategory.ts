
import { supabase } from '@/integrations/supabase/client';
import { SubcategoryRow } from '@/lib/types/supabaseTypes';
import { getCategoryById } from '../categoryService';

/**
 * Updates an existing subcategory
 */
export const updateSubcategory = async (
  id: string, 
  updates: Partial<Omit<SubcategoryRow, 'id' | 'created_at' | 'updated_at'>>
): Promise<SubcategoryRow | null> => {
  try {
    // Get the current subcategory to find the category_id
    const { data: currentSubcategory, error: subcategoryError } = await supabase
      .from('subcategories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (subcategoryError) {
      console.error('Error fetching subcategory:', subcategoryError);
      throw new Error(subcategoryError.message);
    }
    
    const categoryId = updates.category_id !== undefined ? updates.category_id : currentSubcategory.category_id;
    
    // Check parent category published status
    if (categoryId) {
      const parentCategory = await getCategoryById(categoryId);
      
      // If parent category exists and is not published, force subcategory to be unpublished
      if (parentCategory && !parentCategory.is_published) {
        updates.is_published = false;
      }
    }
    
    // Create a complete object with all required fields
    const upsertData = {
      id,
      name: updates.name !== undefined ? updates.name : currentSubcategory.name,
      category_id: categoryId,
      is_published: updates.is_published !== undefined ? updates.is_published : currentSubcategory.is_published,
      updated_at: new Date().toISOString()
    };
    
    console.log('Using upsert data for subcategory:', upsertData);
    
    // Update the subcategory using UPSERT to force an update
    const { data, error } = await supabase
      .from('subcategories')
      .upsert(upsertData)
      .select();
    
    if (error) {
      console.error('Error updating subcategory:', error);
      throw new Error(error.message);
    }
    
    // If data returned, use it
    if (data && data.length > 0) {
      console.log('Subcategory updated successfully with returned data:', data[0]);
      return data[0] as SubcategoryRow;
    }
    
    // If no data returned (should not happen with upsert but as fallback)
    const updatedSubcategory = {
      ...currentSubcategory,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    console.log('Subcategory updated successfully (manually constructed):', updatedSubcategory);
    return updatedSubcategory as SubcategoryRow;
  } catch (err) {
    console.error('Error updating subcategory:', err);
    throw err;
  }
};
