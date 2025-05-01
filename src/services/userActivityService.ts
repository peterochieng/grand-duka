
import { supabase } from '@/integrations/supabase/client';
import { UserActivity, ActivityType } from '@/lib/types/userActivityTypes';
import { User } from '@/lib/types/userTypes';

// Fetch user activity logs from the database
export const getUserActivities = async (userId?: string, limit: number = 100): Promise<UserActivity[]> => {
  try {
    // For demonstration purposes, we'll generate mock activities
    // In a real implementation, this would fetch from a database table
    return generateMockActivities(userId, limit);
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return [];
  }
};

// Generate mock activities for demonstration
const generateMockActivities = (userId?: string, limit: number = 100): UserActivity[] => {
  const activities: UserActivity[] = [];
  
  // Current date for reference
  const now = new Date();
  
  // Get all users or filter for specific user
  const users = userId ? 
    [{id: userId, name: 'Sample User', role: 'buyer'}] : 
    getMockUsers();
    
  const activityTypes: ActivityType[] = [
    'login', 'logout', 'profile_update', 'password_change', 
    'failed_login', 'role_change', 'kyc_submitted', 'kyc_approved', 'kyc_rejected'
  ];
  
  // Generate activities for the past 30 days
  for (let i = 0; i < 30; i++) {
    const day = new Date(now);
    day.setDate(day.getDate() - i);
    
    // Generate random number of activities per day (1-5)
    const dailyActivityCount = Math.floor(Math.random() * 5) + 1;
    
    for (let j = 0; j < dailyActivityCount; j++) {
      // Select random user and activity type
      const user = users[Math.floor(Math.random() * users.length)];
      const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      
      // Create timestamp with random hours during the day
      const timestamp = new Date(day);
      timestamp.setHours(Math.floor(Math.random() * 24));
      timestamp.setMinutes(Math.floor(Math.random() * 60));
      
      // Generate details based on activity type
      const details = generateActivityDetails(activityType);
      
      // Add to activities array
      activities.push({
        id: `activity-${i}-${j}-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        activityType,
        timestamp: timestamp.toISOString(),
        ipAddress: generateRandomIP(),
        details
      });
    }
  }
  
  // Sort by timestamp (newest first) and limit
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

// Generate random IP address for demo purposes
const generateRandomIP = (): string => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
};

// Get mock users
const getMockUsers = () => {
  return [
    {id: 'user-001', name: 'Alex Johnson', role: 'buyer'},
    {id: 'user-005', name: 'James Wilson', role: 'shop-owner'},
    {id: 'user-009', name: 'Ahmed Hassan', role: 'trader'},
    {id: 'user-013', name: 'Mohammed Al Farsi', role: 'producer'},
    {id: 'user-014', name: 'Fatima Al Mansouri', role: 'producer'}
  ];
};

// Generate details based on activity type
const generateActivityDetails = (activityType: ActivityType): Record<string, any> => {
  switch (activityType) {
    case 'login':
      return { device: ['Mobile', 'Desktop', 'Tablet'][Math.floor(Math.random() * 3)], browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)] };
    case 'profile_update':
      return { fields: ['name', 'avatar', 'phone', 'address'][Math.floor(Math.random() * 4)] };
    case 'role_change':
      return { 
        oldRole: ['buyer', 'seller', 'trader', 'admin'][Math.floor(Math.random() * 4)], 
        newRole: ['buyer', 'seller', 'trader', 'admin'][Math.floor(Math.random() * 4)]
      };
    case 'kyc_submitted':
      return { documentTypes: ['ID', 'Passport', 'Utility Bill'][Math.floor(Math.random() * 3)] };
    case 'kyc_approved':
    case 'kyc_rejected':
      return { 
        reviewer: ['admin-001', 'admin-002'][Math.floor(Math.random() * 2)],
        reason: activityType === 'kyc_rejected' ? ['Document unclear', 'Information mismatch', 'Expired document'][Math.floor(Math.random() * 3)] : undefined
      };
    default:
      return {};
  }
};

// Log a new activity (to be used when implementing real activity logging)
export const logUserActivity = async (
  userId: string, 
  userName: string,
  activityType: ActivityType, 
  details?: Record<string, any>,
  userRole?: string
): Promise<boolean> => {
  try {
    console.log('Logging activity:', {
      userId,
      userName,
      activityType,
      details,
      userRole,
      timestamp: new Date().toISOString()
    });
    
    // In a real implementation, this would insert into a database table
    // For now, we just log to console for demonstration
    
    return true;
  } catch (error) {
    console.error('Error logging user activity:', error);
    return false;
  }
};
