
import React from 'react';
import { InspectionProvider } from './InspectionContext';
import { InspectionContent } from './InspectionContent';
import { InspectionSidebar } from './InspectionSidebar';

export const VehicleInspection = () => {
  return (
    <InspectionProvider>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Vehicle Inspection Report</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InspectionContent />
          <InspectionSidebar />
        </div>
      </div>
    </InspectionProvider>
  );
};
