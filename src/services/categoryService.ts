
// This file is maintained for backward compatibility
// Import all functionality from the new modular services
import * as CategoryServices from './category';

// Re-export everything
export const {
  // Category services
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  
  // Subcategory services
  getSubcategories,
  getSubcategoriesCount,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoriesByCategory,
  
  // Category type services
  getCategoriesByType,
  
  // Initialization services
  initializeDefaultCategories
} = CategoryServices;
