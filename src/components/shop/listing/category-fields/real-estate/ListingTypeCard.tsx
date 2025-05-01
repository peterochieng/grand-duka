
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Calendar, Building, Users } from "lucide-react";

interface ListingTypeCardProps {
  listingType: string;
  onListingTypeChange: (type: string) => void;
}

const ListingTypeCard: React.FC<ListingTypeCardProps> = ({
  listingType,
  onListingTypeChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Listing Type</h3>
        
        <div className="space-y-6">
          <RadioGroup 
            defaultValue={listingType} 
            onValueChange={onListingTypeChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="sale" />
              <Label htmlFor="sale" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                For Sale
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rent" id="rent" />
              <Label htmlFor="rent" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                For Rent
              </Label>
            </div>
          </RadioGroup>
          
          {listingType === 'rent' && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="rental-term">Rental Term</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="rental-term">
                    <SelectValue placeholder="Select rental term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily / Short Term</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="letting-type">Letting Type</Label>
                <Select defaultValue="residential">
                  <SelectTrigger id="letting-type">
                    <SelectValue placeholder="Select letting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Residential
                      </div>
                    </SelectItem>
                    <SelectItem value="commercial">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Commercial
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingTypeCard;
