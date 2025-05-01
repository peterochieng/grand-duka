
import React from 'react';
import { useInspection } from './InspectionContext';
import { InspectionSummary } from './InspectionSummary';
import { InspectionChatbot } from './InspectionChatbot';
import { CircleCheck, CircleAlert, AlertCircle } from 'lucide-react';
import { InspectionStatus } from './types';

export const InspectionSidebar = () => {
  const { inspectionData, calculateOverallScore } = useInspection();
  
  // Get identification details (works for any listing type)
  const identificationSection = inspectionData.find(
    section => section.name === 'Identification'
  ) || inspectionData.find(
    section => section.name === 'Vehicle Identification'
  );
  
  // Get name or ID of the inspected item
  const itemDetails = identificationSection?.items.find(
    item => item.name.includes('ID') || item.name.includes('Name') || item.name.includes('Verification')
  );
  
  // Helper function to get appropriate icon for inspection status
  const getSectionIcon = (status: InspectionStatus) => {
    switch (status) {
      case 'GOOD':
        return <CircleCheck className="text-green-500" />;
      case 'FAIR':
        return <CircleCheck className="text-yellow-500" />;
      case 'POOR':
        return <CircleAlert className="text-orange-500" />;
      case 'FAILED':
        return <AlertCircle className="text-red-500" />;
      default:
        return <CircleCheck className="text-gray-400" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <InspectionSummary 
        overallScore={calculateOverallScore()} 
        inspectionData={inspectionData}
        getSectionIcon={getSectionIcon}
      />
      
      <InspectionChatbot 
        itemId={itemDetails?.notes || "demo-item"}
        itemName={itemDetails?.name || "Inspected Item"}
        itemType="vehicle"
        inspectionId="current-inspection" 
      />
    </div>
  );
};
