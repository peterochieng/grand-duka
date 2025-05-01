
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { toast } from 'sonner';

// Types
import { DashboardStats, RecentSale } from '@/types/dashboardTypes';

// Components
import { ProductList } from '@/components/seller/inventory/ProductList';
import { SalesHistory } from '@/components/seller/sales/SalesHistory';
import { LogisticsCenter } from '@/components/seller/logistics/LogisticsCenter';
import { MessagingCenter } from '@/components/seller/messaging/MessagingCenter';
import { SellerAnalytics } from '@/components/seller/analytics/SellerAnalytics';
import { AccountSettings } from '@/components/seller/settings/AccountSettings';
import { DashboardTabs } from '@/components/seller/dashboard/DashboardTabs';
import { DashboardTabContent } from '@/components/seller/dashboard/DashboardTabContent';

const RetailSellerDashboard = () => {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [sellerStats, setSellerStats] = useState<DashboardStats>({
    productCount: 0,
    activeProductCount: 0,
    orderCount: 0,
    pendingOrderCount: 0,
    totalRevenue: 0,
    averageRating: 0,
    unreadMessages: 0
  });
  
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);

  useEffect(() => {
    // Check if user is authenticated and has the correct role
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        toast.error('Please sign in to access the seller dashboard');
        navigate('/signin');
        return;
      }
      
      // Get the role directly from app_metadata or user_metadata
      let role = null;
      
      if (data.session.user.app_metadata?.role) {
        role = data.session.user.app_metadata.role;
      } else if (data.session.user.user_metadata?.role) {
        role = data.session.user.user_metadata.role;
      } else {
        role = 'buyer';
      }
      
      setUserRole(role);
      
      // Allow access only to seller roles
      if (role !== 'sole-proprietor' && role !== 'seller' && role !== 'shop-owner') {
        toast.error('You do not have permission to access the seller dashboard');
        navigate('/retail');
      } else {
        // Fetch seller stats when user is authenticated with the correct role
        if (data.session?.user?.id) {
          fetchSellerStats(data.session.user.id);
        }
      }
    };
    
    checkAuth();
  }, [navigate]);

  const fetchSellerStats = async (userId: string) => {
    setStatsLoading(true);
    try {
      // Fetch seller products - active and total
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, featured, price')
        .eq('seller_id', userId);
        
      if (productsError) throw productsError;
      
      const activeProducts = products?.filter(p => p.featured) || [];
      
      // Fetch orders for the seller
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id, total_amount, status, created_at')
        .eq('seller_id', userId);
        
      if (ordersError) throw ordersError;
      
      const pendingOrders = orders?.filter(o => o.status === 'pending' || o.status === 'paid') || [];
      
      // Calculate stats
      const productCount = products?.length || 0;
      const activeProductCount = activeProducts.length;
      const orderCount = orders?.length || 0;
      const pendingOrderCount = pendingOrders.length;
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      
      // Simulate unread messages for now
      const unreadMessages = Math.floor(Math.random() * 5);
      
      // Calculate recent sales
      if (orders && orders.length > 0) {
        const recent = [...orders]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5);
        setRecentSales(recent as RecentSale[]);
      }
      
      setSellerStats({
        productCount,
        activeProductCount,
        orderCount,
        pendingOrderCount,
        totalRevenue,
        averageRating: 4.2, // Sample data
        unreadMessages
      });
    } catch (error) {
      console.error('Error fetching seller stats:', error);
      toast.error('Failed to load seller statistics');
    } finally {
      setStatsLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-4">Loading seller dashboard...</h1>
        </div>
      </Layout>
    );
  }

  // Generate display name from user data
  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'Seller';
  
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {displayName} ({userRole || 'loading role...'})
            </p>
          </div>
          <Button onClick={() => navigate('/retail')}>Back to Marketplace</Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <DashboardTabs 
            activeTab={activeTab} 
            unreadMessages={sellerStats.unreadMessages}
            onTabChange={handleTabChange}
          />
          
          <TabsContent value="dashboard" className="pt-2">
            <DashboardTabContent
              sellerStats={sellerStats}
              statsLoading={statsLoading}
              recentSales={recentSales}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              onTabChange={handleTabChange}
            />
          </TabsContent>
          
          <TabsContent value="inventory" className="pt-2">
            <ProductList />
          </TabsContent>
          
          <TabsContent value="sales" className="pt-2">
            <SalesHistory />
          </TabsContent>
          
          <TabsContent value="logistics" className="pt-2">
            <LogisticsCenter />
          </TabsContent>
          
          <TabsContent value="messaging" className="pt-2">
            <MessagingCenter />
          </TabsContent>
          
          <TabsContent value="analytics" className="pt-2">
            <SellerAnalytics />
          </TabsContent>
          
          <TabsContent value="settings" className="pt-2">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RetailSellerDashboard;
