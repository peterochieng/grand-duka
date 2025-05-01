
import { Separator } from '@/components/ui/separator';
import { getAmenityIcon } from '@/components/shop/listing/category-fields/real-estate/amenityIcons';

interface PropertyAmenitiesSectionProps {
  amenities: string[];
}

export const PropertyAmenitiesSection = ({ amenities }: PropertyAmenitiesSectionProps) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <>
      <Separator className="my-6" />
      <h3 className="font-semibold mb-4">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {amenities.map((amenity: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            {getAmenityIcon(amenity)}
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </>
  );
};
