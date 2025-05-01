
import React, { useEffect, useState } from 'react';
import { UserActivityTimeline } from './UserActivityTimeline';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getUserActivities } from '@/services/userActivityService';
import { UserActivity } from '@/lib/types/userActivityTypes';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UserActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  userName?: string;
}

export const UserActivityDialog: React.FC<UserActivityDialogProps> = ({
  open,
  onOpenChange,
  userId,
  userName
}) => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (open) {
      setLoading(true);
      
      // Fetch user activities
      getUserActivities(userId)
        .then(data => {
          setActivities(data);
        })
        .catch(error => {
          console.error('Error fetching user activities:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, userId]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {userId 
              ? `Activity Log for ${userName || userId}` 
              : 'User Activity Log'}
          </DialogTitle>
          <DialogDescription>
            {userId 
              ? 'View recent activity for this user' 
              : 'View recent activities across all users'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <UserActivityTimeline 
              activities={activities} 
              maxHeight="500px"
            />
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
