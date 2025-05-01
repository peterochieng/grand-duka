
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from './user/useSession';
import { useProfile } from './user/useProfile';
import { UserProfile } from './user/types';

export type { UserProfile, UpdateProfileData } from './user/types';

export const useCurrentUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const { session, loading: sessionLoading } = useSession();
  const { updateProfile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile(session.user.id);
    } else if (!sessionLoading) {
      setUser(null);
    }
  }, [session, sessionLoading]);

  const fetchUserProfile = async (userId: string) => {
    try {
      // First check if user has a profile in the profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching user profile:', profileError);
        return;
      }

      // Get auth user data
      const { data: authData } = await supabase.auth.getUser();
      
      // Fetch the user's role from the user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (roleError && roleError.code !== 'PGRST116') {
        console.error('Error fetching user role:', roleError);
      }
      
      // Get the role either from user_roles table or fallback to auth metadata
      const userRole = roleData?.role || 
                      authData.user?.app_metadata?.role || 
                      'buyer';
                      
      if (!profileData) {
        // Profile doesn't exist yet, create one with basic info
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            first_name: 'New',
            last_name: 'User',
            email: authData.user?.email || '',
          });

        if (insertError) {
          console.error('Error creating user profile:', insertError);
        }
        
        // Fetch the newly created profile
        const { data: newProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (newProfile) {
          const userProfile: UserProfile = {
            ...newProfile,
            role: userRole,
            email: authData.user?.email || '',
            created_at: new Date().toISOString(),
            avatar_url: newProfile.avatar_url || '',
            kyc_status: newProfile.kyc_status || 'not_started',
            kyc_required: newProfile.kyc_required === null ? true : newProfile.kyc_required,
            kyc_disabled_at: newProfile.kyc_disabled_at || '',
            kyc_disabled_by: newProfile.kyc_disabled_by || '',
          };
          
          setUser(userProfile);
        }
      } else {
        const userProfile: UserProfile = {
          ...profileData,
          role: userRole,
          email: authData.user?.email || '',
          created_at: new Date().toISOString(),
          avatar_url: profileData.avatar_url || '',
          kyc_status: profileData.kyc_status || 'not_started',
          kyc_required: profileData.kyc_required === null ? true : profileData.kyc_required,
          kyc_disabled_at: profileData.kyc_disabled_at || '',
          kyc_disabled_by: profileData.kyc_disabled_by || '',
        };
        
        setUser(userProfile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  return { user, loading: sessionLoading, updateProfile };
};
