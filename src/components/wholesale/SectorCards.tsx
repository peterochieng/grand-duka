
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Factory, Landmark, TrendingUp, Ship, ChevronRight } from 'lucide-react';

const SectorCards = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Commodity Sectors</h2>
        <Button variant="outline" asChild>
          <Link to="/wholesale/commodities">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-4">
            <Factory className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Agriculture</CardTitle>
            <CardDescription>Grains, produce, and livestock</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link to="/wholesale/commodities?category=Agriculture">
                View Listings <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <Landmark className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Metals & Mining</CardTitle>
            <CardDescription>Precious metals, industrial metals, and minerals</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link to="/wholesale/commodities?category=Metals">
                View Listings <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <TrendingUp className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Energy</CardTitle>
            <CardDescription>Oil, gas, and renewable energy</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link to="/wholesale/commodities?category=Energy">
                View Listings <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <Ship className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Shipping & Logistics</CardTitle>
            <CardDescription>Transport and logistics services</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link to="/wholesale/commodities?category=Shipping & Logistics">
                View Listings <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SectorCards;
