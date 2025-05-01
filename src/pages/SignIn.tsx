
import { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { UserTypeSelector } from '@/components/auth/UserTypeSelector';
import { SignInForm } from '@/components/auth/SignInForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('retail');
  const [isAlreadySignedIn, setIsAlreadySignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  const checkAuthState = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      
      if (data?.session) {
        // User is already logged in
        setIsAlreadySignedIn(true);
        setCurrentUser(data.session.user);
        
        // Store info about being signed in but don't automatically redirect
        console.log("User is already signed in:", data.session.user);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      toast.error("Failed to check authentication status");
    } finally {
      setAuthCheckComplete(true);
    }
  };

  // Sign out function
  const handleSignOut = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear any auth data
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminRole');
      
      setIsAlreadySignedIn(false);
      setCurrentUser(null);
      
      toast.success("You have been signed out successfully");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error.message || "Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to appropriate page
  const handleContinue = () => {
    if (!currentUser) return;
    
    const userRole = currentUser.app_metadata?.role || currentUser.user_metadata?.user_type || 'buyer';
    
    if (userRole?.includes('admin')) {
      navigate('/admin/dashboard');
    } else if (userRole === 'shop-owner' || userRole === 'shop-employee') {
      navigate('/retail/shop-dashboard');
    } else if (userRole === 'sole-proprietor') {
      navigate('/retail/seller-dashboard');
    } else if (userRole === 'trader' || userRole === 'broker' || userRole === 'producer') {
      navigate('/wholesale');
    } else {
      // Default to profile for buyers
      navigate('/profile');
    }
  };

  // Check auth state on component mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const handleLoginTypeChange = (value: string) => {
    setLoginType(value);
  };

  // Show loading while checking auth state
  if (!authCheckComplete) {
    return (
      <AuthLayout 
        title="Checking authentication..."
        subtitle="Please wait while we verify your login status"
      >
        <div className="space-y-4">
          <Progress value={75} className="w-full" />
          <p className="text-center text-sm text-muted-foreground">
            Verifying your authentication status...
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title={isAlreadySignedIn ? "You're already signed in" : "Welcome back"}
      subtitle={isAlreadySignedIn 
        ? `Signed in as ${currentUser?.email}` 
        : "Sign in to your GrandDuka account"}
    >
      {isAlreadySignedIn ? (
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            You are currently signed in. Would you like to:
          </p>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleContinue} 
              className="w-full"
            >
              Continue to Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              className="w-full"
              disabled={isLoading}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoading ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <UserTypeSelector 
            defaultValue={loginType} 
            onValueChange={handleLoginTypeChange}
          />
          <SignInForm 
            loginType={loginType}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </AuthLayout>
  );
};

export default SignIn;
