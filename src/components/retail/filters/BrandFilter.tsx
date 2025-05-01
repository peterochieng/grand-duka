
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import RetailFilterSection from './RetailFilterSection';
import { CommonFilterProps } from './FilterTypes';

interface BrandFilterProps extends CommonFilterProps {
  brands: string[];
}

const BrandFilter = ({ 
  brands,
  selectedValues, 
  onChange 
}: BrandFilterProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredBrands = React.useMemo(() => {
    if (!searchTerm) return brands;
    return brands.filter(brand => 
      brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);
  
  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <RetailFilterSection title="Brands">
      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        
        <ScrollArea className="h-[200px]">
          <div className="space-y-2 pr-3">
            {filteredBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox 
                  id={`brand-${brand}`}
                  checked={selectedValues.includes(brand)}
                  onCheckedChange={(checked) => {
                    onChange(brand, !!checked);
                  }}
                />
                <label 
                  htmlFor={`brand-${brand}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {brand}
                </label>
              </div>
            ))}
            
            {filteredBrands.length === 0 && (
              <p className="text-sm text-muted-foreground py-2">No brands found</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </RetailFilterSection>
  );
};

export default BrandFilter;
