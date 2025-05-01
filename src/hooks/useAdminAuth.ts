
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AdminRole } from '@/lib/types/userTypes';

export const useAdminAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminRole>('super-admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        // First check if user has a session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return;
        }
        
        // Check if user has an admin role in the user_roles table
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .in('role', ['super-admin', 'support-admin', 'developer'] as any[])
          .single();
        
        if (roleError) {
          console.error('Error checking admin role:', roleError);
          return;
        }
        
        // User has admin role
        const userRole = roleData.role as AdminRole;
        console.log('Already logged in as admin:', userRole);
        
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminRole', userRole);
        setIsAuthenticated(true);
        
        if (userRole === 'super-admin') {
          navigate('/admin/dashboard/super');
        } else if (userRole === 'support-admin') {
          navigate('/admin/dashboard/support');
        } else if (userRole === 'developer') {
          navigate('/admin/dashboard/dev');
        } else {
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error in checkAdminAuth:', error);
      }
    };
    
    checkAdminAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First authenticate the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (!data.user) {
        throw new Error('Authentication failed');
      }
      
      // Check if user has the admin role directly from user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', role as any)
        .maybeSingle();
      
      if (roleError) {
        console.error('Error fetching role:', roleError);
        throw new Error('Failed to verify admin privileges');
      }
      
      if (!roleData) {
        throw new Error(`You do not have ${role.replace('-', ' ')} permissions`);
      }
      
      // Store authentication data
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminRole', role);
      
      console.log(`Login successful, role: ${role}, redirecting...`);
      
      if (role === 'super-admin') {
        navigate('/admin/dashboard/super');
      } else if (role === 'support-admin') {
        navigate('/admin/dashboard/support');
      } else if (role === 'developer') {
        navigate('/admin/dashboard/dev');
      } else {
        navigate('/admin/dashboard'); // Default fallback
      }
      
      toast.success(`Signed in successfully as ${role.replace('-', ' ')}`);
    } catch (error: any) {
      console.error('Admin sign in error:', error);
      toast.error(error.message || 'Authentication failed');
      
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminRole');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    showPassword,
    setShowPassword,
    isLoading,
    isAuthenticated,
    handleSubmit
  };
};
