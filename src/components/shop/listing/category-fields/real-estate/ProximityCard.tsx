
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Umbrella, MapPin, Waves, Landmark, PlaneTakeoff, Building } from "lucide-react";

const ProximityCard = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Proximity & Views</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="viewType" className="flex items-center">
              <Umbrella className="h-4 w-4 mr-2" />
              View Type
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select view type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sea">
                  <span className="flex items-center">
                    <Waves className="h-4 w-4 mr-2" />
                    Sea View
                  </span>
                </SelectItem>
                <SelectItem value="city">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    City View
                  </span>
                </SelectItem>
                <SelectItem value="garden">Garden View</SelectItem>
                <SelectItem value="landmark">
                  <span className="flex items-center">
                    <Landmark className="h-4 w-4 mr-2" />
                    Landmark View
                  </span>
                </SelectItem>
                <SelectItem value="none">No View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nearbyLandmarks" className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Nearby Landmarks
            </Label>
            <Input type="text" id="nearbyLandmarks" placeholder="Burj Khalifa, Dubai Mall, etc." />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="distanceToBeach" className="flex items-center">
              <Waves className="h-4 w-4 mr-2" />
              Distance to Beach (km)
            </Label>
            <Input type="number" id="distanceToBeach" placeholder="Distance in kilometers" min="0" step="0.1" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="distanceToAirport" className="flex items-center">
              <PlaneTakeoff className="h-4 w-4 mr-2" />
              Distance to Airport (km)
            </Label>
            <Input type="number" id="distanceToAirport" placeholder="Distance in kilometers" min="0" step="0.1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProximityCard;
