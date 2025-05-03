
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Store, 
  Package, 
  ListFilter, 
  Settings,
  MessageSquare,
  Truck,
  ClipboardList,
  BarChart2,
  LucideReceiptJapaneseYen
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardTabsProps {
  activeTab: string;
  unreadMessages: number;
  onTabChange: (value: string) => void;
}

export const DashboardTabs = ({ 
  activeTab, 
  unreadMessages, 
  onTabChange 
}: DashboardTabsProps) => {
  return (
    <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
      <TabsTrigger value="overview">
        <Store className="w-4 h-4 mr-2" />
        Overview
      </TabsTrigger>
      <TabsTrigger value="products">
        <Package className="w-4 h-4 mr-2" />
        Products
      </TabsTrigger>
      <TabsTrigger value="categories">
        <ListFilter className="w-4 h-4 mr-2" />
        Categories
      </TabsTrigger>
      <TabsTrigger value="offers">
        <MessageSquare className="w-4 h-4 mr-2" />
        Offers {unreadMessages > 0 && <span className="ml-1 text-xs">({unreadMessages})</span>}
      </TabsTrigger>
      <TabsTrigger value="logistics">
        <Truck className="w-4 h-4 mr-2" />
        Logistics
      </TabsTrigger>
      <TabsTrigger value="analytics">
        <BarChart2 className="w-4 h-4 mr-2" />
        Analytics
      </TabsTrigger>
      <TabsTrigger value="transactions">
        <ClipboardList className="w-4 h-4 mr-2" />
        Transactions
      </TabsTrigger>
      <TabsTrigger value="settings">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </TabsTrigger>
      
    </TabsList>
  );
};
