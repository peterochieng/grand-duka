import React, { useCallback } from 'react';
import { Product } from '@/lib/types';
import { Filters } from './filters/FilterTypes';
import FilterSidebar from './filters/container/FilterSidebar';
import FilterContent from './filters/container/FilterContent';
import { SortOption } from '@/hooks/retail-filters/types';
import { useCategories } from '@/hooks/useCategories';

interface RetailFiltersContainerProps {
  products: Product[];
  displayProducts: Product[];
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  removeFilter: (filterType: keyof Filters, value?: any) => void;
  clearAllFilters: () => void;
  searchTerm: string;
  onClearSearch: () => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  children?: React.ReactNode;
}

const RetailFiltersContainer = ({
  products,
  displayProducts,
  filters,
  updateFilters,
  removeFilter,
  clearAllFilters,
  searchTerm,
  onClearSearch,
  sortOption,
  setSortOption,
  children
}: RetailFiltersContainerProps) => {
  const { categories, loading: catLoading, error: catError } = useCategories();

  // Memoized handler to prevent unnecessary re-renders
  const handleUpdateFilters = useCallback((newFilters: Partial<Filters>) => {
    updateFilters(newFilters);
  }, [updateFilters]);

  if (catLoading) {
    return <p>Loading categories...</p>;
  }
  if (catError) {
    return <p className="text-red-500">Error loading categories</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filter Sidebar */}
      <FilterSidebar 
        filters={filters}
        updateFilters={handleUpdateFilters}
        categories={categories}
        products={products}
      />
      
      {/* Main Content */}
      <FilterContent
        displayProducts={displayProducts}
        filters={filters}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
        searchTerm={searchTerm}
        onClearSearch={onClearSearch}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categories={categories}  // Pass live categories down
      >
        {children}
      </FilterContent>
    </div>
  );
};

export default RetailFiltersContainer;