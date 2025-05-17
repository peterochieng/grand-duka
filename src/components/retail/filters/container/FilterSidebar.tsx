import React from 'react';
import RetailFilterSidebar from '@/components/retail/RetailFilterSidebar';
import { Category, Product } from '@/lib/types';
import { Filters } from '../FilterTypes';

interface FilterSidebarProps {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  categories: Category[];
  products: Product[];
}


const FilterSidebar = ({
  filters,
  updateFilters,
  categories,
  products
}: FilterSidebarProps) => {

  return (
    <div className="w-full md:w-1/4 lg:w-1/5">
      <RetailFilterSidebar 
        filters={filters} 
        updateFilters={updateFilters}
        categories={categories}
        products={products}
      />
    </div>
  );
};

export default FilterSidebar;