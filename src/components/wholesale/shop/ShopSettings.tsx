
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ShopSettings = () => {
  const { toast } = useToast();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your shop settings have been updated",
    });
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle>Shop Information</CardTitle>
            <CardDescription>
              Update your wholesale shop details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Shop Name</Label>
                  <Input id="shop-name" defaultValue="Global Commodities Trading" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <select 
                    id="business-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="broker"
                  >
                    <option value="broker">Broker</option>
                    <option value="producer">Direct Producer</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="trader">Commodity Trader</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Shop Description</Label>
                <Textarea 
                  id="description"
                  rows={4}
                  defaultValue="Leading trader in agricultural commodities with global network and logistics capabilities."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@globalcommodities.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+971 50 123 4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Business Location</Label>
                <Input id="location" defaultValue="Dubai, UAE" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialties">Commodity Specialties</Label>
                <Input id="specialties" defaultValue="Wheat, Rice, Corn, Soybeans" />
                <p className="text-xs text-muted-foreground">Separate specialties with commas</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Visibility Settings</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="default-public">Default Items to Public</Label>
                  <p className="text-sm text-muted-foreground">
                    Set new inventory items as public by default
                  </p>
                </div>
                <Switch id="default-public" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-inquiries">Enable Public Inquiries</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to send inquiries about your listings
                  </p>
                </div>
                <Switch id="enable-inquiries" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-prices">Show Prices Publicly</Label>
                  <p className="text-sm text-muted-foreground">
                    Display pricing information on public listings
                  </p>
                </div>
                <Switch id="show-prices" defaultChecked />
              </div>
            </div>
            
            <Button type="submit" className="w-full md:w-auto">Save Settings</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ShopSettings;
