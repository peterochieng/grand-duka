
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { commodities } from '@/lib/data/commodities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommoditySearch from '@/components/commodity/CommoditySearch';
import CommodityGrid from '@/components/commodity/CommodityGrid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const Commodities = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const location = useLocation();
  
  // Get URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilterCategory(categoryParam);
    }
  }, [location.search]);
  
  // Get unique categories from all commodities
  const categories = Array.from(
    new Set(commodities.map(commodity => commodity.category))
  ).sort();
  
  // Filter commodities based on search and filters
  const filteredCommodities = commodities.filter(commodity => {
    // Filter by search query
    if (searchQuery && !commodity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !commodity.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (filterCategory && filterCategory !== "all" && commodity.category !== filterCategory) {
      return false;
    }
    
    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory(null);
  };

  // Determine which tab to select by default
  const getDefaultTab = () => {
    if (filterCategory && categories.includes(filterCategory)) {
      return filterCategory;
    }
    return "all";
  };
  
  return (
    <div className="container py-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/wholesale">Bulk Trading</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Commodity Listings</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-3 mb-4">
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

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Commodity Listings</h1>
        <p className="text-muted-foreground">
          Explore bulk commodity listings with future availability dates from verified traders and brokers.
        </p>
      </div>
      
      <CommoditySearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
      />
      
      <Tabs defaultValue={getDefaultTab()} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Commodities</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <CommodityGrid 
            commodities={filteredCommodities} 
            onClearFilters={clearFilters}
          />
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <CommodityGrid 
              commodities={filteredCommodities.filter(c => c.category === category)}
              onClearFilters={clearFilters}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Commodities;
