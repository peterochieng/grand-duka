
import { supabase } from '@/integrations/supabase/client';
import { SubcategoryRow } from '@/lib/types/supabaseTypes';
import { getCategoryById } from '../categoryService';

/**
 * Creates a new subcategory
 */
export const createSubcategory = async (
  subcategory: Omit<SubcategoryRow, 'id' | 'created_at' | 'updated_at'>
): Promise<SubcategoryRow | null> => {
  try {
    // Check if the parent category is published
    if (subcategory.category_id) {
      const parentCategory = await getCategoryById(subcategory.category_id);
      
      // If parent category exists and is not published, force subcategory to be unpublished
      if (parentCategory && !parentCategory.is_published) {
        subcategory.is_published = false;
      }
    }
    
    const { data, error } = await supabase
      .from('subcategories')
      .insert([subcategory])
      .select();
    
    if (error) {
      console.error('Error creating subcategory:', error);
      throw new Error(error.message);
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from insert operation');
    }
    
    return data[0] as SubcategoryRow;
  } catch (err) {
    console.error('Error creating subcategory:', err);
    throw err;
  }
};
