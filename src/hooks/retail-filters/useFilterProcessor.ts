
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { Filters } from '@/components/retail/filters/FilterTypes';
import { SortOption } from './types';

export const useFilterProcessor = (
  allProducts: Product[],
  filters: Filters,
  searchTerm: string,
  sortOption: SortOption
) => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters and sorting
  const filterAndSortProducts = () => {
    setIsLoading(true);
    
    // Create a copy of all products for filtering
    let filteredProducts = [...allProducts];
    
    // Apply search term filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === filters.category
      );
    }
    
    // Apply subcategory filter
    if (filters.subcategory && filters.subcategory.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.subcategory && filters.subcategory?.includes(product.subcategory)
      );
    }
    
    // Apply specialized filters
    if (filters.specializedFilters && Object.keys(filters.specializedFilters).length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        // For each section in specializedFilters
        for (const [section, values] of Object.entries(filters.specializedFilters || {})) {
          // If this section has selected values and the product doesn't match any
          if (values && values.length > 0) {
            // Check if product has this section tag
            const hasMatchingTag = values.some(value => 
              product.tags.includes(`${section}:${value}`) || 
              product.tags.includes(value)
            );
            
            if (!hasMatchingTag) return false;
          }
        }
        return true;
      });
    }
    
    // Apply brand filter
    if (filters.brand && filters.brand.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand && filters.brand?.includes(product.brand)
      );
    }
    
    // Apply condition filter
    if (filters.condition && filters.condition.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.condition?.includes(product.condition)
      );
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(product => 
        product.price >= min && product.price <= max
      );
    }
    
    // Apply location filter
    if (filters.location && filters.location.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.location?.includes(product.location)
      );
    }
    
    // Apply listing type filter
    if (filters.listingType && filters.listingType.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        if (product.listingTypes) {
          // Modern structure
          if (filters.listingType?.includes('auction') && product.listingTypes.auction?.enabled) {
            return true;
          }
          if (filters.listingType?.includes('buy-now') && product.listingTypes.buyItNow?.enabled) {
            return true;
          }
          if (filters.listingType?.includes('best-offer') && product.listingTypes.bestOffer?.enabled) {
            return true;
          }
          return false;
        } else {
          // Legacy structure
          return filters.listingType?.includes(product.listingType || '');
        }
      });
    }
    
    // Apply seller type filter
    if (filters.sellerType && filters.sellerType.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.sellerType?.includes(product.seller.type || 'individual')
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        filteredProducts = filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        filteredProducts = filteredProducts.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'price-asc':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'relevance':
      default:
        // Relevance is default, no additional sorting needed
        break;
    }
    
    setDisplayProducts(filteredProducts);
    setIsLoading(false);
  };

  // Effect to apply filters when they change
  useEffect(() => {
    filterAndSortProducts();
  }, [filters, searchTerm, sortOption, allProducts]);

  return { displayProducts, isLoading };
};
