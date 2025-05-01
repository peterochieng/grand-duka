
import { supabase } from '@/integrations/supabase/client';
import { AdminRole, UserRole } from '@/lib/types/userTypes';

export const updateMultipleUserRoles = async (
  userIds: string[], 
  role: AdminRole,
  permissions: any[]
) => {
  // In a real app, this would call an API to update multiple users' roles
  console.log(`Updating ${userIds.length} users to role ${role} with permissions:`, permissions);
  
  // For actual implementation, we'd use supabase to update user_roles table
  // Example (commented out as this is a mock):
  /*
  for (const userId of userIds) {
    await supabase
      .from('user_roles')
      .upsert({ 
        user_id: userId, 
        role: role,
        // Add other fields as needed
      });
  }
  */
  
  return Promise.resolve({ success: true });
};

export const updateUserRole = async (
  userId: string,
  role: UserRole,
  permissions: any[] = []
) => {
  // In a real app, this would call an API to update a single user's role
  console.log(`Updating user ${userId} to role ${role} with permissions:`, permissions);
  
  // For actual implementation, we'd use supabase to update user_roles table
  // Example:
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .upsert({ 
        user_id: userId, 
        role: role as any,
        // Add other fields as needed
      });
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error };
  }
};

export const checkUserHasAdminRole = async (userId: string, roleToCheck: AdminRole) => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', roleToCheck as any)
      .maybeSingle();
      
    if (error) throw error;
    return !!data; // Return true if data exists, false otherwise
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

export const getUserAdminRoles = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .in('role', ['super-admin', 'user-admin', 'seller-admin', 'shop-admin', 'support-admin', 'developer'] as any[]);
      
    if (error) throw error;
    return data?.map(r => r.role) || [];
  } catch (error) {
    console.error('Error getting user admin roles:', error);
    return [];
  }
};
