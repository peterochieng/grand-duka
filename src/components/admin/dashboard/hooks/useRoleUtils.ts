
import { AdminRole } from '@/lib/types/userTypes';
import { getRoleIcon } from '../utils/roleIcons';
import { getRoleTitle } from '../utils/roleTitle';

export const useRoleUtils = (currentRole: AdminRole | null) => {
  return {
    getRoleIcon: () => getRoleIcon(currentRole),
    getRoleTitle: () => getRoleTitle(currentRole)
  };
};
