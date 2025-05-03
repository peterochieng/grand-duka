import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/integrations/supabase/client';
import { useToastContext } from '@/components/ToastProvider';

interface AuthSubmitProps {
  email: string;
  password: string;
  loginType: string;
  isShopEmployee: boolean;
  shopId: string;
  isTraderTeam: boolean;
  traderId: string;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthSubmit = ({
  email,
  password,
  loginType,
  isShopEmployee,
  shopId,
  isTraderTeam,
  traderId,
  setIsLoading
}: AuthSubmitProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToastContext();

  /* disable-next-line @typescript-eslint/no-explicit-any */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      addToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      // Add a timeout to the auth request to prevent long waits
      const authPromise = supabase.auth.signInWithPassword({ email, password });

      // Set a timeout for the auth request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign-in request timed out. Please try again.')), 10000);
      });

      // Use Promise.race to either get the auth result or timeout
      const { data, error } = await Promise.race([
        authPromise,
        timeoutPromise
      ]) as any;

      if (error) {
        throw error;
      }

      if (data?.user) {
        console.log("Sign-in successful, user data:", data.user);

        // Fetch the latest user role
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_latest_user_role', { p_user: data.user.id });

        if (rpcError) {
          console.error('RPC error fetching latest role:', rpcError);
        }

        const latestRole = rpcData?.[0]?.role;

        const userRole =
          latestRole ||
          data.user.app_metadata?.role ||
          data.user.user_metadata?.user_type ||
          'buyer';

        console.log('Normalized userRole:', userRole);

        // Check if user is admin
        const isAdmin = userRole?.includes('admin');

        if (isAdmin) {
          localStorage.setItem('adminAuthenticated', 'true');
          localStorage.setItem('adminRole', userRole || '');

          addToast({ message: `Welcome back, ${userRole}`, type: 'success' });
          navigate('/admin/dashboard');
          return;
        }

        addToast({ message: 'Signed in successfully', type: 'success' });


        // Redirect based on role using navigate instead of window.location
        if (userRole === 'shop-owner' || userRole === 'shop-employee') {
          navigate('/retail/shop-dashboard');
        } else if (userRole === 'seller' || userRole === 'sole-proprietor') {
          navigate('/retail/seller-dashboard');
        } else if (userRole === 'trader' || userRole === 'broker' || userRole === 'producer') {
          navigate('/wholesale');
        } else {
          // Default for buyers
          navigate('/profile');
        }
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error || 'Failed to sign in');
    
      // Provide more specific error messages
      if (error.message?.includes('Invalid login credentials')) {
        addToast({ message: 'Invalid email or password. Please try again.', type: 'error' });
      } else if (error.message?.includes('timed out')) {
        addToast({ message: error.message, type: 'error' });
      } else if (error.message?.includes('Email not confirmed')) {
        addToast({
          message: 'Your email is not confirmed. Please check your inbox for the confirmation email.',
          type: 'error',
        });
      } else {
        console.log('Triggering error toast:', error?.message);
        addToast({ message: error?.message || 'Failed to sign in. Please try again.', type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, error };
};