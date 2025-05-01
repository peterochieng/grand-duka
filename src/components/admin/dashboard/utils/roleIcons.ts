
import { UserCog, Store, Building2, ShieldCheck, Package } from 'lucide-react';
import { AdminRole } from '@/lib/types/userTypes';
import { LucideIcon } from 'lucide-react';

export const getRoleIcon = (currentRole: AdminRole | null): LucideIcon => {
  switch (currentRole) {
    case 'user-admin': return UserCog;
    case 'seller-admin': return Store;
    case 'shop-admin': return Building2;
    case 'super-admin': return ShieldCheck;
    default: return Package;
  }
};
