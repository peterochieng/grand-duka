
import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WholesaleTraderFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const WholesaleTraderForm = ({ onSubmit, isLoading }: WholesaleTraderFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Your company name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-email">Business Email</Label>
            <Input id="business-email" type="email" placeholder="contact@yourcompany.com" required />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company-description">Company Description</Label>
          <Textarea id="company-description" placeholder="Describe your company and trading activities..." required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="commodities">Commodity Specialties</Label>
          <Input id="commodities" placeholder="e.g., Wheat, Crude Oil, Iron Ore" required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="trader-type">Trader Type</Label>
            <select id="trader-type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
              <option value="">Select type</option>
              <option value="trader">Trader</option>
              <option value="broker">Broker</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hq-location">Headquarters Location</Label>
            <Input id="hq-location" placeholder="City, Country" required />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="trade-volume">Annual Trade Volume (USD)</Label>
          <Input id="trade-volume" placeholder="e.g., 5,000,000" required />
        </div>
      </div>
      
      <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Wholesale trader accounts require enhanced verification and may take 2-3 business days for approval.
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Submit Application'
        )}
      </Button>
    </form>
  );
};

export default WholesaleTraderForm;
