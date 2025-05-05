
import { AdminRole } from '@/lib/types/userTypes';

export const getRoleTabs = (role: AdminRole | null): string[] => {
  if (!role) return [];

  // Return accessible tabs based on admin role
  switch (role) {
    case 'super-admin':
      return [
        'dashboard',
        'products',
        'categories',
        'category-requests',
        'subcategory-requests',
        'subcategory-templates',
        'users',
        'sellers',
        'shops',
        'inspections',
        'buyers',
        'analytics',
        'permissions',
        'support',
        'dev-tasks',
        'faqs',
        'guides',
        'settings'
      ];
    case 'user-admin':
      return ['dashboard', 'users', 'permissions', 'settings'];
    case 'seller-admin':
      return ['dashboard', 'sellers', 'shops', 'settings'];
    case 'shop-admin':
      return ['dashboard', 'shops', 'products', 'categories', 'settings'];
    case 'support-admin':
      return ['dashboard', 'support', 'products', 'users', 'faqs', 'guides', 'settings'];
    case 'developer':
      return ['dashboard', 'dev-tasks', 'settings'];
    default:
      return [];
  }
};
