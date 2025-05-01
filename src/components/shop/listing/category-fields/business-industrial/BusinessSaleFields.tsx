
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
import { Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const BusinessSaleFields = () => {
  const { register, setValue } = useFormContext();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          Business Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select 
              onValueChange={(value) => setValue('businessDetails.businessType', value)}
              defaultValue=""
            >
              <SelectTrigger id="businessType">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="corporation">Corporation</SelectItem>
                <SelectItem value="llc">LLC</SelectItem>
                <SelectItem value="franchise">Franchise</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="yearsInBusiness">Years in Business</Label>
            <Input
              id="yearsInBusiness"
              type="number"
              {...register('businessDetails.yearsInBusiness')}
              placeholder="e.g., 5"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="revenue">Annual Revenue (AED)</Label>
            <Input
              id="revenue"
              type="number"
              {...register('businessDetails.revenue')}
              placeholder="e.g., 500000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profit">Annual Profit (AED)</Label>
            <Input
              id="profit"
              type="number"
              {...register('businessDetails.profit')}
              placeholder="e.g., 100000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employees">Number of Employees</Label>
            <Input
              id="employees"
              type="number"
              {...register('businessDetails.employees')}
              placeholder="e.g., 10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Selling</Label>
          <Textarea
            id="reason"
            {...register('businessDetails.reason')}
            placeholder="Explain why you are selling this business"
            rows={3}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="includingInventory"
            onCheckedChange={(checked) => setValue('businessDetails.includingInventory', checked)}
          />
          <Label htmlFor="includingInventory">Including Inventory</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="includingRealEstate"
            onCheckedChange={(checked) => setValue('businessDetails.includingRealEstate', checked)}
          />
          <Label htmlFor="includingRealEstate">Including Real Estate</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="financialsAvailable"
            onCheckedChange={(checked) => setValue('businessDetails.financialsAvailable', checked)}
          />
          <Label htmlFor="financialsAvailable">Financial Statements Available</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSaleFields;
