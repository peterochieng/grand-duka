import { supabase } from '@/integrations/supabase/client';
import { CategoryRow } from '@/lib/types/supabaseTypes';
import { updateSubcategoriesPublishedState } from './subcategory/publishingHelpers';

export const getCategories = async (): Promise<CategoryRow[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error in getCategories:', error);
      throw new Error(error.message);
    }
    
    return data as CategoryRow[];
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
};

export const getCategoryById = async (id: string): Promise<CategoryRow | null> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error in getCategoryById:', error);
      throw new Error(error.message);
    }
    
    return data as CategoryRow;
  } catch (err) {
    console.error('Error fetching category by ID:', err);
    return null;
  }
};

export const createCategory = async (
  category: Omit<CategoryRow, 'id' | 'created_at' | 'updated_at'>
): Promise<CategoryRow | null> => {
  try {
    // First, check if a category with the same name already exists
    const { data: existing, error: searchError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', category.name)
      .maybeSingle();
    
    if (searchError) {
      console.error('Error checking for existing category:', searchError);
      throw new Error(searchError.message);
    }
    
    if (existing) {
      throw new Error('A category with this name already exists');
    }
    
    // Proceed with insertion if no duplicate is found
    const categoryData = {
      name: category.name,
      description: category.description || '',
      is_published: category.is_published !== false,
      restricted: category.restricted === true,
      trading_type: category.trading_type || 'both',
      icon: category.icon || 'Package'
    };
    
    console.log('Creating category with data:', categoryData);
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select();
    
    if (error) {
      console.error('Error in createCategory:', error);
      throw new Error(error.message);
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from the insert operation');
    }
    
    console.log('Category created successfully:', data[0]);
    return data[0] as CategoryRow;
  } catch (err) {
    console.error('Error creating category:', err);
    throw err;
  }
};

export const updateCategory = async (
  id: string, 
  updates: Partial<Omit<CategoryRow, 'id' | 'created_at' | 'updated_at'>>
): Promise<CategoryRow | null> => {
  try {
    console.log('Updating category with ID and data:', id, updates);
    
    const currentCategory = await getCategoryById(id);
    
    if (!currentCategory) {
      throw new Error('Category not found');
    }
    
    // Handle publishing state changes for subcategories
    if (updates.is_published !== undefined && updates.is_published !== currentCategory.is_published) {
      if (updates.is_published === false) {
        // When a category is hidden, all its subcategories must also be hidden
        console.log('Category is being unpublished. Unpublishing all subcategories as well.');
        await updateSubcategoriesPublishedState(id, false);
      }
      // Note: When a category is published, we don't automatically publish subcategories
      // They maintain their individual states
    }
    
    // Only include fields that need to be updated
    const updateData: any = {};
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.is_published !== undefined) updateData.is_published = updates.is_published;
    if (updates.restricted !== undefined) updateData.restricted = updates.restricted;
    if (updates.trading_type !== undefined) updateData.trading_type = updates.trading_type;
    if (updates.parent_id !== undefined) updateData.parent_id = updates.parent_id;
    if (updates.icon !== undefined) updateData.icon = updates.icon;
    
    updateData.updated_at = new Date().toISOString();
    
    console.log('Using update data:', updateData);
    
    const { data, error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error in updateCategory:', error);
      throw new Error(error.message);
    }
    
    if (data && data.length > 0) {
      console.log('Category updated successfully with returned data:', data[0]);
      return data[0] as CategoryRow;
    }
    
    // As a fallback, get the updated category
    const updatedCategory = await getCategoryById(id);
    if (updatedCategory) {
      console.log('Category updated successfully (fetched after update):', updatedCategory);
      return updatedCategory;
    }
    
    throw new Error('Failed to retrieve updated category');
  } catch (err) {
    console.error('Error updating category:', err);
    throw err;
  }
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const { error: subcatError } = await supabase
      .from('subcategories')
      .delete()
      .eq('category_id', id);
    
    if (subcatError) {
      console.error('Error deleting subcategories:', subcatError);
      throw new Error(subcatError.message);
    }
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting category:', error);
      throw new Error(error.message);
    }
    
    return true;
  } catch (err) {
    console.error('Error deleting category:', err);
    throw err;
  }
};

/**
 * Add multiple subcategories to a category in one operation
 */
export const addSubcategoriesToCategory = async (
  categoryId: string,
  subcategoryNames: string[],
  isPublished: boolean = true
): Promise<boolean> => {
  try {
    // Get the current category to check its published state
    const category = await getCategoryById(categoryId);
    if (!category) {
      console.error(`Category with ID ${categoryId} not found`);
      return false;
    }

    console.log(`Adding ${subcategoryNames.length} subcategories to category ${category.name} (${categoryId})`);
    
    // If the parent category is not published, force subcategories to be unpublished
    const effectivePublishedState = category.is_published ? isPublished : false;
    
    // Prepare the subcategories data
    const subcategories = subcategoryNames.map(name => ({
      name,
      category_id: categoryId,
      is_published: effectivePublishedState
    }));
    
    // Insert all subcategories in a single operation
    const { error } = await supabase
      .from('subcategories')
      .insert(subcategories);
    
    if (error) {
      console.error('Error adding subcategories:', error);
      throw new Error(error.message);
    }
    
    console.log(`Successfully added ${subcategoryNames.length} subcategories to category ${category.name}`);
    return true;
  } catch (err) {
    console.error('Error in addSubcategoriesToCategory:', err);
    return false;
  }
};
