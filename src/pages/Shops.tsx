
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ShoppingBag, Boxes } from "lucide-react";
import ShopCard from "@/components/shop/ShopCard";
import { shops } from "@/data/shopsData";

const Shops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter shops based on search and active tab
  const filteredShops = shops.filter(shop => {
    // Filter by search query
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by shop type
    if (activeTab === 'retail' && shop.type !== 'retail') {
      return false;
    }
    
    if (activeTab === 'wholesale' && shop.type !== 'wholesale') {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Browse Shops</h1>
        <p className="text-muted-foreground">
          Discover verified sellers and traders on GrandDuka.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shops..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button variant="outline" className="sm:w-[180px] flex gap-2 items-center">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="all">All Shops</TabsTrigger>
          <TabsTrigger value="retail">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Retail
          </TabsTrigger>
          <TabsTrigger value="wholesale">
            <Boxes className="mr-2 h-4 w-4" />
            Wholesale
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="retail" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops
              .filter(shop => shop.type === 'retail')
              .map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="wholesale" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops
              .filter(shop => shop.type === 'wholesale')
              .map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center py-6">
        <p className="text-muted-foreground mb-4">Don't see what you're looking for?</p>
        <Button asChild>
          <Link to="/open-shop">Open Your Own Shop</Link>
        </Button>
      </div>
    </div>
  );
};

export default Shops;
