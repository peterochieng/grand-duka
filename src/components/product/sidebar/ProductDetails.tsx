import { Card, CardContent } from '@/components/ui/card';
import { 
  Tag, 
  Building, 
  Bed, 
  Bath, 
  SquareIcon, 
  Home,
  Calendar,
  Users,
  MapPin,
  Info,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { getAmenityIcon } from '@/components/shop/listing/category-fields/real-estate/amenityIcons';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const isRealEstate = product.category === 'Real Estate';
  const propertyDetails = isRealEstate ? product.propertyDetails || product.businessDetails?.propertyDetails : null;
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-3">
          {!isRealEstate && (
            <Button variant="ghost" className="w-full mt-2" size="sm">
              Contact Seller
            </Button>
          )}
          
          {isRealEstate && (
            <Button variant="default" className="w-full" size="sm">
              Schedule Viewing
            </Button>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-start">
          <span className="font-medium w-24">Category:</span>
          <span className="flex items-center">
            <Tag className="h-3.5 w-3.5 mr-1.5 text-primary" />
            {product.category}
          </span>
        </div>
        
        {!isRealEstate && (
          <div className="flex items-start">
            <span className="font-medium w-24">Condition:</span>
            <span>{product.condition}</span>
          </div>
        )}
        
        <div className="flex items-start">
          <span className="font-medium w-24">Location:</span>
          <span>{product.location}</span>
        </div>
        
        <div className="flex items-start">
          <span className="font-medium w-24">Listed:</span>
          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
        </div>
        
        {isRealEstate && propertyDetails && (
          <>
            <Separator className="my-3" />
            <h3 className="font-medium mb-2 text-base flex items-center">
              <Building className="mr-1.5 h-4 w-4" />
              Property Details
            </h3>
            
            {propertyDetails.propertyType && (
              <div className="flex items-start">
                <span className="font-medium w-24">Type:</span>
                <span>{propertyDetails.propertyType}</span>
              </div>
            )}
            
            {propertyDetails.listingType && (
              <div className="flex items-start">
                <span className="font-medium w-24">Listing Type:</span>
                <span className="flex items-center capitalize">
                  {propertyDetails.listingType === 'sale' ? (
                    <Home className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  ) : (
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  )}
                  {propertyDetails.listingType}
                </span>
              </div>
            )}
            
            {propertyDetails.rentalTerm && (
              <div className="flex items-start">
                <span className="font-medium w-24">Rental Term:</span>
                <span className="capitalize">{propertyDetails.rentalTerm}</span>
              </div>
            )}
            
            {propertyDetails.lettingType && (
              <div className="flex items-start">
                <span className="font-medium w-24">Letting Type:</span>
                <span className="flex items-center capitalize">
                  {propertyDetails.lettingType === 'residential' ? (
                    <Users className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  ) : (
                    <Building className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  )}
                  {propertyDetails.lettingType}
                </span>
              </div>
            )}
            
            {propertyDetails.bedrooms && (
              <div className="flex items-start">
                <span className="font-medium w-24">Bedrooms:</span>
                <span className="flex items-center">
                  <Bed className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  {propertyDetails.bedrooms}
                </span>
              </div>
            )}
            
            {propertyDetails.bathrooms && (
              <div className="flex items-start">
                <span className="font-medium w-24">Bathrooms:</span>
                <span className="flex items-center">
                  <Bath className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  {propertyDetails.bathrooms}
                </span>
              </div>
            )}
            
            {propertyDetails.propertySize && (
              <div className="flex items-start">
                <span className="font-medium w-24">Size:</span>
                <span className="flex items-center">
                  <SquareIcon className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  {propertyDetails.propertySize.sqft 
                    ? `${propertyDetails.propertySize.sqft.toLocaleString()} sqft` 
                    : ''
                  }
                  {propertyDetails.propertySize.sqft && propertyDetails.propertySize.sqm 
                    ? ' / ' 
                    : ''
                  }
                  {propertyDetails.propertySize.sqm 
                    ? `${propertyDetails.propertySize.sqm.toLocaleString()} sqm` 
                    : ''
                  }
                </span>
              </div>
            )}
            
            {propertyDetails.amenities && propertyDetails.amenities.length > 0 && (
              <div className="flex flex-col mt-2">
                <span className="font-medium mb-2">Amenities:</span>
                <div className="flex flex-wrap gap-2">
                  {propertyDetails.amenities.map((amenity, index) => (
                    <span key={index} className="bg-secondary/20 text-xs rounded-full px-2 py-1 flex items-center gap-1">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
        <div className="space-y-3">
          <Button 
            variant="default"
            size="sm" 
            className="w-full flex items-center justify-center mt-2" 
            onClick={() => window.open('#report', '_blank')}
          >
            <Info className="h-4 w-4 mr-2" />
            Report listing
          </Button>
        </div>
      </div>
    </div>
  );
};
