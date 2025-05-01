
import React from 'react';
import { 
  Building,
  Home,
  DoorClosed,
  Car,
  Shield,
  Wifi,
  AirVent,
  Umbrella,
  Plug
} from "lucide-react";

// Fixed the issue with Pool icon by creating a custom component
export const PoolIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide h-4 w-4 mr-2"
  >
    <path d="M2 12.5h20" />
    <path d="M5.5 9a4 4 0 0 0 8 0 4 4 0 0 0-8 0Z" />
    <path d="M2 15.5h20" />
    <path d="M5.5 20a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
    <path d="M5.5 5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0" />
  </svg>
);

// Map amenities to their respective icons
export const getAmenityIcon = (amenity: string) => {
  const amenityMap: Record<string, React.ReactNode> = {
    'Pool': <PoolIcon />,
    'Gym': <Building className="h-4 w-4 mr-2" />,
    'Wifi': <Wifi className="h-4 w-4 mr-2" />,
    'Security': <Shield className="h-4 w-4 mr-2" />,
    'Maids Room': <DoorClosed className="h-4 w-4 mr-2" />,
    'Central A/C': <AirVent className="h-4 w-4 mr-2" />,
    'Balcony': <Home className="h-4 w-4 mr-2" />,
    'Covered Parking': <Car className="h-4 w-4 mr-2" />,
    'Built in Wardrobes': <DoorClosed className="h-4 w-4 mr-2" />,
    'View of Water': <Umbrella className="h-4 w-4 mr-2" />,
    'View of Landmark': <Building className="h-4 w-4 mr-2" />,
    'Private Pool': <PoolIcon />,
    'Concierge Service': <Shield className="h-4 w-4 mr-2" />,
    'Smart Home System': <Plug className="h-4 w-4 mr-2" />,
  };
  
  return amenityMap[amenity] || <Building className="h-4 w-4 mr-2" />;
};
