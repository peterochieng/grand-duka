
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SearchBar } from '@/components/SearchBar';

interface RetailHeaderProps {
  searchTerm: string;
  handleSearch: (term: string) => void;
}

const RetailHeader = ({ searchTerm, handleSearch }: RetailHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">
        Retail Marketplace
      </h1>
      <p className="text-muted-foreground max-w-3xl">
        Find products from thousands of verified sellers. Browse by category, search for specific items, or filter by price, 
        condition, and more.
      </p>
      
      {/* Search Bar */}
      <Card className="mt-6 bg-muted/40 border-muted">
        <CardContent className="p-4">
          <SearchBar 
            className="max-w-full" 
            placeholder="Search for products, brands, or categories..." 
            onSearch={handleSearch}
            initialValue={searchTerm}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RetailHeader;
