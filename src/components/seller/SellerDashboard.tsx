import React from 'react';
import { Outlet } from 'react-router-dom';
import { TabsContent } from '@/components/ui/tabs';
import SellerDashboardLayout from './SellerDashboardLayout';
import CategoryBrowser from './CategoryBrowser';
import CreateListing from './listing/CreateListing';
import OfferManagement from './offers/OfferManagement';
import SellerPreferences from './settings/SellerPreferences';
import { LogisticsCenter } from './logistics/LogisticsCenter';
import { TransactionManager } from './TransactionManager';
import { SellerAnalytics } from './analytics/SellerAnalytics';
import SellerRejectedListings from './SellerRejectedListings';
import SellerInventory from './SellerInventory';

const SellerDashboard = () => {
  return (
    <SellerDashboardLayout>
      <TabsContent value="overview">
        <div>Seller Overview</div>
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

      <TabsContent value="rejected">
        <SellerRejectedListings />
      </TabsContent>
      
      <TabsContent value="inventory">
        <SellerInventory />
      </TabsContent>

      {/* Add the Outlet so that nested routes like edit are rendered */}
      <Outlet />
    </SellerDashboardLayout>
  );
};

export default SellerDashboard;