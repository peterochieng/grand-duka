
import React from 'react';
import { Button } from "@/components/ui/button";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export const NotificationHeader = ({ unreadCount, onMarkAllRead }: NotificationHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h4 className="font-medium">Notifications</h4>
      {unreadCount > 0 && (
        <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
          Mark all read
        </Button>
      )}
    </div>
  );
};
