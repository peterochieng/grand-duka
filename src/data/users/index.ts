
import { User, UserAccessType } from '@/lib/types/userTypes';
import { mockBuyers, mockSoleProprietors, mockShopOwners, mockShopEmployees, mockRetailUsers, getEmployeesByShopId } from './retailUsers';
import { mockTraders, mockBrokers, mockProducers, mockBulkUsers } from './bulkUsers';
import { mockTeamMembers } from './teamMembers';

// Combined array of all users
export const mockAllUsers = [
  ...mockRetailUsers,
  ...mockBulkUsers,
];

// Helper function to get user by role
export const getUsersByRole = (role: string) => {
  return mockAllUsers.filter(user => user.role === role);
};

// Helper function to get users by access type
export const getUsersByAccessType = (accessType: 'single' | 'multi') => {
  return mockAllUsers.filter(user => 
    'accessType' in user && user.accessType === accessType
  );
};

// Re-export everything
export {
  mockTeamMembers,
  mockBuyers,
  mockSoleProprietors,
  mockShopOwners,
  mockShopEmployees,
  mockRetailUsers,
  mockTraders,
  mockBrokers,
  mockProducers,
  mockBulkUsers,
  getEmployeesByShopId
};
