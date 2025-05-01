
import { Button } from "@/components/ui/button";
import { ShopFilter } from "@/types/shopTypes";

interface ShopFiltersProps {
  filter: ShopFilter;
  onFilterChange: (filter: ShopFilter) => void;
}

export const ShopFilters = ({ filter, onFilterChange }: ShopFiltersProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant={filter === 'all' ? 'default' : 'outline'}
        onClick={() => onFilterChange('all')}
      >
        All Shops
      </Button>
      <Button 
        size="sm" 
        variant={filter === 'verified' ? 'default' : 'outline'}
        onClick={() => onFilterChange('verified')}
      >
        Verified
      </Button>
      <Button 
        size="sm" 
        variant={filter === 'featured' ? 'default' : 'outline'}
        onClick={() => onFilterChange('featured')}
      >
        Featured
      </Button>
    </div>
  );
};
