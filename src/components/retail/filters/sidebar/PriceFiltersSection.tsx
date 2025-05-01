
import React from 'react';
import PriceRangeFilter from '../PriceRangeFilter';

interface PriceFiltersSectionProps {
  minPrice: number;
  maxPrice: number;
  currentRange?: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceFiltersSection = ({ 
  minPrice,
  maxPrice,
  currentRange,
  onChange
}: PriceFiltersSectionProps) => {
  return (
    <PriceRangeFilter 
      minPrice={minPrice}
      maxPrice={maxPrice}
      currentRange={currentRange}
      onChange={onChange}
    />
  );
};

export default PriceFiltersSection;
