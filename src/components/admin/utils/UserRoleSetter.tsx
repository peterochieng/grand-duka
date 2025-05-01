
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { setTestUserRoles } from '@/utils/setUserRoles';
import { toast } from 'sonner';

export const UserRoleSetter = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSetRoles = async () => {
    setIsLoading(true);
    try {
      const results = await setTestUserRoles();
      
      // Count successes and failures
      const successCount = results.filter(r => r.success).length;
      const failureCount = results.length - successCount;
      
      if (failureCount === 0) {
        toast.success(`Successfully updated roles for ${successCount} users`);
      } else {
        toast.warning(`Updated ${successCount} users, but ${failureCount} failed`);
        
        // Show detailed errors for failures
        results.filter(r => !r.success).forEach(failure => {
          toast.error(`Failed to update ${failure.email}: ${failure.error}`);
        });
      }
    } catch (error) {
      console.error('Error setting user roles:', error);
      toast.error('Failed to set user roles');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-2">Test User Roles</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Set predefined roles for test users:
        <ul className="mt-2 ml-4 list-disc">
          <li>shop@shop.com → shop-owner</li>
          <li>shop1@shop.com → shop-employee</li>
          <li>seller@seller.com → sole-proprietor</li>
          <li>buyer@buyer.com → buyer</li>
        </ul>
      </p>
      <Button 
        onClick={handleSetRoles} 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Setting Roles...' : 'Set Test User Roles'}
      </Button>
    </div>
  );
};
