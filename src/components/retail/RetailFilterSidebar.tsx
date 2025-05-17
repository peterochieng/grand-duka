
import React, { useMemo } from 'react';
import { useMediaQuery } from "@/hooks/use-media-query";
import { Category, Product } from '@/lib/types';
import { Filters } from './filters/FilterTypes';
import MobileFilterWrapper from './filters/sidebar/MobileFilterWrapper';
import DesktopFilterWrapper from './filters/sidebar/DesktopFilterWrapper';
import CategoryFiltersSection from './filters/sidebar/CategoryFiltersSection';
import SubcategoryFiltersSection from './filters/sidebar/SubcategoryFiltersSection';
import SpecializedFiltersSection from './filters/sidebar/SpecializedFiltersSection';
import PriceFiltersSection from './filters/sidebar/PriceFiltersSection';
import BrandFiltersSection from './filters/sidebar/BrandFiltersSection';
import GeneralFiltersSection from './filters/sidebar/GeneralFiltersSection';

interface RetailFilterSidebarProps {
  filters: Filters;
  updateFilters: (filters: Partial<Filters>) => void;
  categories: Category[];
  products: Product[];
}

const RetailFilterSidebar = ({ 
  filters, 
  updateFilters,
  categories,
  products
}: RetailFilterSidebarProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  console.log(products);
  
  // Get all unique properties from products
  const conditions = Array.from(new Set(products?.map(p => p.condition)));
  const locations = Array.from(new Set(products?.map(p => p.location)));
  const brands = Array.from(new Set(products?.map(p => p.brand || ''))).filter(Boolean);
  
  // Get subcategories for selected category
  const subcategories = useMemo(() => {
    if (!filters.category) return [];
    
    // First check if the selected category has predefined subcategories
    const selectedCategory = categories.find(c => c.id === filters.category);
    if (selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0) {
      return selectedCategory.subcategories;
    }
    
    // If not, extract them from products
    return Array.from(
      new Set(
        products
          .filter(p => p.category === selectedCategory?.name)
          .map(p => p.subcategory || '')
      )
    ).filter(Boolean);
  }, [filters.category, categories, products]);
  
  // Get selected category object
  const selectedCategory = useMemo(() => {
    return categories.find(c => c.id === filters.category);
  }, [filters.category, categories]);
  
  // Extract min and max price
  const prices = products.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Handle checkbox changes for array-based filters
  const handleCheckboxChange = (filterType: keyof Filters, value: string, checked: boolean) => {
    const currentValues = filters[filterType] as string[] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v: string) => v !== value);
    }
    
    updateFilters({ [filterType]: newValues.length > 0 ? newValues : undefined });
  };
  
  // Handle specialized subcategory filter changes
  const handleSpecializedFilterChange = (section: string, value: string, checked: boolean) => {
    const currentFilters = filters.specializedFilters || {};
    const currentSectionValues = currentFilters[section] || [];
    
    let updatedSectionValues;
    if (checked) {
      updatedSectionValues = [...currentSectionValues, value];
    } else {
      updatedSectionValues = currentSectionValues.filter(v => v !== value);
    }
    
    const updatedFilters = {
      ...currentFilters,
      [section]: updatedSectionValues
    };
    
    // Remove section if empty
    if (updatedSectionValues.length === 0) {
      delete updatedFilters[section];
    }
    
    updateFilters({ 
      specializedFilters: Object.keys(updatedFilters).length > 0 ? updatedFilters : undefined 
    });
  };
  
  // Select a category
  const handleCategoryChange = (categoryId: string) => {
    // When changing category, reset subcategory and specialized filters
    updateFilters({ 
      category: categoryId ? categoryId : undefined,
      subcategory: undefined,
      specializedFilters: undefined
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    updateFilters({});
  };

  const filterContent = (
    <>
      <CategoryFiltersSection 
        categories={categories} 
        selectedCategory={filters.category}
        onChange={handleCategoryChange}
      />
      
      <SubcategoryFiltersSection
        subcategories={subcategories}
        selectedValues={filters.subcategory || []}
        onChange={(value, checked) => handleCheckboxChange('subcategory', value, checked)}
        parentCategory={filters.category}
      />
      
      <SpecializedFiltersSection
        selectedCategory={selectedCategory}
        specializedFilters={(filters.specializedFilters || {}) as Record<string, string[]>}
        onSpecializedFilterChange={handleSpecializedFilterChange}
      />
      
      <PriceFiltersSection 
        minPrice={minPrice}
        maxPrice={maxPrice}
        currentRange={filters.priceRange}
        onChange={(range) => updateFilters({ priceRange: range })}
      />
      
      <BrandFiltersSection
        brands={brands}
        selectedValues={filters.brand || []}
        onChange={(value, checked) => handleCheckboxChange('brand', value, checked)}
      />
      
      <GeneralFiltersSection
        conditions={conditions}
        locations={locations}
        selectedConditions={filters.condition || []}
        selectedLocations={filters.location || []}
        selectedListingTypes={filters.listingType || []}
        selectedSellerTypes={filters.sellerType || []}
        onConditionChange={(value, checked) => handleCheckboxChange('condition', value, checked)}
        onLocationChange={(value, checked) => handleCheckboxChange('location', value, checked)}
        onListingTypeChange={(value, checked) => handleCheckboxChange('listingType', value, checked)}
        onSellerTypeChange={(value, checked) => handleCheckboxChange('sellerType', value, checked)}
      />
    </>
  );

  // For mobile, show as a sheet. For desktop, show as a sidebar.
  return isMobile ? (
    <MobileFilterWrapper onClearAll={clearAllFilters}>
      {filterContent}
    </MobileFilterWrapper>
  ) : (
    <DesktopFilterWrapper onClearAll={clearAllFilters}>
      {filterContent}
    </DesktopFilterWrapper>
  );
};

export default RetailFilterSidebar;
