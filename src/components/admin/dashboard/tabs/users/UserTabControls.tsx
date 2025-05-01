
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Boxes, User, Users } from "lucide-react";

interface UserTabControlsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const UserTabControls: React.FC<UserTabControlsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <Tabs defaultValue={activeTab} className="mb-6" onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="all">
          <Users className="mr-2 h-4 w-4" />
          All Users
        </TabsTrigger>
        <TabsTrigger value="retail">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Retail
        </TabsTrigger>
        <TabsTrigger value="bulk">
          <Boxes className="mr-2 h-4 w-4" />
          Bulk Trading
        </TabsTrigger>
        <TabsTrigger value="admin">
          <User className="mr-2 h-4 w-4" />
          Admin
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
