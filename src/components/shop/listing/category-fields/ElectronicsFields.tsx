
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ElectronicsFields = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" placeholder="Device brand" />
      </div>
      <div>
        <Label htmlFor="modelName">Model</Label>
        <Input type="text" id="modelName" placeholder="Device model" />
      </div>
      <div>
        <Label htmlFor="warranty">Warranty</Label>
        <Select defaultValue="none">
          <SelectTrigger>
            <SelectValue placeholder="Select warranty period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Warranty</SelectItem>
            <SelectItem value="30days">30 Days</SelectItem>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="1year">1 Year</SelectItem>
            <SelectItem value="2years">2+ Years</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ElectronicsFields;
