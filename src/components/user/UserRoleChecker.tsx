
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

interface UserInfo {
  id: string;
  email: string;
  role?: string;
  business_name?: string;
  first_name?: string;
  last_name?: string;
}

export const UserRoleChecker = ({ username }: { username?: string }) => {
  const { user: currentUser } = useCurrentUser();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If looking for a specific user by name
        if (username) {
          // First try to find by name in profiles
          const { data: profilesByName, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .or(`first_name.ilike.%${username}%,last_name.ilike.%${username}%`);
          
          if (profileError) {
            throw profileError;
          }
          
          // If we found matching profiles
          if (profilesByName && profilesByName.length > 0) {
            // Get user ID from the profile
            const userId = profilesByName[0].id;
            
            // Get the user's role directly from user_roles table
            const { data: roleData, error: roleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', userId)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();
              
            if (roleError && roleError.code !== 'PGRST116') {
              console.error('Error fetching user role:', roleError);
            }
            
            // Get additional user data if they're a seller
            const { data: sellerData, error: sellerError } = await supabase
              .from('sellers')
              .select('*')
              .eq('id', userId)
              .maybeSingle();
            
            const foundUser: UserInfo = {
              id: userId,
              first_name: profilesByName[0].first_name || '',
              last_name: profilesByName[0].last_name || '',
              // Get email from seller data if available, otherwise use placeholder
              email: sellerData?.email || 'Email not available',
              // Use the role from user_roles table, fall back to seller/buyer if not available
              role: roleData?.role || (sellerData ? 'seller' : 'buyer'),
              business_name: sellerData?.business_name
            };
            
            setUserInfo(foundUser);
            setLoading(false);
            return;
          }
          
          // If no match by name, try sellers table
          const { data: sellers, error: sellersError } = await supabase
            .from('sellers')
            .select('*')
            .or(`business_name.ilike.%${username}%,owner_name.ilike.%${username}%`);
          
          if (sellersError) {
            throw sellersError;
          }
          
          if (sellers && sellers.length > 0) {
            // Get the seller's role from user_roles table
            const { data: roleData, error: roleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', sellers[0].id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();
              
            if (roleError && roleError.code !== 'PGRST116') {
              console.error('Error fetching seller role:', roleError);
            }
            
            setUserInfo({
              id: sellers[0].id,
              email: sellers[0].email || 'Email not available',
              role: roleData?.role || 'seller', // Use our function's result, fall back to 'seller'
              business_name: sellers[0].business_name
            });
            setLoading(false);
            return;
          }
          
          // User not found
          setError(`No user found with name containing "${username}"`);
          setLoading(false);
        } else if (currentUser) {
          // Use the currently logged in user
          // Get the current user's role from user_roles table
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
            
          if (roleError && roleError.code !== 'PGRST116') {
            console.error('Error fetching current user role:', roleError);
          }
          
          setUserInfo({
            id: currentUser.id,
            email: currentUser.email || 'Email not available',
            role: roleData?.role || currentUser.role || 'buyer',
            business_name: currentUser.business_name,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name
          });
          setLoading(false);
        } else {
          setError('No user is currently logged in');
          setLoading(false);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching user info:', err);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [username, currentUser]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Checking User Role</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Role Check Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!userInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No user information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">User ID</dt>
            <dd>{userInfo.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Name</dt>
            <dd>{userInfo.first_name || ''} {userInfo.last_name || ''}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
            <dd>{userInfo.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Role</dt>
            <dd className="capitalize font-semibold">
              {userInfo.role || 'buyer'}
              {userInfo.role?.includes('seller') || userInfo.business_name ? ' (Seller)' : ' (Buyer)'}
            </dd>
          </div>
          {userInfo.business_name && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Business Name</dt>
              <dd>{userInfo.business_name}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
};
