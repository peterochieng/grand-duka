
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import RetailFilterSection from './RetailFilterSection';
import { SubcategoryFilterProps } from './FilterTypes';

const SubcategoryFilter = ({ 
  subcategories,
  selectedValues, 
  onChange,
  parentCategory
}: SubcategoryFilterProps) => {
  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <RetailFilterSection title="Subcategories">
      <div className="space-y-2 pt-1">
        {subcategories.map((subcategory) => (
          <div key={subcategory} className="flex items-center space-x-2">
            <Checkbox 
              id={`subcategory-${subcategory}`}
              checked={selectedValues.includes(subcategory)}
              onCheckedChange={(checked) => {
                onChange(subcategory, !!checked);
              }}
            />
            <label 
              htmlFor={`subcategory-${subcategory}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {subcategory}
            </label>
          </div>
        ))}
      </div>
    </RetailFilterSection>
  );
};

export default SubcategoryFilter;
