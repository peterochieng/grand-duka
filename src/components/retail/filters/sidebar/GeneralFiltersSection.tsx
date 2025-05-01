
import React from 'react';
import CheckboxFilter from '../CheckboxFilter';
import ListingTypeFilter from '../ListingTypeFilter';
import SellerTypeFilter from '../SellerTypeFilter';

interface GeneralFiltersSectionProps {
  conditions: string[];
  locations: string[];
  selectedConditions: string[];
  selectedLocations: string[];
  selectedListingTypes: string[];
  selectedSellerTypes: string[];
  onConditionChange: (value: string, checked: boolean) => void;
  onLocationChange: (value: string, checked: boolean) => void;
  onListingTypeChange: (value: string, checked: boolean) => void;
  onSellerTypeChange: (value: string, checked: boolean) => void;
}

const GeneralFiltersSection = ({ 
  conditions,
  locations,
  selectedConditions,
  selectedLocations,
  selectedListingTypes,
  selectedSellerTypes,
  onConditionChange,
  onLocationChange,
  onListingTypeChange,
  onSellerTypeChange
}: GeneralFiltersSectionProps) => {
  return (
    <>
      <ListingTypeFilter
        selectedValues={selectedListingTypes}
        onChange={onListingTypeChange}
      />
      
      <CheckboxFilter
        title="Condition"
        options={conditions}
        selectedValues={selectedConditions}
        onChange={onConditionChange}
      />
      
      <CheckboxFilter
        title="Location"
        options={locations}
        selectedValues={selectedLocations}
        onChange={onLocationChange}
        maxHeight="48"
      />
      
      <SellerTypeFilter
        selectedValues={selectedSellerTypes}
        onChange={onSellerTypeChange}
      />
    </>
  );
};

export default GeneralFiltersSection;
