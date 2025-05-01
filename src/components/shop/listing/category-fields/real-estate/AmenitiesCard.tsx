
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { homeCategories } from "@/lib/products/mockGenerators/categories/homeCategories";
import { getAmenityIcon } from "./amenityIcons";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const AmenitiesCard = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const form = useForm();

  // Get amenities from the homeCategories
  const amenities = homeCategories['Real Estate'].amenities || [];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Property Amenities</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select all amenities that apply to this property
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox 
                id={`amenity-${amenity.toLowerCase().replace(/\s+/g, '-')}`} 
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked === true)}
              />
              <Label 
                htmlFor={`amenity-${amenity.toLowerCase().replace(/\s+/g, '-')}`}
                className="cursor-pointer flex items-center"
              >
                {getAmenityIcon(amenity)}
                {amenity}
              </Label>
            </div>
          ))}
        </div>
        
        {selectedAmenities.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Selected Amenities:</p>
            <div className="flex flex-wrap gap-1">
              {selectedAmenities.map((amenity) => (
                <span 
                  key={amenity} 
                  className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AmenitiesCard;
