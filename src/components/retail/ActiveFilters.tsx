import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/types';
import { Filters } from './filters/FilterTypes';

interface ActiveFiltersProps {
  filters: Filters;
  removeFilter: (filterType: keyof Filters, value?: any) => void;
  clearAllFilters: () => void;
  searchTerm: string;
  onClearSearch: () => void;
  categories: Category[];
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ 
  filters, 
  removeFilter, 
  clearAllFilters,
  searchTerm,
  onClearSearch,
  categories
}) => {
  // Check if any filters are applied
  const hasFilters = Object.keys(filters).length > 0 || searchTerm;
  
  // Helper: Look up category name using the real categories data
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
      
      {/* Category filter badge */}
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
      
      {/* Other filter badges (subcategories, brands, conditions, etc.) would follow similarly */}
      
      <Button variant="outline" className="ml-2" onClick={clearAllFilters}>
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;