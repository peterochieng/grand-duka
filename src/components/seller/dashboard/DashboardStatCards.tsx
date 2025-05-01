
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, MessageSquare, Plus, FileText } from 'lucide-react';
import { DashboardStats } from '@/types/dashboardTypes';

interface DashboardStatCardsProps {
  stats: DashboardStats;
  loading: boolean;
  onTabChange: (tab: string) => void;
  formatCurrency: (amount: number) => string;
}

export const DashboardStatCards: React.FC<DashboardStatCardsProps> = ({ 
  stats, 
  loading, 
  onTabChange,
  formatCurrency 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Package className="h-5 w-5 mr-2 text-primary" />
            Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="mb-4">Loading...</p>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Products:</span>
                <span className="font-medium">{stats.productCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Products:</span>
                <span className="font-medium">{stats.activeProductCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Hidden Products:</span>
                <span className="font-medium">{stats.productCount - stats.activeProductCount}</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => onTabChange('inventory')}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
            Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="mb-4">Loading...</p>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Orders:</span>
                <span className="font-medium">{stats.orderCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pending Orders:</span>
                <span className="font-medium">{stats.pendingOrderCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Revenue:</span>
                <span className="font-medium">{formatCurrency(stats.totalRevenue)}</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => onTabChange('sales')}>
            <FileText className="w-4 h-4 mr-2" />
            View All Orders
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="mb-4">Loading...</p>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Unread Messages:</span>
                <span className="font-medium">{stats.unreadMessages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Customer Inquiries:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Response Time:</span>
                <span className="font-medium">2h 15m</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => onTabChange('messaging')}>
            <MessageSquare className="w-4 h-4 mr-2" />
            View Messages
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
