
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from 'lucide-react';
import { DashboardStats } from '@/types/dashboardTypes';

interface PerformanceSummaryCardProps {
  stats: DashboardStats;
  loading: boolean;
  onTabChange: (tab: string) => void;
}

export const PerformanceSummaryCard: React.FC<PerformanceSummaryCardProps> = ({
  stats,
  loading,
  onTabChange
}) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-primary" />
          Performance Summary
        </CardTitle>
        <CardDescription>Your store performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Customer Rating</span>
              <span className="text-sm font-medium">
                {loading ? "Loading..." : `${stats.averageRating.toFixed(1)}/5.0`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-primary h-2.5 rounded-full" style={{ 
                width: loading ? "0%" : `${(stats.averageRating / 5) * 100}%` 
              }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Order Completion</span>
              <span className="text-sm font-medium">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "98%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">On-time Delivery</span>
              <span className="text-sm font-medium">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Response Rate</span>
              <span className="text-sm font-medium">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "87%" }}></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onTabChange('analytics')}>
          View Detailed Analytics
        </Button>
      </CardFooter>
    </Card>
  );
};
