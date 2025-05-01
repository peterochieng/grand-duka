
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Grid2X2, LayoutList } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'relevance';

interface RetailSortBarProps {
  totalItems: number;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  viewMode?: 'grid' | 'list';
  setViewMode?: (mode: 'grid' | 'list') => void;
}

const RetailSortBar = ({
  totalItems,
  sortOption,
  setSortOption,
  viewMode = 'grid',
  setViewMode
}: RetailSortBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-muted/40 border rounded-md p-3 mb-4">
      <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
        <span className="font-medium">{totalItems}</span> products found
      </div>
      
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="flex-grow sm:flex-grow-0">
          <Select 
            value={sortOption} 
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="sm:min-w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Options</SelectLabel>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {setViewMode && (
          <div className="flex items-center space-x-1">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailSortBar;
