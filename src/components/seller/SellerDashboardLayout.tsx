import React from 'react';
import Layout from '@/components/Layout';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  Store, 
  Package, 
  ListFilter, 
  Settings, 
  MessageSquare, 
  Truck
} from 'lucide-react';

interface SellerDashboardLayoutProps {
  children?: React.ReactNode;
}

const SellerDashboardLayout = ({ children }: SellerDashboardLayoutProps) => {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session) {
        navigate('/signin');
        return;
      }
      
      const role = session.session.user.app_metadata?.role || 
                   session.session.user.user_metadata?.user_type;
      
      if (!['sole-proprietor', 'seller', 'shop-owner', 'shop-employee'].includes(role)) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-4">Loading seller dashboard...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your products and sales
            </p>
          </div>
          <Button onClick={() => navigate('/retail')}>Back to Marketplace</Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
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
              Offers
            </TabsTrigger>
            <TabsTrigger value="logistics">
              <Truck className="w-4 h-4 mr-2" />
              Logistics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="rejected" asChild>
              <Link to="/retail/seller-dashboard/rejected">Rejected Listings</Link>
            </TabsTrigger>
            <TabsTrigger value="inventory" asChild>
  <Link to="/retail/seller-dashboard/inventory">Inventory</Link>
</TabsTrigger>
          </TabsList>
          

          {/* Render children (from SellerDashboard) if provided; otherwise, fallback to nested route Outlet */}
          {children ? children : <Outlet />}
        </Tabs>
      </div>
    </Layout>
  );
};

export default SellerDashboardLayout;