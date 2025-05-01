
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from "@/components/ui/tabs";
import { AdminRole } from '@/lib/types/userTypes';
import { AdminHeaderBar } from './dashboard/AdminHeaderBar';
import { AdminStats } from './dashboard/AdminStats';
import { AdminNavigation } from './dashboard/AdminNavigation';
import { AdminTabContent } from './dashboard/AdminTabManager';
import { useRoleUtils } from './dashboard/hooks/useRoleUtils';
import { getRoleTabs } from './helpers/roleHelpers';

interface AdminDashboardProps {
  currentRole: AdminRole | null;
  onLogout: () => void;
}

export const AdminDashboard = ({ currentRole, onLogout }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { getRoleIcon, getRoleTitle } = useRoleUtils(currentRole);
  const [activeTab, setActiveTab] = useState('');
  const [navCollapsed, setNavCollapsed] = useState(false);

  // Define accessible tabs based on role
  const accessibleTabs = getRoleTabs(currentRole);
  
  // Set default tab - for support admin, use 'support' instead of 'dashboard'
  const defaultTab = currentRole === 'support-admin' ? 'support' : (accessibleTabs[0] || 'dashboard');
  
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
  
  useEffect(() => {
    // Check if user is authenticated as admin
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const storedRole = localStorage.getItem('adminRole');
    
    if (adminAuth !== 'true' || !storedRole) {
      navigate('/admin');
      return;
    }
    
    setIsAdmin(true);
  }, [navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!isAdmin) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeaderBar 
        currentRole={currentRole} 
        getRoleIcon={getRoleIcon} 
        getRoleTitle={getRoleTitle}
        onLogout={onLogout}
      />
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{getRoleTitle()} Dashboard</h1>
          <p className="text-muted-foreground">
            {currentRole === 'super-admin' 
              ? 'Manage all aspects of your GrandDuka marketplace' 
              : `Manage ${currentRole?.replace('-', ' ')} functions of your GrandDuka marketplace`}
          </p>
        </div>
        
        <AdminStats currentRole={currentRole} />
        
        <div className="mt-4">
          <Tabs defaultValue={defaultTab}>
            <AdminNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
              collapsed={navCollapsed}
              currentRole={currentRole}
            />
            <AdminTabContent 
              accessibleTabs={accessibleTabs} 
              currentRole={currentRole} 
            />
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
