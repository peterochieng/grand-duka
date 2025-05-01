
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AntiquesFields = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="era">Era/Period</Label>
        <Input type="text" id="era" placeholder="Historical era or period" />
      </div>
      <div>
        <Label htmlFor="material">Material</Label>
        <Input type="text" id="material" placeholder="Primary material" />
      </div>
      <div>
        <Label htmlFor="condition">Antique Condition</Label>
        <Select defaultValue="excellent">
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mint">Mint</SelectItem>
            <SelectItem value="excellent">Excellent</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
            <SelectItem value="restored">Restored</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="provenance">Provenance</Label>
        <Input type="text" id="provenance" placeholder="History of ownership" />
      </div>
    </div>
  );
};

export default AntiquesFields;
