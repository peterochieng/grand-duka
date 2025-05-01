
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

interface CommoditySearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: string | null;
  setFilterCategory: (category: string | null) => void;
  categories: string[];
}

const CommoditySearch = ({ 
  searchQuery, 
  setSearchQuery, 
  filterCategory, 
  setFilterCategory,
  categories
}: CommoditySearchProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
    // Additional search logic can be added here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search commodities..."
            className="pl-10"
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
        
        <Select 
          onValueChange={value => setFilterCategory(value === "all" ? null : value)} 
          value={filterCategory || "all"}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{filterCategory || "All Categories"}</span>
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button type="submit" className="w-full sm:w-auto">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        
        <Button variant="outline" type="button" className="w-full sm:w-auto">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </form>
  );
};

export default CommoditySearch;
