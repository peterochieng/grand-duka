
import { useState } from 'react';
import { Wrench, Car, Sparkles, Gauge, Shirt, Cpu, Bike, Truck, Droplets } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Define part categories
export const partCategories = [
  { id: 'vehicle-parts', name: 'Vehicle parts & accessories', icon: Car },
  { id: 'car-care', name: 'Car care & cleaning', icon: Sparkles },
  { id: 'car-parts', name: 'Car parts & accessories', icon: Car },
  { id: 'car-tuning', name: 'Car tuning & styling', icon: Gauge },
  { id: 'car-tyres', name: 'Car tyres', icon: Car },
  { id: 'recycled-parts', name: 'Certified Recycled parts & accessories', icon: Wrench },
  { id: 'clothing', name: 'Clothing, protection & merchandise', icon: Shirt },
  { id: 'garage-equipment', name: 'Garage equipment & tools', icon: Wrench },
  { id: 'in-car-tech', name: 'In-car technology & security', icon: Cpu },
  { id: 'motorcycle-parts', name: 'Motorcycle & parts & accessories', icon: Bike },
  { id: 'motorhome-parts', name: 'Motorhome parts & accessories', icon: Truck },
  { id: 'fluids', name: 'Oils, fluids & lubricants', icon: Droplets }
];

// Price ranges
export const priceRanges = [
  { id: 'under-100', label: 'Under AED 100', min: 0, max: 100 },
  { id: '100-500', label: 'AED 100 - 500', min: 100, max: 500 },
  { id: '500-1000', label: 'AED 500 - 1,000', min: 500, max: 1000 },
  { id: '1000-5000', label: 'AED 1,000 - 5,000', min: 1000, max: 5000 },
  { id: 'over-5000', label: 'Over AED 5,000', min: 5000, max: Number.MAX_SAFE_INTEGER },
];

// Filter options
export const conditionOptions = ['New', 'Used', 'Like New', 'Refurbished'];
export const brandOptions = ['BMW', 'Mercedes', 'Toyota', 'Ford', 'Honda', 'Yamaha', 'JL Audio', 'Ducati', 'Bayliner'];

interface PartsFilterSidebarProps {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
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

const PartsFilterSidebar = ({
  filtersOpen,
  setFiltersOpen,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRanges,
  togglePriceRange,
  selectedConditions,
  toggleCondition,
  selectedBrands,
  toggleBrand,
  clearFilters
}: PartsFilterSidebarProps) => {
  return (
    <Collapsible 
      open={filtersOpen} 
      onOpenChange={setFiltersOpen}
      className="md:block md:col-span-1"
    >
      <CollapsibleTrigger asChild className="md:hidden w-full">
        <Button variant="outline" className="flex items-center justify-between w-full">
          <span>Filters</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 7h18M6 12h12M10 17h4"></path></svg>
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="md:block space-y-6 mt-4 md:mt-0">
        <div className="hidden md:flex justify-between items-center mb-4">
          <h2 className="font-semibold">Filters</h2>
          {(selectedCategory || selectedPriceRanges.length > 0 || 
            selectedConditions.length > 0 || selectedBrands.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
        </div>
        
        {/* Shop by category */}
        <div>
          <h3 className="font-semibold mb-3">Shop by category</h3>
          <div className="space-y-2">
            {partCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`flex items-center text-left w-full hover:text-primary py-1 ${
                  selectedCategory === category.id ? 'font-medium text-primary' : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Price range */}
        <div>
          <h3 className="font-semibold mb-3">Price</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`price-${range.id}`} 
                  checked={selectedPriceRanges.includes(range.id)}
                  onCheckedChange={() => togglePriceRange(range.id)}
                />
                <Label htmlFor={`price-${range.id}`}>{range.label}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Condition */}
        <div>
          <h3 className="font-semibold mb-3">Condition</h3>
          <div className="space-y-2">
            {conditionOptions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox 
                  id={`condition-${condition}`} 
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => toggleCondition(condition)}
                />
                <Label htmlFor={`condition-${condition}`}>{condition}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Brand */}
        <div>
          <h3 className="font-semibold mb-3">Brand</h3>
          <div className="space-y-2">
            {brandOptions.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox 
                  id={`brand-${brand}`} 
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <Label htmlFor={`brand-${brand}`}>{brand}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile only: Apply filters button */}
        <div className="md:hidden flex justify-end mt-4">
          <Button onClick={() => setFiltersOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PartsFilterSidebar;
