
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Car, DoorClosed, Calendar } from "lucide-react";

const AdditionalInfoCard = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="yearBuilt" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Year Built
            </Label>
            <Input type="number" id="yearBuilt" placeholder="Year of construction" min="1900" max={new Date().getFullYear()} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parkingSpaces" className="flex items-center">
              <Car className="h-4 w-4 mr-2" />
              Parking Spaces
            </Label>
            <Input type="number" id="parkingSpaces" placeholder="Number of parking spaces" min="0" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="furnished" className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Furnishing Status
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select furnishing status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="furnished">Fully Furnished</SelectItem>
                <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                <SelectItem value="unfurnished">Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="occupancyStatus" className="flex items-center">
              <DoorClosed className="h-4 w-4 mr-2" />
              Occupancy Status
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select occupancy status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoCard;
