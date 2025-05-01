
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import RetailFilterSection from './RetailFilterSection';
import { Gavel, ShoppingCart, MessageSquareQuote } from 'lucide-react';
import { ListingTypeFilterProps } from './FilterTypes';

const ListingTypeFilter = ({ 
  selectedValues, 
  onChange,
  listingTypes
}: ListingTypeFilterProps) => {
  const defaultListingTypes = [
    { id: 'auction', label: 'Auction', icon: Gavel },
    { id: 'buy-now', label: 'Buy Now', icon: ShoppingCart },
    { id: 'best-offer', label: 'Best Offer', icon: MessageSquareQuote }
  ];

  const displayListingTypes = listingTypes 
    ? defaultListingTypes.filter(type => listingTypes.includes(type.id as any))
    : defaultListingTypes;

  return (
    <RetailFilterSection title="Listing Type">
      <div className="space-y-2 pt-1">
        {displayListingTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`listing-${type.id}`}
              checked={selectedValues.includes(type.id)}
              onCheckedChange={(checked) => {
                onChange(type.id, !!checked);
              }}
            />
            <label 
              htmlFor={`listing-${type.id}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-1.5"
            >
              <type.icon className="h-3.5 w-3.5" />
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </RetailFilterSection>
  );
};

export default ListingTypeFilter;
