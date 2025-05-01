
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SpecialtyServicesFields = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="serviceType">Service Type</Label>
        <Input type="text" id="serviceType" placeholder="Type of service" />
      </div>
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input type="text" id="duration" placeholder="Service duration" />
      </div>
      <div>
        <Label htmlFor="availability">Availability</Label>
        <Textarea id="availability" placeholder="Service availability details" />
      </div>
    </div>
  );
};

export default SpecialtyServicesFields;
