
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Boxes, ArrowLeft, BookOpen, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import RetailShopForm from '@/components/shop/RetailShopForm';
import WholesaleTraderForm from '@/components/shop/WholesaleTraderForm';
import ShopBenefits from '@/components/shop/ShopBenefits';
import ShopStats from '@/components/shop/ShopStats';
import RetailUserGuide from '@/components/shop/RetailUserGuide';
import WholesaleUserGuide from '@/components/wholesale/WholesaleUserGuide';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const OpenShop = () => {
  const { toast } = useToast();
  const [shopType, setShopType] = useState<'retail' | 'wholesale'>('retail');
  const [showGuide, setShowGuide] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Application Submitted",
      description: `Your ${shopType} shop application has been submitted for review.`,
    });
  };

  const retailBenefits = [
    { text: "Sell to individual customers", isIncluded: true },
    { text: "Custom branded shop page", isIncluded: true },
    { text: "Multiple listing types (auction, buy it now, offers)", isIncluded: true },
    { text: "Integrated shipping and payments", isIncluded: true }
  ];

  const retailRequirements = [
    { text: "Valid ID verification", isIncluded: true },
    { text: "Business registration (for business accounts)", isIncluded: true },
    { text: "No previous account suspensions", isIncluded: false }
  ];

  const wholesaleBenefits = [
    { text: "Trade bulk commodities with businesses", isIncluded: true },
    { text: "Verified trader profile with trust badge", isIncluded: true },
    { text: "Future contracts and delivery scheduling", isIncluded: true },
    { text: "Direct negotiation with potential buyers", isIncluded: true }
  ];

  const wholesaleRequirements = [
    { text: "Business registration documents", isIncluded: true },
    { text: "Trade license and permits", isIncluded: true },
    { text: "Company director verification", isIncluded: true },
    { text: "Proof of trading history", isIncluded: true }
  ];
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col space-y-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Open Your Shop on GrandDuka</h1>
        <p className="text-muted-foreground mx-auto max-w-3xl">
          Choose whether you want to sell products to individual consumers (retail) 
          or bulk commodities to businesses (wholesale).
        </p>
      </div>
      
      <Tabs defaultValue="retail" className="w-full" onValueChange={(value) => setShopType(value as 'retail' | 'wholesale')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="retail">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Retail Shop
          </TabsTrigger>
          <TabsTrigger value="wholesale">
            <Boxes className="mr-2 h-4 w-4" />
            Wholesale Trading
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="retail" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link to="/retail">
                <ArrowLeft className="h-4 w-4" />
                Back to Retail Marketplace
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => setShowGuide(!showGuide)} className="gap-1">
              <BookOpen className="h-4 w-4" />
              {showGuide ? "Hide User Guide" : "Show User Guide"}
            </Button>
          </div>
          
          {showGuide && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <RetailUserGuide />
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Retail Seller Registration</CardTitle>
                <CardDescription>Sell products to individual customers</CardDescription>
              </CardHeader>
              <CardContent>
                <RetailShopForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <ShopBenefits title="Retail Shop Benefits" benefits={retailBenefits} />
              <ShopBenefits title="Requirements" benefits={retailRequirements} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wholesale" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link to="/wholesale">
                <ArrowLeft className="h-4 w-4" />
                Back to Bulk Trading
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => setShowGuide(!showGuide)} className="gap-1">
              <BookOpen className="h-4 w-4" />
              {showGuide ? "Hide User Guide" : "Show User Guide"}
            </Button>
          </div>
          
          {showGuide && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <WholesaleUserGuide />
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Wholesale Trader Registration</CardTitle>
                <CardDescription>Trade commodities in bulk with businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <WholesaleTraderForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <ShopBenefits title="Wholesale Trading Benefits" benefits={wholesaleBenefits} />
              <ShopBenefits title="Enhanced Requirements" benefits={wholesaleRequirements} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-8" />
      
      <ShopStats />
      
      <div className="bg-muted rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Have Questions?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Our seller support team is here to help you get started with your shop.
        </p>
        <Button variant="outline">Contact Seller Support</Button>
      </div>
    </div>
  );
};

export default OpenShop;
