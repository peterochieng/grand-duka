
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RetailShopFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const RetailShopForm = ({ onSubmit }: RetailShopFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shop-name">Shop Name</Label>
            <Input id="shop-name" placeholder="Your shop name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Business Email</Label>
            <Input id="email" type="email" placeholder="contact@yourshop.com" required />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Shop Description</Label>
          <Textarea id="description" placeholder="Describe your shop and what you sell..." required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="categories">Main Product Categories</Label>
          <Input id="categories" placeholder="e.g., Electronics, Fashion, Home Decor" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Business Location</Label>
          <Input id="location" placeholder="City, Country" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="shop-url">Custom Shop URL</Label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
            granduka.com/shop/
          </span>
          <Input id="shop-url" className="rounded-l-none" placeholder="yourshopname" required />
        </div>
      </div>
      
      <Button type="submit" className="w-full">Submit Application</Button>
    </form>
  );
};

export default RetailShopForm;
