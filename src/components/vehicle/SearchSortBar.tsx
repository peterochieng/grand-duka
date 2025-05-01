
import { Search, X, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

interface SearchSortBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchSortBar = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filtersOpen,
  setFiltersOpen,
  handleSearch
}: SearchSortBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search parts & accessories..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 h-6 w-6" 
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
      
      <div className="flex gap-2">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          onClick={() => setFiltersOpen(!filtersOpen)} 
          className="flex items-center gap-2 md:hidden"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchSortBar;
