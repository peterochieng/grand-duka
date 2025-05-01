
import { Product } from '@/lib/types';
import { Filters } from '@/components/retail/filters/FilterTypes';

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'relevance';

export interface RetailFiltersState {
  displayProducts: Product[];
  filters: Filters;
  searchTerm: string;
  sortOption: SortOption;
  isLoading: boolean;
}

export interface RetailFiltersActions {
  updateFilters: (newFilters: Partial<Filters>) => void;
  removeFilter: (filterType: keyof Filters, value?: any) => void;
  clearAllFilters: () => void;
  handleSearch: (term: string) => void;
  setSortOption: (option: SortOption) => void;
}

export interface RetailFiltersResult extends RetailFiltersState, RetailFiltersActions {}
