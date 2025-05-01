
import { supabase } from '@/integrations/supabase/client';
import { SubcategoryRow } from '@/lib/types/supabaseTypes';

/**
 * Fetches all subcategories for a given category
 */
export const getSubcategories = async (categoryId?: string): Promise<SubcategoryRow[]> => {
  try {
    if (!categoryId) return [];
    
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error in getSubcategories:', error);
      throw new Error(error.message);
    }
    
    return data as SubcategoryRow[];
  } catch (err) {
    console.error('Error fetching subcategories:', err);
    return [];
  }
};

/**
 * Gets the count of subcategories for a category
 */
export const getSubcategoriesCount = async (categoryId: string): Promise<number> => {
  try {
    console.log('Fetching subcategory count for category:', categoryId);
    
    const { count, error } = await supabase
      .from('subcategories')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId);
    
    if (error) {
      console.error('Error in getSubcategoriesCount:', error);
      throw new Error(error.message);
    }
    
    console.log('Subcategory count result:', count);
    return count || 0;
  } catch (err) {
    console.error('Error counting subcategories:', err);
    return 0;
  }
};

/**
 * Gets subcategories by category name
 */
export const getSubcategoriesByCategory = async (categoryName: string): Promise<SubcategoryRow[]> => {
  try {
    // First get the category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', categoryName)
      .single();
    
    if (categoryError) throw new Error(categoryError.message);
    
    if (!categoryData) {
      return [];
    }
    
    // Then get subcategories for this category
    return await getSubcategories(categoryData.id);
  } catch (err) {
    console.error('Error fetching subcategories by category name:', err);
    return [];
  }
};
