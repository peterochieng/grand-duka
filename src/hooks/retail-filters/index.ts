
import { useEffect } from 'react';
import { Product } from '@/lib/types';
import { useFilterHandlers } from './useFilterHandlers';
import { useFilterProcessor } from './useFilterProcessor';
import { useUrlParams } from './useUrlParams';
import { RetailFiltersResult } from './types';

export type { SortOption } from './types';

export const useRetailFilters = (allProducts: Product[]): RetailFiltersResult => {
  // Get filter handlers
  const {
    filters,
    searchTerm,
    sortOption,
    updateFilters,
    removeFilter,
    clearAllFilters,
    handleSearch,
    setSortOption,
    setFilters,
    setSearchTerm
  } = useFilterHandlers();
  
  // Process filters and get display products
  const { displayProducts, isLoading } = useFilterProcessor(
    allProducts,
    filters,
    searchTerm,
    sortOption
  );
  
  // Load initial URL parameters
  useUrlParams(setFilters, setSearchTerm);
  
  return {
    displayProducts,
    filters,
    searchTerm,
    sortOption,
    isLoading,
    updateFilters,
    removeFilter,
    clearAllFilters,
    handleSearch,
    setSortOption
  };
};
