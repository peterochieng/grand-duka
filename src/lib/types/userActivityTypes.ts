
// Define types for user activity logging
export type ActivityType = 
  | 'login' 
  | 'logout' 
  | 'profile_update' 
  | 'password_change'
  | 'failed_login'
  | 'role_change'
  | 'kyc_submitted'
  | 'kyc_approved'
  | 'kyc_rejected';

export interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  activityType: ActivityType;
  timestamp: string;
  ipAddress?: string;
  details?: Record<string, any>;
  userRole?: string;
}
