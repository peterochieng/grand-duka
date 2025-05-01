
import { 
  Buyer, 
  SoleProprietor, 
  ShopOwner, 
  ShopEmployee 
} from '@/lib/types/userTypes';
import { mockTeamMembers } from './teamMembers';

// Mock retail users
export const mockBuyers: Buyer[] = [
  {
    id: 'user-001',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+971 55 123 4567',
    role: 'buyer',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-01-15T09:00:00Z',
    lastActive: '2023-08-20T14:30:00Z',
    wishlistCount: 12,
    purchaseCount: 8,
    accessType: 'single'
  },
  {
    id: 'user-002',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '+971 50 987 6543',
    role: 'buyer',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-02-22T10:15:00Z',
    lastActive: '2023-08-19T11:45:00Z',
    wishlistCount: 5,
    purchaseCount: 3,
    accessType: 'single'
  }
];

export const mockSoleProprietors: SoleProprietor[] = [
  {
    id: 'user-003',
    name: 'Omar Abdullah',
    email: 'omar@example.com',
    phone: '+971 54 456 7890',
    role: 'sole-proprietor',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-03-10T08:30:00Z',
    lastActive: '2023-08-21T09:20:00Z',
    businessName: 'Omar\'s Antiques',
    productsCount: 45,
    rating: 4.7,
    accessType: 'single'
  },
  {
    id: 'user-004',
    name: 'Lisa Chen',
    email: 'lisa@example.com',
    phone: '+971 52 765 4321',
    role: 'sole-proprietor',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-04-05T14:45:00Z',
    lastActive: '2023-08-18T16:30:00Z',
    businessName: 'Handmade Crafts by Lisa',
    productsCount: 32,
    rating: 4.9,
    accessType: 'single'
  }
];

export const mockShopOwners: ShopOwner[] = [
  {
    id: 'user-005',
    name: 'James Wilson',
    email: 'james@techhub.com',
    phone: '+971 55 123 4567',
    role: 'shop-owner',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-01-12T09:00:00Z',
    lastActive: '2023-08-21T15:30:00Z',
    shopId: 'shop1',
    shopName: 'TechHub Electronics',
    employeeCount: 3,
    productsCount: 324,
    accessType: 'multi'
  },
  {
    id: 'user-006',
    name: 'Emma Johnson',
    email: 'emma@fashionforward.com',
    phone: '+971 50 987 6543',
    role: 'shop-owner',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-02-24T14:30:00Z',
    lastActive: '2023-08-20T11:15:00Z',
    shopId: 'shop2',
    shopName: 'Fashion Forward',
    employeeCount: 5,
    productsCount: 567,
    accessType: 'multi'
  }
];

export const mockShopEmployees: ShopEmployee[] = [
  {
    id: 'user-007',
    name: 'Michael Brown',
    email: 'michael@techhub.com',
    phone: '+971 55 876 5432',
    role: 'shop-employee',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-03-05T10:20:00Z',
    lastActive: '2023-08-21T14:45:00Z',
    shopId: 'shop1',
    shopName: 'TechHub Electronics',
    permissions: ['manage-inventory', 'view-orders'],
    addedBy: 'user-005'
  },
  {
    id: 'user-008',
    name: 'Sophia Martinez',
    email: 'sophia@fashionforward.com',
    phone: '+971 52 345 6789',
    role: 'shop-employee',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-04-10T11:30:00Z',
    lastActive: '2023-08-19T16:20:00Z',
    shopId: 'shop2',
    shopName: 'Fashion Forward',
    permissions: ['manage-sales', 'view-inventory', 'process-returns'],
    addedBy: 'user-006'
  }
];

// Combined array of all retail users
export const mockRetailUsers = [
  ...mockBuyers,
  ...mockSoleProprietors,
  ...mockShopOwners,
  ...mockShopEmployees,
];

// Helper function to get shop employees by shopId
export const getEmployeesByShopId = (shopId: string) => {
  return mockShopEmployees.filter(employee => employee.shopId === shopId);
};
