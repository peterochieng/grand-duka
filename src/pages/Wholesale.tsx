
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { commodities } from '@/lib/data/commodities';
import { traders } from '@/lib/data/traders';
import HeroSection from '@/components/wholesale/HeroSection';
import SectorCards from '@/components/wholesale/SectorCards';
import FeaturedListings from '@/components/wholesale/FeaturedListings';
import BenefitsSection from '@/components/wholesale/BenefitsSection';
import CTASection from '@/components/wholesale/CTASection';
import { Package, Search, Store } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Wholesale = () => {
  // Get featured commodities and traders
  const featuredCommodities = commodities.slice(0, 3);
  const featuredTraders = traders.slice(0, 3);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for commodities:", searchQuery);
    // In a real application, this would filter results or navigate to search results
  };

  return (
    <div className="container py-8 space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Bulk Trading</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Package className="h-6 w-6" />
          </Link>
          <Link to="/" className="font-bold text-xl">
            <span className="text-[#8B5CF6]">G</span>
            <span className="text-[#D946EF]">r</span>
            <span className="text-[#F97316]">a</span>
            <span className="text-[#0EA5E9]">n</span>
            <span className="text-[#8B5CF6]">d</span>
            <span className="text-[#00732f] font-black animate-pulse">u</span>
            <span className="text-[#ea384c] font-black">k</span>
            <span className="text-[#000000] font-black">a</span>
          </Link>
          <span className="text-muted-foreground ml-1">| Bulk Trading</span>
        </div>
        
        <div className="hidden md:flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/wholesale/shop-dashboard">
              <Store className="mr-2 h-4 w-4" />
              Manage My Inventory
            </Link>
          </Button>
          <Button asChild>
            <Link to="/open-shop">Create Inventory Hub</Link>
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Find Commodities</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search commodities, traders, categories..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <HeroSection />

      {/* Mobile CTA */}
      <div className="flex flex-col gap-3 md:hidden">
        <Button asChild>
          <Link to="/open-shop">Create Inventory Hub</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/wholesale/shop-dashboard">
            <Store className="mr-2 h-4 w-4" />
            Manage My Inventory
          </Link>
        </Button>
      </div>

      {/* Categories Section */}
      <SectorCards />

      {/* Tabs for Featured Listings */}
      <FeaturedListings 
        featuredCommodities={featuredCommodities} 
        featuredTraders={featuredTraders} 
      />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Wholesale;
