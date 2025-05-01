
import { useState, useEffect, useCallback } from 'react';
import { User } from "@/lib/types/userTypes";
import { supabase } from '@/integrations/supabase/client';
import { getUsers } from '@/services/userService';
import { AdminRole } from '@/lib/types/userTypes';
import { UserSearchValues } from '../forms/userFormSchema';
import { isAfter, isBefore, isWithinInterval, parseISO } from 'date-fns';

export const useUsersData = (initialTab: string = 'all') => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState<AdminRole | null>(null);
  const [activeFilters, setActiveFilters] = useState<UserSearchValues>({});
  const [error, setError] = useState<string | null>(null);

  // Fetch users from Supabase database
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching users data...');
        const fetchedUsers = await getUsers();
        
        if (fetchedUsers.length === 0) {
          console.warn('No users were returned from the API');
        } else {
          console.log(`Successfully fetched ${fetchedUsers.length} users`);
        }
        
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error('Error in fetchUsers:', error);
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    
    // Get current admin role from localStorage
    const role = localStorage.getItem('adminRole') as AdminRole | null;
    setCurrentRole(role);
  }, []);

  // Setup real-time updates for user authentication status
  useEffect(() => {
    // Subscribe to auth changes to track active users
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user.id);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Update the user's last active time
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === session?.user.id 
              ? { ...user, lastActive: new Date().toISOString() }
              : user
          )
        );
      }
    });

    // Refresh the user list every minute to keep online status accurate
    const intervalId = setInterval(async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      applyAllFilters(fetchedUsers);
    }, 60000); // Update every minute
    
    return () => {
      clearInterval(intervalId);
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Apply all filters (search, tab, role restrictions, advanced filters)
  const applyAllFilters = useCallback((userList: User[]) => {
    const filtered = userList.filter(user => {
      // Basic search
      const matchesSearch = !searchQuery.trim() || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.id.toLowerCase().includes(searchQuery.toLowerCase());
          
      // Admin role restrictions
      const isAllowedForRole = currentRole !== 'support-admin' || 
        (user.role !== 'super-admin' && user.role !== 'support-admin');
          
      // Tab filtering
      let matchesTab = true;
      switch (activeTab) {
        case 'retail':
          matchesTab = ['buyer', 'sole-proprietor', 'shop-owner', 'shop-employee'].includes(user.role);
          break;
        case 'bulk':
          matchesTab = ['trader', 'broker', 'producer'].includes(user.role);
          break;
        case 'admin':
          matchesTab = ['super-admin', 'support-admin', 'user-admin', 'seller-admin', 'shop-admin'].includes(user.role);
          break;
      }
      
      // Advanced filters
      let matchesAdvancedFilters = true;
      
      // Role filter
      if (activeFilters.role && user.role !== activeFilters.role) {
        matchesAdvancedFilters = false;
      }
      
      // Date range filter
      if (activeFilters.dateRange) {
        const { from, to } = activeFilters.dateRange;
        
        if (user.lastActive) {
          const lastActiveDate = parseISO(user.lastActive);
          
          if (from && to) {
            // Between from and to
            matchesAdvancedFilters = matchesAdvancedFilters && 
              isWithinInterval(lastActiveDate, { start: from, end: to });
          } else if (from) {
            // After from
            matchesAdvancedFilters = matchesAdvancedFilters && 
              isAfter(lastActiveDate, from);
          } else if (to) {
            // Before to
            matchesAdvancedFilters = matchesAdvancedFilters && 
              isBefore(lastActiveDate, to);
          }
        } else if (from || to) {
          // If user has no lastActive but date filters are applied
          matchesAdvancedFilters = false;
        }
      }
      
      // Online status filter
      if (activeFilters.isOnline) {
        const isOnline = user.lastActive ? 
          (new Date().getTime() - new Date(user.lastActive).getTime() < 15 * 60 * 1000) : 
          false;
        matchesAdvancedFilters = matchesAdvancedFilters && isOnline;
      }
      
      return matchesSearch && isAllowedForRole && matchesTab && matchesAdvancedFilters;
    });
    
    setFilteredUsers(filtered);
  }, [searchQuery, activeTab, currentRole, activeFilters]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    applyAllFilters(users);
  }, [users, searchQuery, activeTab, currentRole, activeFilters, applyAllFilters]);

  // Handle advanced search
  const handleAdvancedSearch = (filters: UserSearchValues) => {
    setActiveFilters(filters);
    
    // If there's a query in the advanced search, update the basic search input
    if (filters.query !== undefined) {
      setSearchQuery(filters.query);
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Handle user created event
  const handleUserCreated = async () => {
    setLoading(true);
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
    applyAllFilters(fetchedUsers);
    setLoading(false);
  };

  return {
    users,
    filteredUsers,
    loading,
    searchQuery,
    setSearchQuery,
    activeTab,
    handleTabChange,
    handleUserCreated,
    handleAdvancedSearch,
    activeFilters,
    currentRole,
    error
  };
};
