
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { partCategories, priceRanges, brandOptions } from '@/components/vehicle/PartsFilterSidebar';

const useVehiclePartsFilter = (allProducts: Product[]) => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Apply filters
  const filteredProducts = allProducts.filter(product => {
    // Search query filter
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory) {
      const category = partCategories.find(c => c.id === selectedCategory);
      if (category && !product.title.toLowerCase().includes(category.name.toLowerCase()) && 
          !product.description.toLowerCase().includes(category.name.toLowerCase()) &&
          !product.tags.some(tag => category.name.toLowerCase().includes(tag))) {
        return false;
      }
    }
    
    // Price range filter
    if (selectedPriceRanges.length > 0) {
      const ranges = selectedPriceRanges.map(id => priceRanges.find(range => range.id === id));
      if (!ranges.some(range => range && product.price >= range.min && product.price <= range.max)) {
        return false;
      }
    }
    
    // Condition filter
    if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
      return false;
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      const productBrands = brandOptions.filter(brand => 
        product.title.toLowerCase().includes(brand.toLowerCase()) || 
        product.description.toLowerCase().includes(brand.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(brand.toLowerCase()))
      );
      
      if (!productBrands.some(brand => selectedBrands.includes(brand))) {
        return false;
      }
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0; // Recommended (no specific sort)
    }
  });
  
  // Toggle price range
  const togglePriceRange = (id: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  // Toggle condition
  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) ? prev.filter(item => item !== condition) : [...prev, condition]
    );
  };
  
  // Toggle brand
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(item => item !== brand) : [...prev, brand]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedPriceRanges([]);
    setSelectedConditions([]);
    setSelectedBrands([]);
    setSortBy('recommended');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRanges,
    selectedConditions,
    selectedBrands,
    sortBy,
    setSortBy,
    filtersOpen,
    setFiltersOpen,
    sortedProducts,
    togglePriceRange,
    toggleCondition,
    toggleBrand,
    clearFilters
  };
};

export default useVehiclePartsFilter;
