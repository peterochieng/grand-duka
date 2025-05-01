
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { cn } from '@/lib/utils';
import { useNotifications } from './useNotifications';
import { NotificationHeader } from './NotificationHeader';
import { NotificationList } from './NotificationList';

interface NotificationsPopoverProps {
  userId: string;
  className?: string;
}

export const NotificationsPopover = ({ userId, className }: NotificationsPopoverProps) => {
  const {
    notifications,
    unreadCount,
    handleMarkAllRead,
    handleAcceptNomination
  } = useNotifications(userId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className={cn("relative", className)}
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="end">
        <NotificationHeader 
          unreadCount={unreadCount} 
          onMarkAllRead={handleMarkAllRead} 
        />
        <NotificationList 
          notifications={notifications} 
          onAcceptNomination={handleAcceptNomination} 
        />
      </PopoverContent>
    </Popover>
  );
};
