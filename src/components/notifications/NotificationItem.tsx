
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Clipboard, Search, Tag, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notification } from '@/lib/types';
import { formatRelativeTime } from './notificationUtils';

interface NotificationItemProps {
  notification: Notification;
  onAcceptNomination: (notification: Notification) => void;
}

export const NotificationItem = ({ notification, onAcceptNomination }: NotificationItemProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'saved_search':
        return <Search className="h-4 w-4 text-blue-500" />;
      case 'price_change':
        return <Tag className="h-4 w-4 text-green-500" />;
      case 'inspection_update':
        return <Clipboard className="h-4 w-4 text-purple-500" />;
      case 'nomination':
        return <Bell className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div 
      className={cn(
        "p-4 border-b last:border-0 hover:bg-accent/50 transition-colors",
        !notification.read && "bg-accent/20"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h5 className="font-medium">{notification.title}</h5>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(notification.createdAt)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {notification.message}
          </p>
          
          {/* Action buttons for certain notification types */}
          {notification.type === 'nomination' && !notification.read && (
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 text-xs"
                onClick={() => onAcceptNomination(notification)}
              >
                <Check className="h-3 w-3 mr-1" />
                Accept
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="h-8 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Decline
              </Button>
            </div>
          )}
          
          {/* View buttons for inspection updates and saved searches */}
          {(notification.type === 'inspection_update' || notification.type === 'saved_search') && !notification.read && (
            <div className="mt-2">
              <Button 
                size="sm" 
                variant="link"
                className="h-8 text-xs p-0"
              >
                View details
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
