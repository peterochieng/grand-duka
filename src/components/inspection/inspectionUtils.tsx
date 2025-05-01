import { Check, X, Home, Car, GaugeCircle, Wrench, FileText, ClipboardList, ImageIcon, Settings, FileCheck } from 'lucide-react';
import { InspectionStatus } from './types';

// Generate score color based on value
export const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600 dark:text-green-500';
  if (score >= 70) return 'text-amber-600 dark:text-amber-500';
  return 'text-red-600 dark:text-red-500';
};

// Generate progress bar color based on value
export const getProgressColor = (score: number) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 70) return 'bg-amber-500';
  return 'bg-red-500';
};

// Generate gradient progress background style for visual appeal
export const getProgressBarStyles = (score: number) => {
  if (score >= 90) return 'from-blue-200 to-green-500';
  if (score >= 70) return 'from-blue-200 to-amber-500';
  return 'from-blue-200 to-red-500';
};

// Map section to icon
export const getSectionIcon = (sectionName: string) => {
  switch (sectionName) {
    case 'Vehicle Identification':
      return <FileCheck className="h-5 w-5" />;
    case 'Overview':
      return <FileText className="h-5 w-5" />;
    case 'Interior':
      return <Home className="h-5 w-5" />;
    case 'Exterior':
      return <Car className="h-5 w-5" />;
    case 'Tires':
      return <GaugeCircle className="h-5 w-5" />;
    case 'Underbody':
      return <Settings className="h-5 w-5" />; 
    case 'Underhood':
      return <Wrench className="h-5 w-5" />;
    case 'Road Test':
      return <Car className="h-5 w-5" />;
    case 'Additional Notes':
      return <ClipboardList className="h-5 w-5" />;
    case 'Pictures':
      return <ImageIcon className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

// Keep the old functions for backwards compatibility
export const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'Interior':
      return <Home className="h-5 w-5" />;
    case 'Exterior':
      return <Car className="h-5 w-5" />;
    case 'Engine & Mechanical':
      return <Wrench className="h-5 w-5" />;
    case 'Suspension & Brakes':
      return <Settings className="h-5 w-5" />; // Changed from Tool to Settings
    case 'Electrical':
      return <GaugeCircle className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

// Generate badge for status
export const getStatusBadge = (status: InspectionStatus) => {
  switch (status) {
    case 'GOOD':
      return (
        <div className="bg-green-500 text-white font-medium px-4 py-1 rounded-full flex items-center justify-center w-24">
          GOOD
        </div>
      );
    case 'FAIR':
      return (
        <div className="bg-amber-500 text-white font-medium px-4 py-1 rounded-full flex items-center justify-center w-24">
          FAIR
        </div>
      );
    case 'POOR':
      return (
        <div className="bg-orange-500 text-white font-medium px-4 py-1 rounded-full flex items-center justify-center w-24">
          POOR
        </div>
      );
    case 'FAILED':
      return (
        <div className="bg-red-500 text-white font-medium px-4 py-1 rounded-full flex items-center justify-center w-24">
          FAILED
        </div>
      );
  }
};

// Get background color for inspection status
export const getStatusColor = (status: InspectionStatus) => {
  switch (status) {
    case 'GOOD':
      return 'bg-blue-600';
    case 'FAIR':
      return 'bg-amber-500';
    case 'POOR':
      return 'bg-orange-500';
    case 'FAILED':
      return 'bg-red-600';
    default:
      return 'bg-gray-400';
  }
};
