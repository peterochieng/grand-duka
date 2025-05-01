
import { Upload, Clipboard, Users, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useInspection } from './InspectionContext';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';

interface InspectionActionsProps {
  userRole?: 'seller' | 'admin' | 'buyer' | 'guest';
  productId?: string;
}

export const InspectionActions = ({ 
  userRole = 'guest', 
  productId 
}: InspectionActionsProps) => {
  const { toast } = useToast();
  const [isRequesting, setIsRequesting] = useState(false);
  const { isUpdating } = useInspection();
  
  // Track active viewers using real-time updates
  const [activeViewers, setActiveViewers] = useState(1);
  
  // Subscribe to real-time updates for viewer count
  const { isConnected } = useRealTimeUpdates<{viewerCount: number}>({
    resourceId: productId || 'default-product',
    resourceType: 'inspection',
    onUpdate: (data) => {
      if (data && 'viewerCount' in data) {
        setActiveViewers(data.viewerCount);
      }
    }
  });

  // Simulate adding a viewer when the component mounts
  useEffect(() => {
    // In a real app, you would call an API to register this viewer
    setActiveViewers(prev => Math.min(prev + 1, 10)); // Cap at 10 for demo
    
    // Clean up when component unmounts
    return () => {
      // In a real app, you would call an API to unregister this viewer
    };
  }, []);

  const handleRequestInspection = () => {
    setIsRequesting(true);
    
    // Simulate API request with timeout
    setTimeout(() => {
      setIsRequesting(false);
      
      toast({
        title: "Inspection Requested",
        description: "The seller has been notified of your inspection request.",
        variant: "default",
      });
    }, 1000);
  };

  const handleWatchInspection = () => {
    toast({
      title: "Inspection Added to Watchlist",
      description: "You'll be notified of any updates to this inspection.",
    });
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex items-center gap-4">
        {/* Show active viewers indicator */}
        <Badge variant="outline" className="gap-1 py-1">
          <Users className="h-3 w-3" />
          <span>{activeViewers} viewing now</span>
        </Badge>
        
        {/* Only show Upload button to sellers, admins or employees */}
        {(userRole === 'seller' || userRole === 'admin') && (
          <Button variant="outline" className="gap-2" disabled={isUpdating}>
            <Upload className="h-4 w-4" />
            Upload New Inspection
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        {/* Add Watch button for all users */}
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={handleWatchInspection}
        >
          <Eye className="h-4 w-4" />
          Watch
        </Button>
        
        {/* Request Inspection button for all users except guests */}
        {userRole !== 'guest' ? (
          <Button 
            variant="secondary" 
            className="gap-2"
            onClick={handleRequestInspection}
            disabled={isRequesting || isUpdating}
          >
            <Clipboard className="h-4 w-4" />
            {isRequesting ? "Sending Request..." : "Request Inspection"}
          </Button>
        ) : (
          <Button 
            variant="secondary" 
            className="gap-2"
            onClick={() => {
              toast({
                title: "Authentication Required",
                description: "Please sign in to request an inspection.",
                variant: "destructive",
              });
            }}
          >
            <Clipboard className="h-4 w-4" />
            Request Inspection
          </Button>
        )}
      </div>
    </div>
  );
};
