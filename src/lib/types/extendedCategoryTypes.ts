
import { Category } from './categoryTypes';

// Extended category type that includes specialized subcategories
export interface ExtendedCategory extends Category {
  specialSubcategories?: Record<string, string[]>;
}

// Helper function to check if a category has specialized subcategories
export function hasSpecialSubcategories(category: Category): category is ExtendedCategory {
  return 'specialSubcategories' in category && 
    !!category['specialSubcategories' as keyof Category];
}
