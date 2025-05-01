
import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '@/components/retail/filters/FilterTypes';
import { SortOption } from './types';

export const useFilterHandlers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => {
      const updatedFilters = { ...prev, ...newFilters };
      
      // Update URL params
      const params = new URLSearchParams(searchParams);
      
      // Handle category
      if (updatedFilters.category) {
        params.set('category', updatedFilters.category);
      } else {
        params.delete('category');
      }
      
      // Handle subcategory
      if (updatedFilters.subcategory && updatedFilters.subcategory.length > 0) {
        params.set('subcategory', updatedFilters.subcategory.join(','));
      } else {
        params.delete('subcategory');
      }
      
      setSearchParams(params);
      return updatedFilters;
    });
  }, [searchParams, setSearchParams]);

  // Remove a specific filter
  const removeFilter = useCallback((filterType: keyof Filters, value?: any) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'category') {
        delete newFilters.category;
        // Also remove subcategory when category is removed
        delete newFilters.subcategory;
        // Also remove specialized filters when category is removed
        delete newFilters.specializedFilters;
      } else if (filterType === 'priceRange') {
        delete newFilters.priceRange;
      } else if (filterType === 'specializedFilters' && value) {
        // Handle removing a specific specialized filter section or value
        const [section, filterValue] = value.split(':');
        if (newFilters.specializedFilters) {
          if (filterValue) {
            // Remove specific value from section
            if (newFilters.specializedFilters[section]) {
              newFilters.specializedFilters[section] = newFilters.specializedFilters[section]
                .filter(v => v !== filterValue);
                
              // Remove section if empty
              if (newFilters.specializedFilters[section].length === 0) {
                delete newFilters.specializedFilters[section];
              }
            }
          } else {
            // Remove entire section
            delete newFilters.specializedFilters[section];
          }
          
          // Remove specialized filters object if empty
          if (Object.keys(newFilters.specializedFilters).length === 0) {
            delete newFilters.specializedFilters;
          }
        }
      } else if (Array.isArray(newFilters[filterType]) && value) {
        newFilters[filterType] = newFilters[filterType]?.filter(v => v !== value) as any;
        if (newFilters[filterType]?.length === 0) {
          delete newFilters[filterType];
        }
      }
      
      // Update URL params
      const params = new URLSearchParams(searchParams);
      if (filterType === 'category') {
        params.delete('category');
        params.delete('subcategory');
      } else if (filterType === 'subcategory' && value) {
        if (newFilters.subcategory && newFilters.subcategory.length > 0) {
          params.set('subcategory', newFilters.subcategory.join(','));
        } else {
          params.delete('subcategory');
        }
      }
      
      setSearchParams(params);
      return newFilters;
    });
  }, [searchParams, setSearchParams]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
    setSearchParams({});
  }, [setSearchParams]);

  // Handle search
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  return {
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
  };
};
