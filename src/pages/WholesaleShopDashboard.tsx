
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BoxesIcon, PlusIcon, Settings, BarChart2, Eye, EyeOff, Link as LinkIcon } from 'lucide-react';
import WholesaleShopOverview from '@/components/wholesale/shop/WholesaleShopOverview';
import InventoryManager from '@/components/wholesale/shop/InventoryManager';
import ShopAnalytics from '@/components/wholesale/shop/ShopAnalytics';
import ShopSettings from '@/components/wholesale/shop/ShopSettings';
import { useToast } from '@/hooks/use-toast';

const WholesaleShopDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  const handleShareLink = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText('https://yourdomain.com/wholesale/inventory/private/abc123');
    toast({
      title: "Link copied!",
      description: "Private inventory link has been copied to clipboard",
    });
  };
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BoxesIcon className="h-8 w-8 text-amber-500" />
              Global Commodities Trading
            </h1>
            <p className="text-muted-foreground">Manage your inventory hub</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShareLink}>
              <LinkIcon className="h-4 w-4 mr-2" />
              Share Private Link
            </Button>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Inventory Item
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <WholesaleShopOverview />
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <InventoryManager />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <ShopAnalytics />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <ShopSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WholesaleShopDashboard;
