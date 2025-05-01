
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Bed, Bath, SquareIcon } from "lucide-react";
import { homeCategories } from "@/lib/products/mockGenerators/categories/homeCategories";

const PropertyDetailsCard = () => {
  // Get property types from the homeCategories
  const propertyTypes = homeCategories['Real Estate'].propertyTypes || [];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="propertyType" className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Property Type
            </Label>
            <Select defaultValue="apartment">
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedrooms" className="flex items-center">
              <Bed className="h-4 w-4 mr-2" />
              Bedrooms
            </Label>
            <Select defaultValue="2">
              <SelectTrigger>
                <SelectValue placeholder="Number of bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="5+">5+</SelectItem>
                <SelectItem value="5 + Maid">5 + Maid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms" className="flex items-center">
              <Bath className="h-4 w-4 mr-2" />
              Bathrooms
            </Label>
            <Select defaultValue="2">
              <SelectTrigger>
                <SelectValue placeholder="Number of bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6+">6+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="areaSqft" className="flex items-center">
              <SquareIcon className="h-4 w-4 mr-2" />
              Area (sq.ft)
            </Label>
            <Input type="number" id="areaSqft" placeholder="Property area in sq.ft" min="0" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="areaSqm" className="flex items-center">
              <SquareIcon className="h-4 w-4 mr-2" />
              Area (sq.m)
            </Label>
            <Input type="number" id="areaSqm" placeholder="Property area in sq.m" min="0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailsCard;
