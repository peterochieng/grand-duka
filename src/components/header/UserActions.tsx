
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
import { NotificationsPopover } from '@/components/notifications/NotificationsPopover';

interface UserActionsProps {
  user: UserProfile | null;
  loading: boolean;
}

export const UserActions = ({ user, loading }: UserActionsProps) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex items-center space-x-4">
      {!loading && user && (
        <NotificationsPopover userId={user.id} />
      )}
      <Button variant="ghost" size="icon" className="rounded-full">
        <Heart className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <ShoppingCart className="h-5 w-5" />
      </Button>
      
      {!loading && user ? (
        <Button 
          variant="outline" 
          onClick={handleSignOut} 
          size="sm" 
          className="rounded-full"
        >
          <User className="h-4 w-4 mr-2" />
          <span>{user.first_name || 'Profile'}</span>
        </Button>
      ) : (
        <Link to="/signin">
          <Button variant="outline" size="sm" className="rounded-full">
            <LogIn className="h-4 w-4 mr-2" />
            <span>Sign in</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
