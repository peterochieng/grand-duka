
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, PackageCheck, Truck, BarChart, ListFilter } from 'lucide-react';

interface QuickActionsCardProps {
  onTabChange: (tab: string) => void;
}

export const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ onTabChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ListFilter className="h-5 w-5 mr-2 text-primary" />
          Quick Actions
        </CardTitle>
        <CardDescription>Frequently used seller tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => onTabChange('inventory')} className="flex flex-col h-auto py-4 space-y-2 w-full">
            <Plus className="h-6 w-6" />
            <span>New Product</span>
          </Button>
          
          <Button onClick={() => onTabChange('sales')} variant="outline" className="flex flex-col h-auto py-4 space-y-2 w-full">
            <PackageCheck className="h-6 w-6" />
            <span>Process Orders</span>
          </Button>
          
          <Button onClick={() => onTabChange('logistics')} variant="outline" className="flex flex-col h-auto py-4 space-y-2 w-full">
            <Truck className="h-6 w-6" />
            <span>Manage Shipping</span>
          </Button>
          
          <Button onClick={() => onTabChange('analytics')} variant="outline" className="flex flex-col h-auto py-4 space-y-2 w-full">
            <BarChart className="h-6 w-6" />
            <span>View Reports</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
