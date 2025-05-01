
import { AdminRole } from '@/lib/types/userTypes';

export const getRoleTitle = (currentRole: AdminRole | null): string => {
  return currentRole ? currentRole.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase()) : 'Admin';
};
