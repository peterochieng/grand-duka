
import React from 'react';
import RetailSortBar from '@/components/retail/RetailSortBar';
import ActiveFilters from '@/components/retail/ActiveFilters';
import { Product } from '@/lib/types';
import { Filters } from '../FilterTypes';
import { SortOption } from '@/hooks/retail-filters/types';

interface FilterContentProps {
  displayProducts: Product[];
  filters: Filters;
  removeFilter: (filterType: keyof Filters, value?: any) => void;
  clearAllFilters: () => void;
  searchTerm: string;
  onClearSearch: () => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  children?: React.ReactNode;
}

const FilterContent = ({
  displayProducts,
  filters,
  removeFilter,
  clearAllFilters,
  searchTerm,
  onClearSearch,
  sortOption,
  setSortOption,
  children
}: FilterContentProps) => {
  return (
    <div className="w-full md:w-3/4 lg:w-4/5">
      {/* Sort and Filter Bar */}
      <div className="mb-6">
        <RetailSortBar 
          totalItems={displayProducts.length} 
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        
        {/* Active Filters */}
        <ActiveFilters 
          filters={filters}
          removeFilter={removeFilter}
          clearAllFilters={clearAllFilters}
          searchTerm={searchTerm}
          onClearSearch={onClearSearch}
        />
      </div>
      
      {/* Products Grid will be rendered in the parent component */}
      {children}
    </div>
  );
};

export default FilterContent;
