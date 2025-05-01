
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from '@/lib/types';
import RetailFilterSection from './RetailFilterSection';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onChange: (categoryId: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory,
  onChange 
}: CategoryFilterProps) => {
  return (
    <RetailFilterSection title="Categories" defaultOpen={true}>
      <div className="space-y-2 pt-1">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`category-${category.id}`}
              checked={selectedCategory === category.id}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange(category.id);
                } else {
                  onChange('');
                }
              }}
            />
            <label 
              htmlFor={`category-${category.id}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {category.name} ({category.count})
            </label>
          </div>
        ))}
      </div>
    </RetailFilterSection>
  );
};

export default CategoryFilter;
