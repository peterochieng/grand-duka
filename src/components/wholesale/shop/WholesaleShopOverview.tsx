
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { commodities } from '@/lib/data/commodities';
import { BoxesIcon, Eye, EyeOff, ShoppingBag, AlertTriangle, Users, TrendingUp } from 'lucide-react';

const WholesaleShopOverview = () => {
  // This would come from a real backend in a production app
  const shopStats = {
    totalItems: 27,
    publicItems: 18,
    privateItems: 9,
    views: 456,
    inquiries: 34,
    pendingOrders: 12,
    topCommodities: ['Wheat', 'Rice', 'Soybeans'],
    storageUsed: 68, // percentage
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory
            </CardTitle>
            <BoxesIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shopStats.totalItems}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-sm">
                <Eye className="text-green-500 mr-1 h-4 w-4" />
                <span className="text-muted-foreground">{shopStats.publicItems} Public</span>
              </div>
              <div className="flex items-center text-sm">
                <EyeOff className="text-amber-500 mr-1 h-4 w-4" />
                <span className="text-muted-foreground">{shopStats.privateItems} Private</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Views
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shopStats.views}</div>
            <p className="text-xs text-muted-foreground mt-2">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inquiries
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shopStats.inquiries}</div>
            <p className="text-xs text-muted-foreground mt-2">
              8 new this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shopStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-2">
              4 require action
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Inventory Items</CardTitle>
            <CardDescription>
              Your most recently added commodities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commodities.slice(0, 3).map((commodity) => (
                <div key={commodity.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded overflow-hidden">
                      <img 
                        src={commodity.image} 
                        alt={commodity.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium truncate w-48">{commodity.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {commodity.quantity} {commodity.quantityUnit}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="capitalize">{commodity.category}</Badge>
                    {Math.random() > 0.5 ? (
                      <Badge className="bg-green-500">Public</Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-500 border-amber-500">Private</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>
              Inventory storage capacity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Used Storage</div>
                <div className="text-sm text-muted-foreground">{shopStats.storageUsed}%</div>
              </div>
              <Progress value={shopStats.storageUsed} className="h-2" />
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Top Commodities</h4>
                <div className="space-y-2">
                  {shopStats.topCommodities.map((commodity, index) => (
                    <div key={index} className="flex items-center">
                      <TrendingUp className={`h-4 w-4 mr-2 ${index === 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <span className="text-sm">{commodity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle>Complete Your Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Your shop profile is 80% complete. Add contact information and verification documents to unlock all features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WholesaleShopOverview;
