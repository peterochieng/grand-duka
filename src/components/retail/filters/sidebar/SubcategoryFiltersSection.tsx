
import React from 'react';
import SubcategoryFilter from '../SubcategoryFilter';

interface SubcategoryFiltersSectionProps {
  subcategories: string[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
  parentCategory?: string;
}

const SubcategoryFiltersSection = ({ 
  subcategories,
  selectedValues,
  onChange,
  parentCategory
}: SubcategoryFiltersSectionProps) => {
  if (subcategories.length === 0) return null;
  
  return (
    <SubcategoryFilter
      subcategories={subcategories}
      selectedValues={selectedValues}
      onChange={onChange}
      parentCategory={parentCategory}
    />
  );
};

export default SubcategoryFiltersSection;
