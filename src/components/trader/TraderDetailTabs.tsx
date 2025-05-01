
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trader, Commodity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CommodityCard from '@/components/CommodityCard';

interface TraderDetailTabsProps {
  trader: Trader;
  traderCommodities: Commodity[];
}

const TraderDetailTabs = ({ trader, traderCommodities }: TraderDetailTabsProps) => {
  return (
    <Tabs defaultValue="inventory" className="w-full">
      <TabsList className="w-full justify-start mb-6">
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>
      
      <TabsContent value="inventory" className="space-y-6">
        <h2 className="text-xl font-semibold">Available Listings</h2>
        {traderCommodities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traderCommodities.map(commodity => (
              <CommodityCard key={commodity.id} commodity={commodity} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                This trader doesn't have any active listings at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="about" className="space-y-6">
        <h2 className="text-xl font-semibold">About {trader.name}</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <CardTitle className="text-lg mb-2">Business Overview</CardTitle>
              <CardDescription>{trader.description}</CardDescription>
            </div>
            
            <div>
              <CardTitle className="text-lg mb-2">Specialties</CardTitle>
              <div className="flex flex-wrap gap-2">
                {trader.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-secondary/50">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="services" className="space-y-6">
        <h2 className="text-xl font-semibold">Services Offered</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <CardTitle className="text-lg mb-2">
                  {trader.type === 'trader' ? 'Trading Services' : 'Brokerage Services'}
                </CardTitle>
                <ul className="list-disc pl-5 space-y-2">
                  {trader.type === 'trader' ? (
                    <>
                      <li>Direct bulk commodity purchase and sales</li>
                      <li>Inventory management and warehousing</li>
                      <li>Supply chain solutions</li>
                      <li>International shipping and logistics</li>
                    </>
                  ) : (
                    <>
                      <li>Connecting buyers and sellers</li>
                      <li>Market analysis and pricing intelligence</li>
                      <li>Contract negotiation assistance</li>
                      <li>Due diligence and buyer/seller verification</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TraderDetailTabs;
