
import { useState, useEffect } from 'react';
import { Notification } from '@/lib/types';
import { getUserNotifications } from '@/lib/notifications';
import { toast } from '@/hooks/use-toast';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Subscribe to real-time updates for new notifications
  const { lastUpdate } = useRealTimeUpdates<Notification>({
    resourceId: userId,
    resourceType: "user",
    onUpdate: (newNotification) => {
      if (newNotification) {
        // Add the new notification to the list
        setNotifications(prev => [newNotification as Notification, ...prev]);
        
        // Show a toast for the new notification
        toast({
          title: newNotification.title,
          description: newNotification.message,
        });
      }
    }
  });
  
  // Fetch notifications on component mount
  useEffect(() => {
    const userNotifications = getUserNotifications(userId);
    setNotifications(userNotifications);
  }, [userId]);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    
    toast({
      title: "All caught up!",
      description: "All notifications marked as read.",
    });
  };

  const handleAcceptNomination = (notification: Notification) => {
    toast({
      title: "Nomination Accepted",
      description: `You'll now receive updates from ${notification.message.split(' has ')[0]}.`,
    });
    
    // Mark this notification as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
  };

  return {
    notifications,
    unreadCount,
    handleMarkAllRead,
    handleAcceptNomination
  };
};
