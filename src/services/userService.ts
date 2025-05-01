
import { supabase } from '@/integrations/supabase/client';
import { User, KycStatus, UserStatus, UserRole } from '@/lib/types/userTypes';

export interface Buyer {
  id: string;
  user_id: string;
  name: string;
  last_purchase: string | null;
  total_spent: number;
  status: string;
}

export const getBuyers = async (): Promise<Buyer[]> => {
  try {
    // Get all users from profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('id', { ascending: false });
    
    if (profilesError) throw new Error(profilesError.message);
    
    if (!profiles || profiles.length === 0) {
      return [];
    }
    
    // Get all orders to calculate purchases
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*');
    
    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
    }
    
    // Transform profiles into buyers with purchase data if available
    return profiles.map(profile => {
      // Filter orders for this user
      const userOrders = orders?.filter(order => order.buyer_id === profile.id) || [];
      
      // Calculate total spent
      const totalSpent = userOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      
      // Find latest purchase date
      const lastPurchaseDate = userOrders.length > 0 
        ? userOrders.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )[0].created_at
        : null;
      
      return {
        id: `B-${profile.id.substring(0, 4)}`,
        user_id: profile.id,
        name: `${profile.first_name || 'User'} ${profile.last_name || ''}`.trim(),
        last_purchase: lastPurchaseDate,
        total_spent: totalSpent,
        status: userOrders.length > 0 ? 'Active' : 'Inactive'
      };
    });
  } catch (err) {
    console.error('Error fetching buyers:', err);
    return [];
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    console.log('Fetching users from Supabase...');
    
    // Get all users from auth.users table via admin API
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return [];
    }

    if (!authUsers || !authUsers.users || authUsers.users.length === 0) {
      console.log('No auth users found');
      return [];
    }

    console.log(`Found ${authUsers.users.length} users in auth.users`);

    // Get all profiles for additional user data
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    }

    // Create a map of profiles by user ID for quick lookups
    const profilesMap = new Map();
    if (profiles && profiles.length > 0) {
      profiles.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });
    }

    // Get roles from user_roles table
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*');

    if (rolesError) {
      console.error('Error fetching user roles:', rolesError);
    }

    // Create a map of roles by user ID
    const rolesMap = new Map();
    if (userRoles && userRoles.length > 0) {
      userRoles.forEach(role => {
        rolesMap.set(role.user_id, role.role);
      });
    }

    // Combine all data to create complete user objects
    const users = authUsers.users.map(authUser => {
      const profile = profilesMap.get(authUser.id) || {};
      const userId = authUser.id;
      
      // Get user role from user_roles table, or fall back to app_metadata
      let userRole: UserRole = 'buyer';
      
      if (rolesMap.has(userId)) {
        userRole = rolesMap.get(userId) as UserRole;
      } else if (authUser.app_metadata && authUser.app_metadata.role) {
        userRole = authUser.app_metadata.role as UserRole;
      }

      // Determine if role is an admin type for access type
      const isAdmin = userRole.includes('admin');
      
      // Determine access type based on role
      const accessType = userRole === 'shop-owner' || 
                     userRole === 'trader' || 
                     userRole === 'broker' || 
                     userRole === 'producer' ? 'multi' : 'single';
      
      // Build user name from profile or create a default
      const firstName = profile.first_name || '';
      const lastName = profile.last_name || '';
      const fullName = `${firstName} ${lastName}`.trim() || `User-${userId.substring(0, 6)}`;
      
      // Determine KYC status from profile
      const kycStatus = (profile.kyc_status || 'not_started') as KycStatus;
      
      // Determine user status - active by default or based on disabled status
      const status: UserStatus = authUser.banned ? 'suspended' : 
                             !authUser.confirmed_at ? 'pending' : 'active';
      
      return {
        id: userId,
        name: fullName,
        email: authUser.email || 'No email available',
        role: userRole,
        status: status,
        kycStatus: kycStatus,
        createdAt: authUser.created_at || new Date().toISOString(),
        lastActive: authUser.last_sign_in_at,
        accessType: accessType,
      } as User;
    });
    
    console.log(`Processed ${users.length} users`);
    return users;
  } catch (error) {
    console.error('Error in getUsers:', error);
    return [];
  }
};

export const createUser = async (userData: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}): Promise<{ success: boolean; message: string; userId?: string }> => {
  try {
    // Create the user in auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true, // Auto-confirm email
      app_metadata: { role: userData.role },
      user_metadata: {
        first_name: userData.firstName || '',
        last_name: userData.lastName || ''
      }
    });

    if (error) {
      console.error('Error creating user:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to create user'
      };
    }

    // The handle_new_user trigger should create the profile and role
    return { 
      success: true, 
      message: 'User created successfully',
      userId: data.user?.id
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Exception in createUser:', error);
    return { success: false, message: errorMessage };
  }
};
