
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Categories } from '@/components/Categories';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Boxes, Car, Search } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section with Retail/Wholesale Options */}
        <div className="mb-12 py-8 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Find Products & Commodities on Granduka
              </h1>
              <p className="text-xl text-muted-foreground">
                Shop our marketplace for retail products or trade bulk commodities with verified sellers.
              </p>
              
              {/* Search bar in hero section */}
              <Card className="bg-muted/50 border-muted p-2 mt-4">
                <CardContent className="p-2">
                  <SearchBar 
                    className="w-full max-w-full" 
                    placeholder="What are you looking for today?"
                  />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-md">
                <Button size="lg" className="w-full flex items-center" asChild>
                  <Link to="/retail">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Retail
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full flex items-center" asChild>
                  <Link to="/wholesale">
                    <Boxes className="mr-2 h-5 w-5" />
                    Bulk Trading
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Granduka Marketplace" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Featured Categories */}
        <div className="py-8 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Browse Categories</h2>
          </div>
          <Categories />
        </div>
        
        {/* Vehicles Spotlight */}
        <div className="py-8 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-slate-50 dark:bg-slate-800/20 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 flex-1">
                <h2 className="text-2xl font-bold">Explore Vehicles & Parts</h2>
                <p className="text-muted-foreground">
                  Find cars, motorcycles, boats, and automotive parts from verified sellers. 
                  Browse our extensive collection of vehicles and accessories.
                </p>
                <Button size="lg" asChild>
                  <Link to="/category/vehicles">
                    <Car className="mr-2 h-5 w-5" />
                    Explore Vehicles
                  </Link>
                </Button>
              </div>
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80" 
                  alt="Vehicles and Parts" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="py-8 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link to="/products">View All</Link>
            </Button>
          </div>
          <FeaturedProducts />
        </div>
        
        {/* Wholesale CTA */}
        <div className="py-8 pb-16 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-muted rounded-lg p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <h2 className="text-2xl font-bold">Bulk Trading Platform</h2>
                <p className="text-muted-foreground">
                  Connect with verified traders and brokers to buy and sell commodities in bulk.
                  From agricultural products to energy resources.
                </p>
                <Button asChild>
                  <Link to="/wholesale">
                    <Boxes className="mr-2 h-4 w-4" />
                    Explore Bulk Trading
                  </Link>
                </Button>
              </div>
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80" 
                  alt="Bulk Trading" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
