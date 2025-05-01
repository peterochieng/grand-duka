
import { updateUserRole } from './adminUtils';
import { updateMultipleUserRoles } from './adminUtils';
import { UserRole } from '@/lib/types/userTypes';

interface UserRoleResult {
  success: boolean;
  email: string;
  role: string;
  error?: string;
}

/**
 * Sets predefined roles for test users.
 * This function is used for development and testing purposes.
 */
export const setTestUserRoles = async (): Promise<UserRoleResult[]> => {
  const testUsers = [
    { userId: 'test-shop-owner-id', email: 'shop@shop.com', role: 'shop-owner', permissions: ['manage-inventory', 'manage-staff'] },
    { userId: 'test-shop-employee-id', email: 'shop1@shop.com', role: 'shop-employee', permissions: ['view-inventory'] },
    { userId: 'test-sole-proprietor-id', email: 'seller@seller.com', role: 'sole-proprietor', permissions: ['manage-listings'] },
    { userId: 'test-buyer-id', email: 'buyer@buyer.com', role: 'buyer', permissions: [] }
  ];

  // Process each user role update
  const results = await Promise.all(
    testUsers.map(async user => {
      try {
        await updateUserRole(user.userId, user.role as UserRole, user.permissions);
        
        return {
          success: true,
          email: user.email,
          role: user.role
        };
      } catch (error) {
        console.error(`Failed to update role for ${user.email}:`, error);
        
        return {
          success: false,
          email: user.email,
          role: user.role,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );

  return results;
};

// Assuming this is used elsewhere in the code
export { updateUserRole, updateMultipleUserRoles };
