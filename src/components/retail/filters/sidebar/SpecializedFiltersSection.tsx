
import React from 'react';
import { Category } from '@/lib/types';
import SpecializedSubcategoryFilter from '../SpecializedSubcategoryFilter';
import { hasSpecialSubcategories } from '@/lib/types/extendedCategoryTypes';

interface SpecializedFiltersSectionProps {
  selectedCategory: Category | undefined;
  specializedFilters: Record<string, string[]>;
  onSpecializedFilterChange: (section: string, value: string, checked: boolean) => void;
}

const SpecializedFiltersSection = ({ 
  selectedCategory, 
  specializedFilters,
  onSpecializedFilterChange 
}: SpecializedFiltersSectionProps) => {
  if (!selectedCategory || !hasSpecialSubcategories(selectedCategory)) return null;
  
  return (
    <SpecializedSubcategoryFilter
      category={selectedCategory}
      selectedValues={specializedFilters}
      onChange={onSpecializedFilterChange}
    />
  );
};

export default SpecializedFiltersSection;
