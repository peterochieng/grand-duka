
import React from 'react';
import { useFormContext } from 'react-hook-form';
import BusinessSaleFields from './business-industrial/BusinessSaleFields';
import BusinessServicesFields from './business-industrial/BusinessServicesFields';
import HardwareToolsFields from './business-industrial/HardwareToolsFields';

const BusinessIndustrialFields = () => {
  const { watch } = useFormContext();
  const subcategory = watch('subcategory');

  return (
    <div className="space-y-6">
      {subcategory === 'Businesses for Sale' && <BusinessSaleFields />}
      {subcategory === 'Business Services' && <BusinessServicesFields />}
      {subcategory === 'Hardware Tools' && <HardwareToolsFields />}
    </div>
  );
};

export default BusinessIndustrialFields;
