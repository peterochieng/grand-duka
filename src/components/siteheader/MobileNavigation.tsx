
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SiteNavigation from '../SiteNavigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MobileNavigationProps {
  isLoggedIn: boolean;
  isMobile: boolean;
}

export const MobileNavigation = ({ isLoggedIn, isMobile }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useCurrentUser();
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  if (!isMobile) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background border-t">
          <div className="container py-6 h-full flex flex-col">
            <div className="mb-6">
              <SiteNavigation />
            </div>
            
            <div className="mt-auto space-y-4">
              {isLoggedIn ? (
                <>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      {user?.first_name || 'My Profile'}
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full justify-start" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link to="/signin" onClick={() => setIsOpen(false)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </Link>
                  </Button>
                  <Button size="sm" className="w-full justify-start" asChild>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
