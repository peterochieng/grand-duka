
import { AdminRole } from '@/lib/types/userTypes';
import { TabsContent } from '@/components/ui/tabs';
import { DashboardTab } from './tabs/DashboardTab';
import { UsersTab } from './tabs/UsersTab';
import { ProductsTab } from './tabs/ProductsTab';
import { CategoriesTab } from './tabs/CategoriesTab';
import { ShopsTab } from './tabs/ShopsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { SellersTab } from './tabs/SellersTab';
import { PermissionsTab } from './tabs/PermissionsTab';
import { UserGuidesTab } from './tabs/UserGuidesTab';
import { SupportCenterTab } from './tabs/SupportCenterTab';
import { DataAnalyticsTab } from './tabs/DataAnalyticsTab';
import { FaqTab } from './tabs/FaqTab';
import { InspectionsTab } from './tabs/InspectionsTab';
import { BuyersTab } from './tabs/BuyersTab';
import { SupportAdminDashboard } from './tabs/SupportAdminDashboard';
import { DeveloperTasksTab } from './tabs/dev/DeveloperTasksTab';
import { AdminCategoryManager } from './tabs/categories/AdminCategoryManager';
import { CategoryRequests } from './tabs/categories/CategoryRequests';
import { AdminSubcategoryTemplateManager } from './tabs/templates/AdminSubcategoryTemplateManager';

interface AdminTabContentProps {
  accessibleTabs: string[];
  currentRole: AdminRole | null;
}

export const AdminTabContent = ({ accessibleTabs, currentRole }: AdminTabContentProps) => {
  const shouldShowSupportAdmin = currentRole === 'support-admin';

  return (
    <>
      <TabsContent value="dashboard">
        <DashboardTab currentRole={currentRole} />
      </TabsContent>
      
      {accessibleTabs.includes('products') && (
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
      )}
      
      {/* // Updated snippet in AdminTabManager.tsx */}
{accessibleTabs.includes('categories') && (
  <TabsContent value="categories">
    <CategoriesTab />
  </TabsContent>
)}


{accessibleTabs.includes('category-requests') && (
  <TabsContent value="category-requests">
    <CategoryRequests />
  </TabsContent>
)}

{accessibleTabs.includes('subcategory-templates') && ( <TabsContent value="subcategory-templates"> <AdminSubcategoryTemplateManager /> </TabsContent> )}
      
      {accessibleTabs.includes('users') && (
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('sellers') && (
        <TabsContent value="sellers">
          <SellersTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('shops') && (
        <TabsContent value="shops">
          <ShopsTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('inspections') && (
        <TabsContent value="inspections">
          <InspectionsTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('buyers') && (
        <TabsContent value="buyers">
          <BuyersTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('analytics') && (
        <TabsContent value="data-analytics">
          <DataAnalyticsTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('permissions') && (
        <TabsContent value="permissions">
          <PermissionsTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('support') && (
        <TabsContent value="support-center">
          {shouldShowSupportAdmin ? <SupportAdminDashboard /> : <SupportCenterTab />}
        </TabsContent>
      )}
      
      {accessibleTabs.includes('faqs') && (
        <TabsContent value="faq">
          <FaqTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('guides') && (
        <TabsContent value="user-guides">
          <UserGuidesTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('settings') && (
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      )}
      
      {accessibleTabs.includes('dev-tasks') && (
        <TabsContent value="dev-tasks">
          <DeveloperTasksTab />
        </TabsContent>
      )}
    </>
  );
};
