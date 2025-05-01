
import { useState, useCallback } from 'react';
import { useCategoryActions } from './category/useCategoryActions';
import { useSubcategoryActions } from './category/useSubcategoryActions';
import { useCategories } from './useCategories';

export const useCategoryManager = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('categories');

  // Get predefined subcategories function
  const { addPredefinedSubcategories } = useCategories();
  
  // Get category actions and state
  const categoryActions = useCategoryActions();
  
  // Get subcategory actions and state
  const subcategoryActions = useSubcategoryActions(categoryActions.selectedCategory);

  // Handle tab change
  const handleChangeTab = useCallback((tab: string) => {
    setActiveTab(tab);
    
    // If switching to subcategories tab and no category is selected, show a message
    if (tab === 'subcategories' && !categoryActions.selectedCategory) {
      setActiveTab('categories');
    }
  }, [categoryActions.selectedCategory]);

  return {
    // Tab state
    activeTab,
    
    // Category state and actions
    ...categoryActions,
    
    // Subcategory state and actions
    ...subcategoryActions,
    
    // Tab navigation
    handleChangeTab,
    
    // Add predefined subcategories function
    addPredefinedSubcategories
  };
};
