
import React from 'react';
import { BookOpen, HelpCircle, Boxes, Settings, ListCheck, ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WholesaleUserGuide = () => {
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
          Wholesale Trading User Guide
        </h2>
        <p className="text-muted-foreground">
          Learn how to set up and manage your wholesale trading operations on GrandDuka
        </p>
      </div>

      <Tabs defaultValue="getting-started">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="trading-operations">Trading Operations</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Setting Up Your Trading Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Complete Business Registration</h3>
                <p className="text-sm text-muted-foreground">
                  Submit your company information, including business registration documents, tax identification, and business licenses.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Business Registration")}
                >
                  Registration requirements 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">2. Enhanced Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Complete the enhanced verification process which includes company director verification and business history documentation.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Enhanced Verification")}
                >
                  Verification checklist 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">3. Set Up Commodity Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Specify which commodity categories you trade in and provide details about your typical trade volumes and terms.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Commodity Categories")}
                >
                  Commodity category guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">4. Create Your First Listing</h3>
                <p className="text-sm text-muted-foreground">
                  Add your first commodity listing with detailed specifications, quantities available, pricing structure, and delivery terms.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Commodity Listing")}
                >
                  Listing creation guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trader Types and Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Standard Trader Features</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Verified trader profile with trust badge</li>
                  <li>Bulk commodity listings</li>
                  <li>Direct negotiation capabilities</li>
                  <li>Contract generation tools</li>
                  <li>Escrow payment system</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Standard Trader Features")}
                >
                  Standard features overview 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Premium Trader Features</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Future contracts and scheduling</li>
                  <li>Advanced market analysis tools</li>
                  <li>Priority matching with potential buyers/sellers</li>
                  <li>International logistics support</li>
                  <li>Dedicated account manager</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Premium Trader Features")}
                >
                  Premium benefits overview 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading-operations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory and Commodity Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Managing Commodity Listings</h3>
                <p className="text-sm text-muted-foreground">
                  Create, update, and manage your commodity listings through your trader dashboard. Include detailed specifications, 
                  quality certificates, and origin documentation.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Commodity Management")}
                >
                  Listing management guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Inventory Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track available quantities, warehouse locations, and delivery scheduling through the inventory management system.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Inventory Tracking")}
                >
                  Inventory system tutorial 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  Upload quality certificates, inspection reports, and other documentation to build trust with potential buyers.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Quality Assurance")}
                >
                  Quality documentation guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deal Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Negotiating Deals</h3>
                <p className="text-sm text-muted-foreground">
                  Receive and respond to inquiries, negotiate terms, and finalize deals through the platform's secure communication system.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Deal Negotiation")}
                >
                  Negotiation best practices 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Contract Management</h3>
                <p className="text-sm text-muted-foreground">
                  Generate, review, and sign contracts electronically through the platform. Track contract status and fulfillment progress.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Contract Management")}
                >
                  Contract system tutorial 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Payment Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Utilize the platform's secure escrow system for payments, release of funds, and financial reconciliation.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Payment Processing")}
                >
                  Escrow system guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Logistics and Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Shipping Coordination</h3>
                <p className="text-sm text-muted-foreground">
                  Arrange transportation, track shipments, and manage delivery documentation through the platform's logistics tools.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Shipping Coordination")}
                >
                  Logistics guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Documentation Management</h3>
                <p className="text-sm text-muted-foreground">
                  Generate and manage shipping documents, certificates of origin, and customs documentation.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-primary text-sm"
                  onClick={() => handleLearnMore("Documentation Management")}
                >
                  Documentation guide 
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analytics and Reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Track trading performance, market trends, and business analytics through the comprehensive reporting dashboard.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto flex items-center text-primary text-sm"
                onClick={() => handleLearnMore("Analytics and Reporting")}
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
              <AccordionTrigger>How long does trader verification take?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Wholesale trader verification typically takes 3-5 business days due to the enhanced verification requirements. Complex applications may require additional time for review.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Trader Verification Process")}
                  >
                    Verification timeline details 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the fees for wholesale trading?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>GrandDuka charges a percentage-based commission that varies by commodity type and transaction volume. Volume discounts are available for high-value transactions. Exact fee schedules are available in your trader dashboard.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Wholesale Trading Fees")}
                  >
                    View detailed fee structure 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How is quality assurance handled?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>GrandDuka offers third-party inspection services for an additional fee. Traders can also upload their own inspection reports and quality certificates. We recommend clearly specifying quality standards in all contracts.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Quality Assurance Services")}
                  >
                    Quality assurance options 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How secure is the escrow payment system?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Our escrow system is secured by bank-level encryption and follows strict financial regulations. Funds are only released when contract conditions are met and verified, providing security for both buyers and sellers.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Escrow Security")}
                  >
                    Escrow security details 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I trade internationally?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Yes, GrandDuka supports international trading. Our platform provides tools for managing international shipping documentation, customs requirements, and currency conversion.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("International Trading")}
                  >
                    International trading guide 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>How are disputes resolved?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Disputes are handled through our Trader Resolution Center. Our team of trade experts assists in mediating solutions. For unresolved disputes, we offer an arbitration service in accordance with international trade regulations.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Dispute Resolution")}
                  >
                    Dispute resolution process 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Our platform supports international wire transfers, letters of credit, and documentary collections. All payments are processed through our secure financial partners to ensure regulatory compliance.</p>
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
            
            <AccordionItem value="item-8">
              <AccordionTrigger>How do I contact trader support?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Our trader support team is available through the Trader Help Center in your dashboard. Premium traders receive dedicated account managers and priority support services.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary text-sm"
                    onClick={() => handleLearnMore("Trader Support")}
                  >
                    Contact trader support 
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

export default WholesaleUserGuide;
