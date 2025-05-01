
import { Building, Bed, Bath } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/lib/types';
import { PropertyAmenitiesSection } from './PropertyAmenitiesSection';

interface PropertyDetailsSectionProps {
  propertyDetails: any;
}

export const PropertyDetailsSection = ({ propertyDetails }: PropertyDetailsSectionProps) => {
  if (!propertyDetails) return null;
  
  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Property Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {propertyDetails.propertyType && (
            <div className="flex items-center">
              <Building className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Property Type</p>
                <p className="font-medium">{propertyDetails.propertyType}</p>
              </div>
            </div>
          )}
          
          {propertyDetails.propertySize && (
            <div className="flex items-center">
              <div className="h-5 w-5 text-muted-foreground mr-3 flex items-center justify-center">
                <span className="text-xs font-bold">m²</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property Size</p>
                <p className="font-medium">
                  {propertyDetails.propertySize.sqft && `${propertyDetails.propertySize.sqft.toLocaleString()} sqft`}
                  {propertyDetails.propertySize.sqft && propertyDetails.propertySize.sqm && ' / '}
                  {propertyDetails.propertySize.sqm && `${propertyDetails.propertySize.sqm.toLocaleString()} sqm`}
                </p>
              </div>
            </div>
          )}
          
          {propertyDetails.bedrooms && (
            <div className="flex items-center">
              <Bed className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
                <p className="font-medium">{propertyDetails.bedrooms}</p>
              </div>
            </div>
          )}
          
          {propertyDetails.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
                <p className="font-medium">{propertyDetails.bathrooms}</p>
              </div>
            </div>
          )}
        </div>
        
        {propertyDetails.amenities && propertyDetails.amenities.length > 0 && (
          <PropertyAmenitiesSection amenities={propertyDetails.amenities} />
        )}
      </CardContent>
    </Card>
  );
};
