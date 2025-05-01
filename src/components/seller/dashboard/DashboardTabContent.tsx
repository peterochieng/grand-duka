
import React from 'react';
import { DashboardStatCards } from './DashboardStatCards';
import { RecentSalesCard } from './RecentSalesCard';
import { PerformanceSummaryCard } from './PerformanceSummaryCard';
import { QuickActionsCard } from './QuickActionsCard';
import { DashboardStats, RecentSale } from '@/types/dashboardTypes';

interface DashboardTabContentProps {
  sellerStats: DashboardStats;
  statsLoading: boolean;
  recentSales: RecentSale[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  onTabChange: (tab: string) => void;
}

export const DashboardTabContent: React.FC<DashboardTabContentProps> = ({
  sellerStats,
  statsLoading,
  recentSales,
  formatCurrency,
  formatDate,
  onTabChange
}) => {
  return (
    <div className="space-y-6">
      <DashboardStatCards 
        stats={sellerStats} 
        loading={statsLoading} 
        onTabChange={onTabChange}
        formatCurrency={formatCurrency}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentSalesCard 
          recentSales={recentSales}
          loading={statsLoading}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          onTabChange={onTabChange}
        />
        
        <PerformanceSummaryCard 
          stats={sellerStats}
          loading={statsLoading}
          onTabChange={onTabChange}
        />
      </div>
      
      <QuickActionsCard onTabChange={onTabChange} />
    </div>
  );
};
