
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BabyEssentialsFields = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ageRange">Age Range</Label>
        <Select defaultValue="0-6m">
          <SelectTrigger>
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-6m">0-6 months</SelectItem>
            <SelectItem value="6-12m">6-12 months</SelectItem>
            <SelectItem value="1-2y">1-2 years</SelectItem>
            <SelectItem value="2-3y">2-3 years</SelectItem>
            <SelectItem value="3-5y">3-5 years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" placeholder="Product brand" />
      </div>
    </div>
  );
};

export default BabyEssentialsFields;
