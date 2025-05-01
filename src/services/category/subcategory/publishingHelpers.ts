
import { supabase } from '@/integrations/supabase/client';

/**
 * Force update all subcategories of a category to a specific published state
 */
export const updateSubcategoriesPublishedState = async (
  categoryId: string,
  isPublished: boolean
): Promise<boolean> => {
  try {
    console.log(`Updating all subcategories for category ${categoryId} to published=${isPublished}`);
    
    const { error } = await supabase
      .from('subcategories')
      .update({ is_published: isPublished, updated_at: new Date().toISOString() })
      .eq('category_id', categoryId);
    
    if (error) {
      console.error('Error updating subcategories published state:', error);
      throw new Error(error.message);
    }
    
    return true;
  } catch (err) {
    console.error('Error updating subcategories published state:', err);
    return false;
  }
};
