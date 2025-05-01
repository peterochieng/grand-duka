
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trader } from '@/lib/types';
import { MessageSquare, Users, ExternalLink } from 'lucide-react';

interface TraderSidebarProps {
  trader: Trader;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

const TraderSidebar = ({ trader, isFollowing, onFollowToggle }: TraderSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact {trader.type === 'trader' ? 'Trader' : 'Broker'}
          </Button>
          
          <Button 
            className="w-full" 
            variant={isFollowing ? "outline" : "default"}
            onClick={onFollowToggle}
          >
            <Users className="mr-2 h-4 w-4" />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Monday - Friday</span>
            <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Saturday</span>
            <span className="text-muted-foreground">10:00 AM - 2:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Sunday</span>
            <span className="text-muted-foreground">Closed</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Trade License</span>
            <span className="text-green-600 font-medium">Verified</span>
          </div>
          <div className="flex items-center justify-between">
            <span>KYC Status</span>
            <span className="text-green-600 font-medium">Completed</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Member Since</span>
            <span className="text-muted-foreground">January 2023</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TraderSidebar;
