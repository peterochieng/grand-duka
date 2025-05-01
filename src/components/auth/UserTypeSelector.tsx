
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Boxes } from 'lucide-react';

interface UserTypeSelectorProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
}

export const UserTypeSelector = ({ defaultValue, onValueChange }: UserTypeSelectorProps) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      className="mb-6" 
      onValueChange={onValueChange}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="retail">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Retail Marketplace
        </TabsTrigger>
        <TabsTrigger value="wholesale">
          <Boxes className="mr-2 h-4 w-4" />
          Bulk Trading
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
