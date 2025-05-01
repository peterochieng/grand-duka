
import { FormEvent, useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface InventorySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: (e: FormEvent) => void;
}

const InventorySearch = ({ searchTerm, onSearchChange, onSearch }: InventorySearchProps) => {
  return (
    <div className="space-y-4">
      <form onSubmit={onSearch} className="flex w-full md:w-1/2 space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory items..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Badge variant="outline" className="rounded-sm">
            Category: All
          </Badge>
          <Badge variant="outline" className="rounded-sm">
            Status: All
          </Badge>
        </div>
        
        <Button variant="ghost" size="sm">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>
    </div>
  );
};

export default InventorySearch;
