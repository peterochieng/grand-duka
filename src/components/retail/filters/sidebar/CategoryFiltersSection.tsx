
import React from 'react';
import { Category } from '@/lib/types';
import CategoryFilter from '../CategoryFilter';

interface CategoryFiltersSectionProps {
  categories: Category[];
  selectedCategory?: string;
  onChange: (categoryId: string) => void;
}

const CategoryFiltersSection = ({ 
  categories,
  selectedCategory,
  onChange
}: CategoryFiltersSectionProps) => {
  return (
    <CategoryFilter 
      categories={categories} 
      selectedCategory={selectedCategory}
      onChange={onChange}
    />
  );
};

export default CategoryFiltersSection;
