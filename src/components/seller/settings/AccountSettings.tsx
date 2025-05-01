
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { UserX, LogOut } from "lucide-react";

export const AccountSettings = () => {
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your seller profile and business information</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Business Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input 
                    id="business_name" 
                    placeholder="Your business name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business_email">Business Email</Label>
                  <Input 
                    id="business_email" 
                    placeholder="Your business email" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Your phone number" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Your business location" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about">About Your Business</Label>
                <Textarea 
                  id="about" 
                  placeholder="Tell customers about your business" 
                  rows={4}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input 
                    id="first_name" 
                    placeholder="Your first name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input 
                    id="last_name" 
                    placeholder="Your last name" 
                  />
                </div>
              </div>
            </div>
            
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="vacation_mode">Vacation Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily hide all your listings</p>
            </div>
            <Switch id="vacation_mode" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto_renew">Auto-renew Listings</Label>
              <p className="text-sm text-muted-foreground">Automatically renew expired listings</p>
            </div>
            <Switch id="auto_renew" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email alerts for new orders</p>
            </div>
            <Switch id="notifications" checked={true} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
          
          {showDeactivateConfirm ? (
            <div className="space-y-4 border rounded-md p-4 bg-red-50">
              <p className="text-sm">Are you sure you want to deactivate your account? This will hide all your listings and suspend your seller account.</p>
              <div className="flex space-x-2">
                <Button variant="destructive" size="sm">
                  Confirm Deactivation
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowDeactivateConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="destructive" className="w-full justify-start" onClick={() => setShowDeactivateConfirm(true)}>
              <UserX className="mr-2 h-4 w-4" />
              Deactivate Account
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
