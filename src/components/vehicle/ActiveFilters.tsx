
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { priceRanges, partCategories } from './PartsFilterSidebar';

interface ActiveFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedPriceRanges: string[];
  togglePriceRange: (id: string) => void;
  selectedConditions: string[];
  toggleCondition: (condition: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  clearFilters: () => void;
}

const ActiveFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRanges,
  togglePriceRange,
  selectedConditions,
  toggleCondition,
  selectedBrands,
  toggleBrand,
  clearFilters
}: ActiveFiltersProps) => {
  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedCategory || 
    selectedPriceRanges.length > 0 || selectedConditions.length > 0 || selectedBrands.length > 0;
  
  if (!hasActiveFilters) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {searchQuery && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setSearchQuery('')}
        >
          Search: {searchQuery}
          <X className="h-3 w-3" />
        </Button>
      )}
      
      {selectedCategory && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setSelectedCategory(null)}
        >
          Category: {partCategories.find(c => c.id === selectedCategory)?.name}
          <X className="h-3 w-3" />
        </Button>
      )}
      
      {selectedPriceRanges.map((id) => (
        <Button
          key={id}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => togglePriceRange(id)}
        >
          {priceRanges.find(range => range.id === id)?.label}
          <X className="h-3 w-3" />
        </Button>
      ))}
      
      {selectedConditions.map((condition) => (
        <Button
          key={condition}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => toggleCondition(condition)}
        >
          {condition}
          <X className="h-3 w-3" />
        </Button>
      ))}
      
      {selectedBrands.map((brand) => (
        <Button
          key={brand}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => toggleBrand(brand)}
        >
          {brand}
          <X className="h-3 w-3" />
        </Button>
      ))}
    </div>
  );
};

export default ActiveFilters;
