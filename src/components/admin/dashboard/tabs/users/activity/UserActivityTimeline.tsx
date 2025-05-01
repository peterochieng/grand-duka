
import React from 'react';
import { UserActivity, ActivityType } from '@/lib/types/userActivityTypes';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  LogIn, LogOut, User, KeyRound, AlertTriangle, Shield, 
  FileCheck, CheckSquare, XSquare, Clock, Info
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UserRoleBadge } from '../UserRoleBadge';
import { UserRole } from '@/lib/types/userTypes';

interface UserActivityTimelineProps {
  activities: UserActivity[];
  maxHeight?: string;
}

export const UserActivityTimeline: React.FC<UserActivityTimelineProps> = ({
  activities,
  maxHeight = '400px'
}) => {
  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, UserActivity[]>);

  // Function to get icon based on activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-4 w-4 text-green-500" />;
      case 'logout':
        return <LogOut className="h-4 w-4 text-orange-500" />;
      case 'profile_update':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'password_change':
        return <KeyRound className="h-4 w-4 text-yellow-500" />;
      case 'failed_login':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'role_change':
        return <Shield className="h-4 w-4 text-purple-500" />;
      case 'kyc_submitted':
        return <FileCheck className="h-4 w-4 text-blue-400" />;
      case 'kyc_approved':
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case 'kyc_rejected':
        return <XSquare className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  // Function to get title based on activity type
  const getActivityTitle = (activity: UserActivity) => {
    const { activityType, userName } = activity;
    switch (activityType) {
      case 'login':
        return `${userName} logged in`;
      case 'logout':
        return `${userName} logged out`;
      case 'profile_update':
        return `${userName} updated profile`;
      case 'password_change':
        return `${userName} changed password`;
      case 'failed_login':
        return `Failed login attempt for ${userName}`;
      case 'role_change': {
        const { oldRole, newRole } = activity.details || {};
        return `${userName}'s role changed from ${oldRole} to ${newRole}`;
      }
      case 'kyc_submitted':
        return `${userName} submitted KYC documents`;
      case 'kyc_approved':
        return `${userName}'s KYC was approved`;
      case 'kyc_rejected':
        return `${userName}'s KYC was rejected`;
      default:
        return `${userName} performed an action`;
    }
  };

  // Function to get badge for activity type
  const getActivityBadge = (type: ActivityType) => {
    let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
    switch (type) {
      case 'login':
      case 'kyc_approved':
        variant = 'default'; // green
        break;
      case 'failed_login':
      case 'kyc_rejected':
        variant = 'destructive'; // red
        break;
      case 'logout':
      case 'password_change':
      case 'role_change':
      case 'kyc_submitted':
        variant = 'secondary'; // gray
        break;
      case 'profile_update':
      default:
        variant = 'outline'; // outlined
    }

    return (
      <Badge variant={variant} className="ml-2 text-xs">
        {type.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <ScrollArea className="w-full border rounded-md" style={{ maxHeight }}>
      <div className="p-4">
        {Object.keys(groupedActivities).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No activity records found
          </div>
        ) : (
          Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date} className="mb-6">
              <h3 className="font-medium text-sm mb-2 text-muted-foreground">
                {new Date(date).toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              <div className="space-y-4">
                {dayActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-2">
                    <div className="mt-1">
                      {getActivityIcon(activity.activityType)}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium">
                          {getActivityTitle(activity)}
                        </h4>
                        {getActivityBadge(activity.activityType)}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                        <span>
                          <Clock className="inline h-3 w-3 mr-1" />
                          {format(new Date(activity.timestamp), 'h:mm a')}
                        </span>
                        
                        <span className="inline-flex items-center gap-1">
                          <span className="inline-block h-1 w-1 rounded-full bg-gray-400"></span>
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </span>
                        
                        {activity.ipAddress && (
                          <span className="inline-flex items-center gap-1">
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-400"></span>
                            IP: {activity.ipAddress}
                          </span>
                        )}
                        
                        {activity.userRole && (
                          <span className="inline-flex items-center gap-1">
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-400"></span>
                            <UserRoleBadge role={activity.userRole as UserRole} />
                          </span>
                        )}
                      </div>
                      
                      {activity.details && Object.keys(activity.details).length > 0 && (
                        <div className="text-xs mt-1 bg-gray-50 dark:bg-gray-900 p-2 rounded">
                          {Object.entries(activity.details).map(([key, value]) => (
                            <div key={key} className="flex">
                              <span className="font-medium mr-1">{key}:</span>
                              <span className="text-muted-foreground">
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="mt-4" />
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};
