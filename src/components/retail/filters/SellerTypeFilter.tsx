
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import RetailFilterSection from './RetailFilterSection';

interface SellerTypeFilterProps {
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
}

const SellerTypeFilter = ({ 
  selectedValues, 
  onChange 
}: SellerTypeFilterProps) => {
  const sellerTypes = [
    { id: 'verified', label: 'Verified Sellers' },
    { id: 'top-rated', label: 'Top Rated' }
  ];

  return (
    <RetailFilterSection title="Seller Type">
      <div className="space-y-2 pt-1">
        {sellerTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`seller-${type.id}`}
              checked={selectedValues.includes(type.id)}
              onCheckedChange={(checked) => {
                onChange(type.id, !!checked);
              }}
            />
            <label 
              htmlFor={`seller-${type.id}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </RetailFilterSection>
  );
};

export default SellerTypeFilter;
