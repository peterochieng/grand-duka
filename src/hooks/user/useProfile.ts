
import { supabase } from '@/integrations/supabase/client';
import { UpdateProfileData, UseProfileResult } from './types';

export const useProfile = (): UseProfileResult => {
  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        return { success: false, error: 'No user logged in' };
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', authData.user.id);
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update profile' 
      };
    }
  };

  return { updateProfile };
};
