
import { TeamMember } from '@/lib/types/userTypes';

// Mock team members for multi-user accounts
export const mockTeamMembers: TeamMember[] = [
  {
    id: 'TM-001',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2 hours ago',
    permissions: ['manage-all', 'view-analytics', 'manage-team']
  },
  {
    id: 'TM-002',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Inventory Manager',
    status: 'active',
    lastActive: '5 days ago',
    permissions: ['manage-inventory', 'view-orders']
  },
  {
    id: 'TM-003',
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Sales Agent',
    status: 'invited',
    lastActive: 'Never',
    permissions: ['view-inventory', 'manage-sales']
  }
];
