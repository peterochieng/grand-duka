
import React from 'react';
import BrandFilter from '../BrandFilter';

interface BrandFiltersSectionProps {
  brands: string[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
}

const BrandFiltersSection = ({ 
  brands,
  selectedValues,
  onChange
}: BrandFiltersSectionProps) => {
  if (brands.length === 0) return null;
  
  return (
    <BrandFilter
      brands={brands}
      selectedValues={selectedValues}
      onChange={onChange}
    />
  );
};

export default BrandFiltersSection;
