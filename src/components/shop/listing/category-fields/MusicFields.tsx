
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
import { Music2, Mic, Speaker, Guitar, Calendar, Truck, User2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const MusicFields = () => {
  const { register, setValue, watch } = useFormContext();
  const subcategory = watch('subcategory');

  return (
    <div className="space-y-6">
      {subcategory === 'Music Services' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Music2 className="h-5 w-5 mr-2 text-primary" />
              Music Service Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select 
                  onValueChange={(value) => setValue('musicDetails.serviceType', value)}
                  defaultValue=""
                >
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Music Studio</SelectItem>
                    <SelectItem value="engineering">Sound Engineer</SelectItem>
                    <SelectItem value="production">Producer</SelectItem>
                    <SelectItem value="writing">Writer/Composer</SelectItem>
                    <SelectItem value="other">Other Music Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  {...register('experience')}
                  placeholder="e.g., 5"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="credentials">Credentials & Past Work</Label>
              <Textarea
                id="credentials"
                {...register('credentials')}
                placeholder="Describe your qualifications, past projects, and clients"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                {...register('availability')}
                placeholder="e.g., Weekdays 9AM-6PM"
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      {subcategory === 'Music Equipment Rental' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Speaker className="h-5 w-5 mr-2 text-primary" />
              Equipment Rental Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="equipmentType">Equipment Type</Label>
                <Input
                  id="equipmentType"
                  {...register('musicDetails.equipmentType')}
                  placeholder="e.g., PA System, DJ Equipment"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equipmentBrand">Brand</Label>
                <Input
                  id="equipmentBrand"
                  {...register('musicDetails.equipmentBrand')}
                  placeholder="e.g., Shure, Pioneer"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equipmentCondition">Condition</Label>
                <Select 
                  onValueChange={(value) => setValue('musicDetails.equipmentCondition', value)}
                  defaultValue=""
                >
                  <SelectTrigger id="equipmentCondition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="needs repair">Needs Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rentalDuration">Rental Duration</Label>
                <Input
                  id="rentalDuration"
                  {...register('musicDetails.rentalDuration')}
                  placeholder="e.g., Daily, Weekly, Monthly"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="includesDelivery"
                onCheckedChange={(checked) => setValue('musicDetails.includesDelivery', checked)}
              />
              <Label htmlFor="includesDelivery">Includes Delivery</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="includesSetup"
                onCheckedChange={(checked) => setValue('musicDetails.includesSetup', checked)}
              />
              <Label htmlFor="includesSetup">Includes Setup</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="includesTechnician"
                onCheckedChange={(checked) => setValue('musicDetails.includesTechnician', checked)}
              />
              <Label htmlFor="includesTechnician">Includes Technician</Label>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MusicFields;
