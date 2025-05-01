
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-[#9b87f5] font-black">G</span>
          <span className="text-[#0EA5E9] font-black">r</span>
          <span className="text-[#F97316] font-black">a</span>
          <span className="text-[#EAB308] font-black">n</span>
          <span className="text-[#9b87f5] font-black">d</span>
          <span className="text-[#3cb371] font-black">u</span>
          <span className="text-[#ea384c] font-black">k</span>
          <span className="text-black font-black">a</span>
          <span className="ml-2 font-bold">Bulk Trading</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect with verified traders, brokers and producers to buy and sell commodities in bulk. 
          From agricultural products to energy resources.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" asChild>
            <Link to="/wholesale/commodities">
              Browse Commodities
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/wholesale/traders">
              Find Traders
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <img 
          src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
          alt="Bulk Trading Commodities" 
          className="w-full h-[400px] rounded-lg object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
