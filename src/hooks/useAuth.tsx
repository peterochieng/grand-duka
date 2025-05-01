
import React from 'react';
import { useCurrentUser } from './useCurrentUser';

export const useAuth = () => {
  const { user, loading } = useCurrentUser();
  
  return {
    user,
    loading,
    isAuthenticated: !!user
  };
};
