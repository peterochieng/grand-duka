
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogIn, UserCircle, Heart, LogOut, Lock } from "lucide-react";
import { NotificationsPopover } from '../notifications/NotificationsPopover';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { set } from 'date-fns';

interface UserActionsSectionProps {
  isLoggedIn: boolean;
  userId: string;
}

export const UserActionsSection = ({ isLoggedIn, userId }: UserActionsSectionProps) => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      setTimeout(() => {
        navigate('/signin');}, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <>
          {/* Notifications */}
          <NotificationsPopover userId={userId} />
          
          {/* Favorites/Watchlist quick access */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/profile?tab=favorites">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {user?.watchlist_count || 0}
              </span>
            </Link>
          </Button>
          
          {/* User account button */}
          <Button variant="outline" size="sm" asChild>
            <Link to="/profile">
              <UserCircle className="mr-2 h-4 w-4" />
              {user?.first_name || 'Profile'}
            </Link>
          </Button>
          
          {/* Sign out button */}
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to="/signin">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">
              <UserCircle className="mr-2 h-4 w-4" />
              Sign up
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/admin/signin">
              <Lock className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};
