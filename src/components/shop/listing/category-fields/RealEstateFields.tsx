
import React, { useState } from 'react';
import PropertyDetailsCard from './real-estate/PropertyDetailsCard';
import AmenitiesCard from './real-estate/AmenitiesCard';
import ProximityCard from './real-estate/ProximityCard';
import AdditionalInfoCard from './real-estate/AdditionalInfoCard';
import ListingTypeCard from './real-estate/ListingTypeCard';

const RealEstateFields = () => {
  const [listingType, setListingType] = useState('sale');
  
  return (
    <div className="space-y-6">
      <ListingTypeCard 
        listingType={listingType}
        onListingTypeChange={setListingType}
      />
      <PropertyDetailsCard />
      <AmenitiesCard />
      <ProximityCard />
      <AdditionalInfoCard />
    </div>
  );
};

export default RealEstateFields;
