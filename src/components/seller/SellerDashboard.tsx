
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import SellerDashboardLayout from './SellerDashboardLayout';
import CategoryBrowser from './CategoryBrowser';
import CreateListing from './listing/CreateListing';
import OfferManagement from './offers/OfferManagement';
import SellerPreferences from './settings/SellerPreferences';
import { LogisticsCenter } from './logistics/LogisticsCenter';
import { TransactionManager } from './TransactionManager';
import { SellerAnalytics } from './analytics/SellerAnalytics';

const SellerDashboard = () => {
  return (
    <SellerDashboardLayout>
      <TabsContent value="overview">
        {/* Overview content will be added in a future update */}
        <div>Overview content coming soon...</div>
      </TabsContent>
      
      <TabsContent value="products">
        <CreateListing />
      </TabsContent>
      
      <TabsContent value="categories">
        <CategoryBrowser />
      </TabsContent>
      
      <TabsContent value="offers">
        <OfferManagement />
      </TabsContent>
      
      <TabsContent value="logistics">
        <LogisticsCenter />
      </TabsContent>
      
      <TabsContent value="analytics">
        <SellerAnalytics />
      </TabsContent>
      
      <TabsContent value="transactions">
        <TransactionManager orderId="test" />
      </TabsContent>
      
      <TabsContent value="settings">
        <SellerPreferences />
      </TabsContent>
    </SellerDashboardLayout>
  );
};

export default SellerDashboard;
