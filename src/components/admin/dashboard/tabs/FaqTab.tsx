
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FaqTab = () => {
  const [tabValue, setTabValue] = useState("general");
  const { toast } = useToast();
  
  const handleLearnMore = (topic: string) => {
    toast({
      title: "Opening knowledge base",
      description: `Navigating to detailed article on ${topic}`,
    });
    // In a real app, this would navigate to a knowledge base article
  };
  
  return (
    <div className="border rounded-md p-4 space-y-6">
      <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
      <p className="text-muted-foreground mb-4">Find answers to common questions about the GrandDuka admin system.</p>
      
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the GrandDuka Admin Dashboard?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    The GrandDuka Admin Dashboard is a comprehensive management system for administering all aspects of the GrandDuka marketplace. It allows administrators to manage users, products, categories, shops, and other aspects of the platform.
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("Admin Dashboard Overview")}
                  >
                    Learn more about Dashboard features 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the different admin roles?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>GrandDuka has several admin roles with different permissions:</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li><strong>Super Admin:</strong> Has full access to all system features</li>
                    <li><strong>Support Admin:</strong> Manages customer support tickets and basic user issues</li>
                    <li><strong>User Admin:</strong> Manages user accounts and permissions</li>
                    <li><strong>Seller Admin:</strong> Manages seller accounts and related functions</li>
                    <li><strong>Shop Admin:</strong> Manages shop listings and related functions</li>
                  </ul>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("Admin Roles")}
                  >
                    View detailed role permissions 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I access different areas of the admin dashboard?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Use the navigation tabs at the top of the dashboard to access different sections. Available tabs will depend on your admin role and permissions. You can easily switch between sections by clicking on the tabs.
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("Dashboard Navigation")}
                  >
                    See dashboard navigation tutorial 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I verify a user's KYC?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    To verify a user's KYC, go to the Users tab, find the user in question, and click on the Actions button. Select "Verify KYC" from the dropdown menu. You'll be able to review their submitted documents and either approve or reject their verification.
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("KYC Verification")}
                  >
                    View step-by-step KYC verification guide 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the different user roles in GrandDuka?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>GrandDuka supports various user roles:</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li><strong>Buyer:</strong> Regular customers who purchase products</li>
                    <li><strong>Seller:</strong> Individual sellers who list products</li>
                    <li><strong>Shop Owner:</strong> Owners of retail shops on the platform</li>
                    <li><strong>Shop Employee:</strong> Staff who help manage shop inventory</li>
                    <li><strong>Trader:</strong> Wholesale traders of bulk commodities</li>
                    <li><strong>Broker:</strong> Intermediaries connecting buyers and sellers</li>
                    <li><strong>Producer:</strong> Primary producers of goods for wholesale</li>
                  </ul>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("User Roles")}
                  >
                    Learn more about user roles and permissions 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I handle team account requests?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    When a shop owner or trader requests additional user accounts, review the request from the Users tab. Click on the Actions button for the user and select "Manage Team Accounts." You can approve or reject additional accounts and set appropriate permissions for team members.
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("Team Account Management")}
                  >
                    View team account workflow guide 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="marketplace" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I review product listings?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Navigate to the Products tab to review listings. You can filter products by category, status, or seller. For suspicious or reported listings, click the Actions button and select appropriate actions like removing the listing or contacting the seller.
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("Product Review")}
                  >
                    See product moderation guidelines 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I manage categories?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    The Categories tab allows you to add, edit, or remove product categories. You can create parent categories and subcategories, set category rules and attributes, and manage category visibility on the marketplace.
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("Category Management")}
                  >
                    View category management tutorial 
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What's the process for shop approval?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    When a user applies to open a shop, you'll receive a notification. Go to the Shops tab and look for shops with "Pending" status. Review their application details, business information, and any uploaded documents. Use the Actions button to approve or reject the application with comments.
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto flex items-center text-primary"
                    onClick={() => handleLearnMore("Shop Approval Process")}
                  >
                    See full shop approval workflow 
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
