
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Avatar, AvatarFallback, AvatarImage 
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Edit, EyeOff, AlertCircle, LogOut, Store
} from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileHeaderProps {
  isEditingProfile: boolean;
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileHeader = ({
  isEditingProfile,
  setIsEditingProfile
}: ProfileHeaderProps) => {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();
  
  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user) return 'U';
    return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`;
  };
  
  // Format join date
  const formatJoinDate = () => {
    if (!user?.created_at) return 'New member';
    
    const date = new Date(user.created_at);
    return `Member since ${date.toLocaleDateString('en-US', { 
      month: 'long',
      year: 'numeric'
    })}`;
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("You've been signed out successfully");
      navigate('/signin');
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  // Navigate to the appropriate dashboard based on user role
  const navigateToDashboard = () => {
    if (!user?.role) return;

    console.log(user?.role);
    
    if (user.role === 'shop-owner' || user.role === 'shop-employee') {
      navigate('/retail/shop-dashboard');
    } else if (user.role === 'seller' || user.role === 'sole-proprietor') {
      navigate('/retail/seller-dashboard');
    } else if (user.role === 'trader' || user.role === 'broker' || user.role === 'producer') {
      navigate('/wholesale');
    }
  };
  
  const fullName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'Loading...';
  const username = user?.email ? user.email.split('@')[0] : 'user';
  
  // Check if KYC is required for this user
  const isKycRequired = user?.kyc_required !== false;
  
  // Check if KYC is complete
  const needsKyc = isKycRequired && (!user?.kyc_status || user?.kyc_status === 'not_started' || user?.kyc_status === 'rejected');
  
  const hasSellerRole = user?.role && ['seller', 'sole-proprietor', 'shop-owner', 'shop-employee', 'trader', 'broker', 'producer'].includes(user.role);
  
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <Avatar className="w-24 h-24 border-4 border-background">
          <AvatarImage src={user?.avatar_url || ""} alt={fullName} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-3xl font-bold">{loading ? 'Loading...' : fullName}</h1>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <span>@{username}</span>
                <span>•</span>
                <span>{formatJoinDate()}</span>
                {user?.role && <span>• {user.role}</span>}
                {user?.business_name && <span>• {user.business_name}</span>}
              </div>
            </div>
            <div className="flex flex-wrap space-x-2">
              {hasSellerRole && (
                <Button variant="outline" onClick={navigateToDashboard}>
                  <Store className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsEditingProfile(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <EyeOff className="h-4 w-4 mr-2" />
                View as Public
              </Button>
              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {needsKyc && (
        <div className="flex p-4 border rounded-lg items-center gap-4 bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-800/30">
          <div className="shrink-0">
            <AlertCircle className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-amber-800 dark:text-amber-300">Identity verification required</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Complete identity verification to unlock all trading features and higher transaction limits.
            </p>
          </div>
          <Button variant="outline" className="bg-white dark:bg-transparent" asChild>
            <Link to="/kyc-verification">Verify Identity</Link>
          </Button>
        </div>
      )}
    </>
  );
};
