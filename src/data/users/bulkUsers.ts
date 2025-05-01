
import { 
  Trader, 
  Broker, 
  Producer 
} from '@/lib/types/userTypes';
import { mockTeamMembers } from './teamMembers';

// Mock bulk trading users
export const mockTraders: Trader[] = [
  {
    id: 'user-009',
    name: 'Ahmed Hassan',
    email: 'ahmed@globalcommodities.com',
    phone: '+971 54 456 7890',
    role: 'trader',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-02-08T11:15:00Z',
    lastActive: '2023-08-21T10:30:00Z',
    businessName: 'Global Commodities Trading',
    commoditiesCount: 27,
    accessType: 'multi',
    teamMembers: mockTeamMembers,
    specialties: ['Grains', 'Agricultural Products', 'Metals']
  },
  {
    id: 'user-010',
    name: 'Robert Williams',
    email: 'robert@bulkgrains.com',
    phone: '+971 54 654 3210',
    role: 'trader',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-03-10T09:45:00Z',
    lastActive: '2023-08-20T13:15:00Z',
    businessName: 'Bulk Grains Supply',
    commoditiesCount: 15,
    accessType: 'single',
    specialties: ['Wheat', 'Rice', 'Corn']
  }
];

export const mockBrokers: Broker[] = [
  {
    id: 'user-011',
    name: 'Sarah Williams',
    email: 'sarah@tradebroker.com',
    phone: '+971 52 345 6789',
    role: 'broker',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-04-19T16:45:00Z',
    lastActive: '2023-08-21T11:30:00Z',
    businessName: 'International Trade Brokers',
    clientsCount: 24,
    dealsCount: 86,
    accessType: 'multi',
    teamMembers: mockTeamMembers.slice(0, 2),
    specialties: ['Agricultural Products', 'Energy Commodities']
  },
  {
    id: 'user-012',
    name: 'Daniel Kim',
    email: 'daniel@commoditybroker.com',
    phone: '+971 55 789 0123',
    role: 'broker',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-05-15T13:20:00Z',
    lastActive: '2023-08-19T15:45:00Z',
    businessName: 'Commodity Brokerage Services',
    clientsCount: 18,
    dealsCount: 52,
    accessType: 'single',
    specialties: ['Petroleum Products', 'Natural Gas']
  }
];

export const mockProducers: Producer[] = [
  {
    id: 'user-013',
    name: 'Mohammed Al Farsi',
    email: 'mohammed@energysolutions.com',
    phone: '+971 56 789 0123',
    role: 'producer',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-01-05T10:20:00Z',
    lastActive: '2023-08-21T09:45:00Z',
    businessName: 'Energy Solutions Ltd',
    productsCount: 18,
    productionCapacity: '500,000 barrels per month',
    accessType: 'multi',
    teamMembers: mockTeamMembers,
    productTypes: ['Crude Oil', 'Natural Gas', 'Petroleum Derivatives']
  },
  {
    id: 'user-014',
    name: 'Fatima Al Mansouri',
    email: 'fatima@organicfarms.com',
    phone: '+971 50 111 2222',
    role: 'producer',
    status: 'active',
    kycStatus: 'verified',
    createdAt: '2023-03-22T14:30:00Z',
    lastActive: '2023-08-20T10:15:00Z',
    businessName: 'Organic Farms Cooperative',
    productsCount: 12,
    productionCapacity: '200 tons per month',
    accessType: 'single',
    productTypes: ['Organic Vegetables', 'Dates', 'Honey']
  }
];

// Combined array of all bulk users
export const mockBulkUsers = [
  ...mockTraders,
  ...mockBrokers,
  ...mockProducers,
];
