import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/hooks/user/useSession';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // If no session and no fallback, then redirect immediately.
    if (!session && !fallback) {
      toast.error('Please sign in to continue');
      navigate('/signup');
    }
  }, [session, fallback, navigate]);

  if (!session) {
    // If a fallback is provided, render it.
    return fallback || null;
  }

  return <>{children}</>;
};