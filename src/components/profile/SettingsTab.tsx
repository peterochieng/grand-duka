
import React, { useState, useEffect } from 'react';
import { 
  User, CreditCard, Settings, Bell, ShieldCheck,
  Pencil, Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SettingsTab = () => {
  const { user, updateProfile } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
    darkMode: false,
    currency: 'usd',
    language: 'en'
  });

  // Save settings to user profile
  const handleSettingChange = async (key: string, value: any) => {
    try {
      setLoading(true);
      
      // Update settings object
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
      
      // Store settings in user profile via the about field as JSON
      // In a production app, you might want a dedicated settings table
      const settingsJson = JSON.stringify({
        ...settings,
        [key]: value
      });
      
      if (user?.id) {
        const result = await updateProfile({ about: settingsJson });
        
        if (!result.success) {
          toast.error('Failed to save settings');
          console.error('Error saving settings:', result.error);
          return;
        }
        
        toast.success('Settings updated');
      }
    } catch (error) {
      console.error('Error in handleSettingChange:', error);
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };
  
  // Load settings from user profile
  useEffect(() => {
    if (user?.about) {
      try {
        // Try to parse settings from the about field
        const savedSettings = JSON.parse(user.about);
        if (savedSettings && typeof savedSettings === 'object') {
          setSettings(prev => ({
            ...prev,
            ...savedSettings
          }));
        }
      } catch (error) {
        console.error('Error parsing settings from user profile:', error);
      }
    }
  }, [user]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Account Settings
            </CardTitle>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Username</Label>
            <div className="flex items-center h-10 px-3 border rounded-md">
              {user?.first_name?.toLowerCase() || 'username'}
            </div>
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <div className="flex items-center h-10 px-3 border rounded-md">
              {user?.email || 'email@example.com'}
            </div>
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <div className="flex items-center justify-between h-10 px-3 border rounded-md">
              ••••••••••••
              <Button variant="ghost" size="sm">Change</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notification Settings
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive order updates via email</p>
            </div>
            <Switch 
              checked={settings.emailNotifications} 
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              disabled={loading}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive order updates via SMS</p>
            </div>
            <Switch 
              checked={settings.smsNotifications} 
              onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              disabled={loading}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive promotions and deals</p>
            </div>
            <Switch 
              checked={settings.marketingEmails} 
              onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment Methods
            </CardTitle>
            <Button variant="outline" size="sm">
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fetch payment methods from a real database in a production app */}
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No payment methods added yet.</p>
            <Button variant="outline" className="mt-4">Add Payment Method</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" /> Preferences
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Use dark theme</p>
            </div>
            <Switch 
              checked={settings.darkMode} 
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              disabled={loading}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Currency</Label>
              <p className="text-sm text-muted-foreground">Set your preferred currency</p>
            </div>
            <Select 
              value={settings.currency}
              onValueChange={(value) => handleSettingChange('currency', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Language</Label>
              <p className="text-sm text-muted-foreground">Set your preferred language</p>
            </div>
            <Select 
              value={settings.language}
              onValueChange={(value) => handleSettingChange('language', value)}
              disabled={loading}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
