
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const HomeGardenFields = () => {
  const [locationType, setLocationType] = React.useState<string>('');
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="locationType">Location Type</Label>
        <Select value={locationType} onValueChange={setLocationType}>
          <SelectTrigger id="locationType">
            <SelectValue placeholder="Select location type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="indoor">Indoor</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {locationType === 'indoor' && (
        <div>
          <Label htmlFor="indoorCategory">Indoor Category</Label>
          <Select>
            <SelectTrigger id="indoorCategory">
              <SelectValue placeholder="Select indoor category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="decor">Decor</SelectItem>
              <SelectItem value="kitchen">Kitchen</SelectItem>
              <SelectItem value="bathroom">Bathroom</SelectItem>
              <SelectItem value="bedroom">Bedroom</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
              <SelectItem value="appliances">Appliances</SelectItem>
              <SelectItem value="storage">Storage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {locationType === 'outdoor' && (
        <div>
          <Label htmlFor="outdoorCategory">Outdoor Category</Label>
          <Select>
            <SelectTrigger id="outdoorCategory">
              <SelectValue placeholder="Select outdoor category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patio-furniture">Patio Furniture</SelectItem>
              <SelectItem value="garden-tools">Garden Tools</SelectItem>
              <SelectItem value="plants-seeds">Plants & Seeds</SelectItem>
              <SelectItem value="outdoor-decor">Outdoor Decor</SelectItem>
              <SelectItem value="bbq-cooking">BBQ & Outdoor Cooking</SelectItem>
              <SelectItem value="pools-spas">Pools & Spas</SelectItem>
              <SelectItem value="outdoor-lighting">Outdoor Lighting</SelectItem>
              <SelectItem value="lawn-care">Lawn Care</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" placeholder="Product brand" />
      </div>
      
      <div>
        <Label htmlFor="material">Material</Label>
        <Input type="text" id="material" placeholder="Material (e.g., wood, ceramic, metal)" />
      </div>
      
      <div>
        <Label htmlFor="dimensions">Dimensions</Label>
        <Input type="text" id="dimensions" placeholder="Dimensions (e.g., 24x36x48 inches)" />
      </div>
      
      <div>
        <Label htmlFor="condition">Condition</Label>
        <Select>
          <SelectTrigger id="condition">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="used">Used</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="additionalDetails">Additional Details</Label>
        <Textarea id="additionalDetails" placeholder="Enter any additional details about this item" />
      </div>
    </div>
  );
};

export default HomeGardenFields;
