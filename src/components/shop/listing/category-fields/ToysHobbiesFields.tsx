
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ToysHobbiesFields = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="itemType">Item Type</Label>
        <Input type="text" id="itemType" placeholder="Type of item" />
      </div>
      <div>
        <Label htmlFor="ageGroup">Age Group</Label>
        <Select defaultValue="all-ages">
          <SelectTrigger>
            <SelectValue placeholder="Select age group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-3">0-3 years</SelectItem>
            <SelectItem value="4-7">4-7 years</SelectItem>
            <SelectItem value="8-12">8-12 years</SelectItem>
            <SelectItem value="13-adult">13+ years</SelectItem>
            <SelectItem value="all-ages">All Ages</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" placeholder="Brand name" />
      </div>
    </div>
  );
};

export default ToysHobbiesFields;
