
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import RetailFilterSection from './RetailFilterSection';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentRange?: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceRangeFilter = ({ 
  minPrice, 
  maxPrice, 
  currentRange,
  onChange 
}: PriceRangeFilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(
    currentRange || [minPrice, maxPrice]
  );
  
  // Update local state when props change
  useEffect(() => {
    if (currentRange) {
      setPriceRange(currentRange);
    }
  }, [currentRange]);

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setPriceRange(newRange);
  };
  
  // Apply price range when slider stops
  const applyPriceRange = () => {
    onChange(priceRange);
  };

  return (
    <RetailFilterSection title="Price Range" defaultOpen={true}>
      <div className="space-y-4 pt-2 px-1">
        <div className="flex justify-between">
          <span className="text-sm">AED {priceRange[0].toLocaleString()}</span>
          <span className="text-sm">AED {priceRange[1].toLocaleString()}</span>
        </div>
        <Slider 
          min={minPrice}
          max={maxPrice}
          step={100}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          onValueCommit={applyPriceRange}
        />
      </div>
    </RetailFilterSection>
  );
};

export default PriceRangeFilter;
