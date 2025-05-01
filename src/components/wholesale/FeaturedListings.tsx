
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import TraderCard from '@/components/TraderCard';
import CommodityCard from '@/components/CommodityCard';

interface FeaturedListingsProps {
  featuredCommodities: any[];
  featuredTraders: any[];
}

const FeaturedListings = ({ featuredCommodities, featuredTraders }: FeaturedListingsProps) => {
  return (
    <Tabs defaultValue="commodities" className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Listings</h2>
        <TabsList>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="traders">Traders & Brokers</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="commodities" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCommodities.map(commodity => (
            <CommodityCard key={commodity.id} commodity={commodity} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link to="/wholesale/commodities">
              View All Commodities <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="traders" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTraders.map(trader => (
            <TraderCard key={trader.id} trader={trader} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link to="/wholesale/traders">
              View All Traders <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FeaturedListings;
