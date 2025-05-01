
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Heart, 
  LogIn,
  LogOut,
  ShoppingCart, 
  User
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/useCurrentUser';
import { SearchBar } from '../SearchBar';

interface MobileMenuProps {
  isOpen: boolean;
  user: UserProfile | null;
  loading: boolean;
}

export const MobileMenu = ({ isOpen, user, loading }: MobileMenuProps) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div 
      className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden pt-20`}
    >
      <div className="container px-4 mx-auto py-6 space-y-8">
        <SearchBar isMobile />
        
        <nav className="flex flex-col space-y-6">
          <Link 
            to="/categories" 
            className="text-lg font-medium"
          >
            Categories
          </Link>
          <Link 
            to="/deals" 
            className="text-lg font-medium"
          >
            Deals
          </Link>
          <Link 
            to="/sell" 
            className="text-lg font-medium"
          >
            Sell
          </Link>
          <Link 
            to="/wishlist" 
            className="text-lg font-medium flex items-center"
          >
            <Heart className="h-5 w-5 mr-2" />
            Wishlist
          </Link>
          <Link 
            to="/notifications" 
            className="text-lg font-medium flex items-center"
          >
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </Link>
          <Link 
            to="/cart" 
            className="text-lg font-medium flex items-center"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
          </Link>
        </nav>
        
        <div className="flex flex-col space-y-4">
          {!loading && user ? (
            <>
              <Link to="/profile">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-5 w-5 mr-2" />
                  My Profile
                </Button>
              </Link>
              <Button 
                className="w-full justify-start" 
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline" className="w-full justify-start">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full justify-start">
                  <User className="h-5 w-5 mr-2" />
                  Create account
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
