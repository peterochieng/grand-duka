
import React from 'react';
import { Store } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface RetailOptionsProps {
  isShopEmployee: boolean;
  setIsShopEmployee: (value: boolean) => void;
  shopId: string;
  setShopId: (id: string) => void;
}

export const RetailOptions = ({
  isShopEmployee,
  setIsShopEmployee,
  shopId,
  setShopId
}: RetailOptionsProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="shop-employee" 
          checked={isShopEmployee}
          onCheckedChange={(checked) => {
            setIsShopEmployee(checked as boolean);
            if (!checked) setShopId('');
          }}
        />
        <Label htmlFor="shop-employee" className="cursor-pointer">
          I'm a shop employee
        </Label>
      </div>
      
      {isShopEmployee && (
        <div className="space-y-2">
          <Label htmlFor="shop-id">
            <Store className="h-4 w-4 inline mr-1" />
            Shop ID
          </Label>
          <Input
            id="shop-id"
            placeholder="Enter the shop ID provided by your employer"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
          />
        </div>
      )}
    </>
  );
};
