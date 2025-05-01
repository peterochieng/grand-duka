
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VehiclesFields = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="make">Make</Label>
          <Input type="text" id="make" placeholder="Vehicle make" />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input type="text" id="model" placeholder="Vehicle model" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Year</Label>
          <Input type="number" id="year" placeholder="Year of manufacture" min="1900" max={new Date().getFullYear()} />
        </div>
        <div>
          <Label htmlFor="mileage">Mileage</Label>
          <Input type="number" id="mileage" placeholder="Vehicle mileage" min="0" />
        </div>
      </div>
      <div>
        <Label htmlFor="fuelType">Fuel Type</Label>
        <Select defaultValue="petrol">
          <SelectTrigger>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="petrol">Petrol</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VehiclesFields;
