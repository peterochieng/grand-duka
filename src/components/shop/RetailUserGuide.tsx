
import React from 'react';
import { BookOpen, HelpCircle, ShoppingBag, Settings, ListCheck, ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RetailUserGuide = () => {
  const { toast } = useToast();
  
  const handleLearnMore = (topic: string) => {
    toast({
      title: "More Information",
      description: `Navigating to detailed article about ${topic}`,
    });
    // In a real app, this would navigate to a detailed guide
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Retail Shop User Guide
        </h2>
        <p className="text-muted-foreground">
          Learn how to set up and manage your retail shop on GrandDuka
        </p>
      </div>

      <Tabs defaultValue="getting-started">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="managing-shop">Managing Your Shop</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Setting Up Your Shop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Complete Your Registration</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out all required information in the registration form, including your shop name, business email,
                  and shop description.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Shop Registration")}
                >
                  Registration guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">2. Verify Your Identity</h3>
                <p className="text-sm text-muted-foreground">
                  Submit required documentation for KYC verification to ensure your shop meets our security standards.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("KYC Verification")}
                >
                  KYC requirements 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">3. Set Up Your Shop Profile</h3>
                <p className="text-sm text-muted-foreground">
                  After approval, customize your shop page with your logo, banners, and detailed business information.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Shop Profile")}
                >
                  Profile setup tips 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">4. Add Your First Product</h3>
                <p className="text-sm text-muted-foreground">
                  Create your first product listing with clear photos, detailed descriptions, and accurate pricing information.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Product Listing")}
                >
                  Product listing guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shop Types and Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Standard Shop Features</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Custom branded shop page</li>
                  <li>Multiple listing types (auction, buy it now, offers)</li>
                  <li>Real-time inventory management</li>
                  <li>Customer messaging system</li>
                  <li>Integrated payment processing</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Standard Shop Features")}
                >
                  Compare shop types 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Premium Shop Features</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Featured placement in search results</li>
                  <li>Advanced analytics dashboard</li>
                  <li>Bulk listing tools</li>
                  <li>Automated email marketing</li>
                  <li>Dedicated account manager</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Premium Shop Benefits")}
                >
                  Learn about premium benefits 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="managing-shop" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Adding Products</h3>
                <p className="text-sm text-muted-foreground">
                  Navigate to your shop dashboard and select "Add Product." Fill in the product details, upload photos, 
                  set prices, and specify shipping options.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Adding Products")}
                >
                  Product addition tutorial 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Using Listing Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Create templates for similar products to save time when listing multiple items.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Listing Templates")}
                >
                  Template creation guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Managing Stock</h3>
                <p className="text-sm text-muted-foreground">
                  Update inventory quantities, set up low stock alerts, and enable automatic "out of stock" notifications.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Inventory Management")}
                >
                  Inventory management tutorial 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Processing Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new orders, review order details, and process payments through your dashboard.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Order Processing")}
                >
                  Order processing guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Shipping and Fulfillment</h3>
                <p className="text-sm text-muted-foreground">
                  Print shipping labels, track packages, and update customers with shipping information.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Shipping and Fulfillment")}
                >
                  Shipping guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Managing Returns</h3>
                <p className="text-sm text-muted-foreground">
                  Process return requests, issue refunds, and track returned merchandise.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Returns Management")}
                >
                  Returns processing guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analytics and Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Monitor shop performance through the analytics dashboard, including sales metrics, visitor statistics, 
                and customer behavior data.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto flex items-center text-primary text-sm"
                onClick={() => handleLearnMore("Shop Analytics")}
              >
                Analytics guide 
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does shop approval take?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Standard shop applications are typically reviewed within 1-2 business days. Premium shop applications may require additional verification and can take 3-5 business days.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Shop Approval Process")}
                  >
                    View approval timeline details 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the fees for selling on GrandDuka?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>GrandDuka charges a 5% transaction fee on each sale. Additional fees may apply for premium features or promotional services. There are no monthly subscription fees for standard shops.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Seller Fees")}
                  >
                    View detailed fee structure 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I handle customer disputes?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Customer disputes can be managed through the Resolution Center in your shop dashboard. We recommend responding promptly to customer inquiries and working toward amicable solutions.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Dispute Resolution")}
                  >
                    See dispute resolution guidelines 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I sell internationally?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Yes, GrandDuka supports international selling. You can specify which countries you ship to in your shop settings and set different shipping rates for various regions.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("International Selling")}
                  >
                    International selling guide 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I get my products featured?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Products can be featured through our promotional options available in your shop dashboard. Premium shops also receive featured placement in search results and category pages.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Product Promotion")}
                  >
                    Learn about promotion options 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>What payment methods can I offer to customers?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>GrandDuka supports multiple payment methods including credit/debit cards, bank transfers, mobile money, and various digital wallets. You can select which payment methods to accept in your shop settings.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Payment Methods")}
                  >
                    View payment options 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger>How do I contact seller support?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Seller support can be reached through the Help Center in your shop dashboard or by emailing support@grandduka.com. Premium shops have access to dedicated account managers.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Seller Support")}
                  >
                    Contact seller support 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetailUserGuide;
