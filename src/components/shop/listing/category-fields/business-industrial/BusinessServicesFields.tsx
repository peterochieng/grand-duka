
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const BusinessServicesFields = () => {
  const { register, setValue } = useFormContext();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <Building className="h-5 w-5 mr-2 text-primary" />
          Service Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select 
              onValueChange={(value) => setValue('serviceType', value)}
              defaultValue=""
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distribution">Distribution Centre</SelectItem>
                <SelectItem value="facility">Facility Management</SelectItem>
                <SelectItem value="event">Event Management</SelectItem>
                <SelectItem value="callcenter">Call Centre</SelectItem>
                <SelectItem value="limousine">Limousine Services</SelectItem>
                <SelectItem value="other">Other Business Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serviceArea">Service Area</Label>
            <Input
              id="serviceArea"
              {...register('serviceArea')}
              placeholder="e.g., Dubai, UAE"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="serviceDescription">Service Description</Label>
          <Textarea
            id="serviceDescription"
            {...register('serviceDescription')}
            placeholder="Describe your service in detail"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessServicesFields;
