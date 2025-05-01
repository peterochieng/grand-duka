
import { useEffect, useState } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AdminRole } from '@/lib/types/userTypes';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<AdminRole | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if user is authenticated with Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // No session, redirect to login
          console.log('No Supabase session, redirecting to login');
          localStorage.removeItem('adminAuthenticated');
          localStorage.removeItem('adminRole');
          setIsAuthenticated(false);
          setCurrentRole(null);
          navigate('/admin-signin');
          setIsLoading(false);
          return;
        }
        
        // Check local storage for admin authentication
        const adminAuth = localStorage.getItem('adminAuthenticated');
        const storedRole = localStorage.getItem('adminRole');
        
        console.log(`Admin auth check: ${adminAuth}, role: ${storedRole}, path: ${location.pathname}`);
        
        if (adminAuth === 'true' && storedRole) {
          // Verify user has the claimed role in the database
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', storedRole as any)
            .maybeSingle();
            
          if (roleError) {
            console.error('Error verifying admin role:', roleError);
            throw new Error('Failed to verify admin role');
          }
          
          if (!roleData) {
            // User doesn't have the claimed role
            console.log('User does not have the claimed admin role');
            throw new Error('Invalid admin role');
          }
          
          // Role verified, proceed with access
          setIsAuthenticated(true);
          setCurrentRole(storedRole as AdminRole);
          
          // Redirect to the appropriate dashboard based on path and role
          const isOnSuperPath = location.pathname.includes('/admin/dashboard/super');
          const isOnSupportPath = location.pathname.includes('/admin/dashboard/support');
          const isOnDevPath = location.pathname.includes('/admin/dashboard/dev');
          
          if ((isOnSuperPath && storedRole !== 'super-admin') || 
              (isOnSupportPath && storedRole !== 'support-admin') ||
              (isOnDevPath && storedRole !== 'developer')) {
            console.log('Role mismatch with path, redirecting...');
            // Redirect to the correct dashboard for their role
            if (storedRole === 'super-admin') {
              navigate('/admin/dashboard/super');
            } else if (storedRole === 'support-admin') {
              navigate('/admin/dashboard/support');
            } else if (storedRole === 'developer') {
              navigate('/admin/dashboard/dev');
            } else {
              // For other roles, redirect to default dashboard
              navigate('/admin/dashboard');
            }
          }
        } else {
          // Not authenticated as admin
          console.log('Not authenticated as admin, redirecting to login');
          localStorage.removeItem('adminAuthenticated');
          localStorage.removeItem('adminRole');
          setIsAuthenticated(false);
          setCurrentRole(null);
          navigate('/admin-signin');
        }
      } catch (error) {
        console.error('Admin verification error:', error);
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminRole');
        setIsAuthenticated(false);
        setCurrentRole(null);
        navigate('/admin-signin');
        toast.error('Admin verification failed. Please sign in again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, location.pathname]);

  // Handle admin logout
  const handleLogout = async () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminRole');
    setIsAuthenticated(false);
    setCurrentRole(null);
    
    // Also sign out from Supabase
    await supabase.auth.signOut();
    
    navigate('/admin-signin');
    toast.info('Logged out successfully');
  };
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>;
  }
  
  // Determine which dashboard version to show based on the current URL path
  const isDashboardSuper = location.pathname.includes('/admin/dashboard/super');
  const isDashboardSupport = location.pathname.includes('/admin/dashboard/support');
  const isDashboardDev = location.pathname.includes('/admin/dashboard/dev');
  
  console.log(`Current role: ${currentRole}, isSuper: ${isDashboardSuper}, isSupport: ${isDashboardSupport}, isDev: ${isDashboardDev}`);
  
  // Make sure the current role matches the dashboard they're trying to access
  if (isAuthenticated) {
    if (isDashboardSuper && currentRole !== 'super-admin') {
      console.log('Unauthorized super admin access, redirecting');
      toast.error('You do not have permission to access the super admin dashboard');
      return <Navigate to="/admin-signin" replace />;
    }
    
    if (isDashboardSupport && currentRole !== 'support-admin') {
      console.log('Unauthorized support admin access, redirecting');
      toast.error('You do not have permission to access the support admin dashboard');
      return <Navigate to="/admin-signin" replace />;
    }
    
    if (isDashboardDev && currentRole !== 'developer') {
      console.log('Unauthorized developer access, redirecting');
      toast.error('You do not have permission to access the developer dashboard');
      return <Navigate to="/admin-signin" replace />;
    }
    
    // If authenticated, show the appropriate dashboard
    return <AdminDashboard currentRole={currentRole} onLogout={handleLogout} />;
  }
  
  // If not authenticated, redirect to login
  console.log('Not authenticated in render, redirecting to login');
  return <Navigate to="/admin-signin" replace />;
};

export default Admin;
