
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/types';
import { categories } from '@/lib/categories';
import { Filters } from './filters/FilterTypes';

interface ActiveFiltersProps {
  filters: Filters;
  removeFilter: (filterType: keyof Filters, value?: any) => void;
  clearAllFilters: () => void;
  searchTerm?: string;
  onClearSearch?: () => void;
}

const ActiveFilters = ({ 
  filters, 
  removeFilter, 
  clearAllFilters,
  searchTerm,
  onClearSearch
}: ActiveFiltersProps) => {
  // Check if there are any filters applied
  const hasFilters = Object.keys(filters).length > 0 || searchTerm;
  
  // Helper to get category name from ID
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  if (!hasFilters) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-4 mt-2">
      {/* Search term badge */}
      {searchTerm && (
        <Badge variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Search:</span> 
          {searchTerm}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={onClearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {/* Category filter */}
      {filters.category && (
        <Badge variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Category:</span> 
          {getCategoryName(filters.category)}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('category')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {/* Subcategory filters */}
      {filters.subcategory?.map((subcategory: string) => (
        <Badge key={`subcategory-${subcategory}`} variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Subcategory:</span> 
          {subcategory}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('subcategory', subcategory)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {/* Brand filters */}
      {filters.brand?.map((brand: string) => (
        <Badge key={`brand-${brand}`} variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Brand:</span> 
          {brand}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('brand', brand)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {/* Condition filters */}
      {filters.condition?.map((condition: string) => (
        <Badge key={`condition-${condition}`} variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Condition:</span> 
          {condition}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('condition', condition)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {/* Price range filter */}
      {filters.priceRange && (
        <Badge variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Price:</span> 
          AED {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('priceRange')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {/* Location filters */}
      {filters.location?.map((location: string) => (
        <Badge key={`location-${location}`} variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Location:</span> 
          {location}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('location', location)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {/* Listing type filters */}
      {filters.listingType?.map((type: string) => (
        <Badge key={`listing-${type}`} variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Listing:</span> 
          {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('listingType', type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {/* Seller type filters */}
      {filters.sellerType?.map((type: string) => (
        <Badge key={`seller-${type}`} variant="secondary" className="px-3 py-1.5">
          <span className="mr-1 font-normal">Seller:</span> 
          {type.charAt(0).toUpperCase() + type.slice(1)}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-2 -mr-1"
            onClick={() => removeFilter('sellerType', type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {/* Clear all button */}
      {hasFilters && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAllFilters}
          className="ml-auto"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;
