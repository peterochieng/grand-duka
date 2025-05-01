
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

  if (!session) {
    toast.error('Please sign in to continue');
    navigate('/signup');
    return fallback || null;
  }

  return <>{children}</>;
};
