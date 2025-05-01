import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { KycStatus } from '@/lib/types/userTypes';

interface UserSearchResult {
  id: string;
  first_name: string;
  last_name: string;
}

interface PendingUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  kyc_status: KycStatus;
  updated_at: string;
}

export const useKycManagement = () => {
  const [isGlobalDialogOpen, setIsGlobalDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isGlobalKycEnabled, setIsGlobalKycEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isBypassLoading, setIsBypassLoading] = useState(false);
  const [targetUserId, setTargetUserId] = useState<string>('');
  const [targetUserEmail, setTargetUserEmail] = useState<string>('');
  const [userSearchTerm, setUserSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [bypassedUsers, setBypassedUsers] = useState<UserSearchResult[]>([]);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useCurrentUser();

  useEffect(() => {
    fetchGlobalKycSetting();
    fetchBypassedUsers();
    fetchPendingKycUsers();
  }, []);

  const fetchGlobalKycSetting = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('kyc_required')
        .limit(10);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const disabledCount = data.filter(profile => profile.kyc_required === false).length;
        setIsGlobalKycEnabled(disabledCount < data.length / 2);
      }
    } catch (error) {
      console.error('Error fetching global KYC setting:', error);
    }
  };

  const fetchBypassedUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('kyc_required', false)
        .limit(20);
      
      if (error) throw error;
      
      setBypassedUsers(data || []);
    } catch (error) {
      console.error('Error fetching bypassed users:', error);
    }
  };

  const fetchPendingKycUsers = async () => {
    try {
      setLoading(true);
      // Check if we have a profiles table with the necessary columns
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, kyc_status, updated_at')
        .eq('kyc_status', 'pending')
        .order('updated_at', { ascending: false })
        .limit(20);
      
      if (error) {
        console.error('Error fetching pending KYC users:', error);
        setPendingUsers([]);
        return;
      }
      
      // Safely process the data - ensure it's an array before mapping
      if (data && Array.isArray(data)) {
        const processedData: PendingUser[] = data.map(user => ({
          id: user.id || '',
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: `user-${user.id.substring(0, 8)}@example.com`, // mock email for now
          role: 'buyer', // default role if not available
          kyc_status: (user.kyc_status || 'pending') as KycStatus,
          updated_at: user.updated_at || new Date().toISOString()
        }));
        
        setPendingUsers(processedData);
      } else {
        setPendingUsers([]);
      }
    } catch (error) {
      console.error('Error in fetchPendingKycUsers:', error);
      setPendingUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const approveKyc = async (userId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ 
          kyc_status: 'verified' as KycStatus, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      toast.success('KYC verification approved successfully');
    } catch (error) {
      console.error('Error approving KYC:', error);
      toast.error('Failed to approve KYC verification');
    } finally {
      setLoading(false);
    }
  };

  const rejectKyc = async (userId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ 
          kyc_status: 'rejected' as KycStatus, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      toast.success('KYC verification rejected');
    } catch (error) {
      console.error('Error rejecting KYC:', error);
      toast.error('Failed to reject KYC verification');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleGlobalKyc = async () => {
    try {
      setIsLoading(true);
      
      if (!user) {
        toast.error("You must be logged in to perform this action");
        return;
      }
      
      const { data, error } = await supabase.rpc('admin_toggle_all_kyc', {
        admin_id: user.id,
        require_kyc: !isGlobalKycEnabled
      });
      
      if (error) throw error;
      
      if (data) {
        setIsGlobalKycEnabled(!isGlobalKycEnabled);
        toast.success(`KYC verification has been ${!isGlobalKycEnabled ? 'enabled' : 'disabled'} for all users`);
      } else {
        toast.error("Action failed. You may not have admin privileges.");
      }
    } catch (error: any) {
      console.error('Error toggling global KYC:', error);
      toast.error(error.message || "Failed to update KYC settings");
    } finally {
      setIsLoading(false);
      setIsGlobalDialogOpen(false);
    }
  };

  const handleSearchUser = async () => {
    if (!userSearchTerm || userSearchTerm.length < 3) {
      toast.error("Please enter at least 3 characters for search");
      return;
    }
    
    setIsSearching(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .or(`first_name.ilike.%${userSearchTerm}%,last_name.ilike.%${userSearchTerm}%`)
        .limit(5);
      
      if (error) throw error;
      
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error("Failed to search users");
    } finally {
      setIsSearching(false);
    }
  };

  const handleToggleUserKyc = async (requireKyc: boolean) => {
    if (!targetUserId) {
      toast.error("No user selected");
      return;
    }
    
    setIsBypassLoading(true);
    
    try {
      if (!user) {
        toast.error("You must be logged in to perform this action");
        return;
      }
      
      const { data, error } = await supabase.rpc('admin_toggle_user_kyc', {
        admin_id: user.id,
        target_user_id: targetUserId,
        require_kyc: requireKyc
      });
      
      if (error) throw error;
      
      if (data) {
        toast.success(`KYC requirement ${requireKyc ? 'enabled' : 'disabled'} for user`);
        if (!requireKyc) {
          const userData = { id: targetUserId, first_name: '', last_name: '' };
          setBypassedUsers(prev => [...prev, userData]);
        } else {
          setBypassedUsers(prev => prev.filter(u => u.id !== targetUserId));
        }
      } else {
        toast.error("Action failed. You may not have admin privileges.");
      }
    } catch (error: any) {
      console.error('Error toggling user KYC:', error);
      toast.error(error.message || "Failed to update user KYC setting");
    } finally {
      setIsBypassLoading(false);
      setIsUserDialogOpen(false);
      setTargetUserId('');
      setTargetUserEmail('');
    }
  };

  return {
    isGlobalDialogOpen,
    setIsGlobalDialogOpen,
    isUserDialogOpen,
    setIsUserDialogOpen,
    isGlobalKycEnabled,
    isLoading,
    isBypassLoading,
    targetUserId,
    setTargetUserId,
    targetUserEmail,
    setTargetUserEmail,
    userSearchTerm,
    setUserSearchTerm,
    searchResults,
    isSearching,
    bypassedUsers,
    pendingUsers,
    loading,
    approveKyc,
    rejectKyc,
    handleToggleGlobalKyc: async () => {
      try {
        setIsLoading(true);
        
        if (!user) {
          toast.error("You must be logged in to perform this action");
          return;
        }
        
        const { data, error } = await supabase.rpc('admin_toggle_all_kyc', {
          admin_id: user.id,
          require_kyc: !isGlobalKycEnabled
        });
        
        if (error) throw error;
        
        if (data) {
          setIsGlobalKycEnabled(!isGlobalKycEnabled);
          toast.success(`KYC verification has been ${!isGlobalKycEnabled ? 'enabled' : 'disabled'} for all users`);
        } else {
          toast.error("Action failed. You may not have admin privileges.");
        }
      } catch (error: any) {
        console.error('Error toggling global KYC:', error);
        toast.error(error.message || "Failed to update KYC settings");
      } finally {
        setIsLoading(false);
        setIsGlobalDialogOpen(false);
      }
    },
    handleSearchUser,
    handleToggleUserKyc
  };
};
