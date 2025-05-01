
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
import { Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HardwareToolsFields = () => {
  const { register, setValue } = useFormContext();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <Wrench className="h-5 w-5 mr-2 text-primary" />
          Hardware Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="toolType">Tool Type</Label>
            <Select 
              onValueChange={(value) => setValue('toolType', value)}
              defaultValue=""
            >
              <SelectTrigger id="toolType">
                <SelectValue placeholder="Select tool type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="generator">Generator</SelectItem>
                <SelectItem value="wrenches">Wrenches</SelectItem>
                <SelectItem value="powertools">Power Tools</SelectItem>
                <SelectItem value="handtools">Hand Tools</SelectItem>
                <SelectItem value="measuring">Measuring Tools</SelectItem>
                <SelectItem value="other">Other Hardware</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              {...register('brand')}
              placeholder="e.g., DeWalt, Bosch"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select 
              onValueChange={(value) => setValue('condition', value)}
              defaultValue=""
            >
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like_new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="for_parts">For Parts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HardwareToolsFields;
