
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { traders } from '@/lib/data/traders';
import { getTradersBySpecialty } from '@/lib/utils/traderUtils';
import TraderCard from '@/components/TraderCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Package } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const Traders = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState<string | null>(null);
  
  // Get unique specialties from all traders
  const allSpecialties = Array.from(
    new Set(traders.flatMap(trader => trader.specialties))
  ).sort();
  
  // Filter traders based on search and filters
  const filteredTraders = traders.filter(trader => {
    // Filter by search query
    if (searchQuery && !trader.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !trader.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by trader type
    if (filterType && filterType !== "all" && trader.type !== filterType) {
      return false;
    }
    
    // Filter by specialty
    if (filterSpecialty && filterSpecialty !== "all" && !trader.specialties.includes(filterSpecialty)) {
      return false;
    }
    
    return true;
  });
  
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
            <BreadcrumbLink>Traders & Brokers</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-3 mb-4">
        <Package className="h-6 w-6" />
        <span className="font-bold text-xl">
          <span className="text-[#8B5CF6]">G</span>
          <span className="text-[#D946EF]">r</span>
          <span className="text-[#F97316]">a</span>
          <span className="text-[#0EA5E9]">n</span>
          <span className="text-[#8B5CF6]">d</span>
          <span className="text-[#00732f] font-black animate-pulse">u</span>
          <span className="text-[#ea384c] font-black">k</span>
          <span className="text-[#000000] font-black">a</span>
        </span>
        <span className="text-muted-foreground ml-1">| Bulk Trading</span>
      </div>

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Traders & Brokers</h1>
        <p className="text-muted-foreground">
          Discover trusted commodity traders and brokers for bulk purchases and future deliveries.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search traders and brokers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select onValueChange={setFilterType} value={filterType || "all"}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{filterType ? filterType.charAt(0).toUpperCase() + filterType.slice(1) : "All Types"}</span>
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="trader">Traders</SelectItem>
            <SelectItem value="broker">Brokers</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={setFilterSpecialty} value={filterSpecialty || "all"}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <span>
              {filterSpecialty || "All Specialties"}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {allSpecialties.map(specialty => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="traders">Traders</TabsTrigger>
          <TabsTrigger value="brokers">Brokers</TabsTrigger>
          <TabsTrigger value="followed">Followed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredTraders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTraders.map(trader => (
                <TraderCard key={trader.id} trader={trader} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No traders or brokers found matching your criteria.</p>
              <Button onClick={() => {
                setSearchQuery('');
                setFilterType(null);
                setFilterSpecialty(null);
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="traders" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders
              .filter(trader => trader.type === 'trader')
              .map(trader => (
                <TraderCard key={trader.id} trader={trader} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="brokers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders
              .filter(trader => trader.type === 'broker')
              .map(trader => (
                <TraderCard key={trader.id} trader={trader} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="followed" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Sign in to see traders and brokers you follow.</p>
            <Button variant="default">Sign In</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Traders;
