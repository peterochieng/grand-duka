
import { Session, User as AuthUser } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  phone: string;
  location: string;
  about: string;
  updated_at: string;
  created_at: string;
  email: string;
  kyc_status: string;
  kyc_required: boolean;
  kyc_disabled_at: string;
  kyc_disabled_by: string;
  business_name?: string;
  role?: string;
  watchlist_count?: number;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  location?: string;
  about?: string;
  business_name?: string;
}

export interface UseProfileResult {
  updateProfile: (data: UpdateProfileData) => Promise<{ success: boolean; error?: string }>;
}

export interface UseSessionResult {
  session: Session | null;
  loading: boolean;
  error: Error | null;
}
