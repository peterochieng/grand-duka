
import { supabase } from '@/integrations/supabase/client';

/**
 * Deletes a subcategory
 */
export const deleteSubcategory = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('subcategories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting subcategory:', error);
      throw new Error(error.message);
    }
    
    return true;
  } catch (err) {
    console.error('Error deleting subcategory:', err);
    throw err;
  }
};
