
import React from 'react';
import { Notification } from '@/lib/types';
import { NotificationItem } from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onAcceptNomination: (notification: Notification) => void;
}

export const NotificationList = ({ notifications, onAcceptNomination }: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No notifications
      </div>
    );
  }

  return (
    <div className="max-h-[350px] overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id}
          notification={notification}
          onAcceptNomination={onAcceptNomination}
        />
      ))}
    </div>
  );
};
