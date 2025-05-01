
import React, { useState } from 'react';
import { MoreHorizontal, Key, UserCheck, UserX, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KycStatus, UserRole } from '@/lib/types/userTypes';
import { UserActivityDialog } from './activity/UserActivityDialog';

interface UserActionsButtonProps {
  userId: string;
  kycStatus: KycStatus;
  role: UserRole;
  userName?: string;
}

export const UserActionsButton: React.FC<UserActionsButtonProps> = ({ 
  userId, 
  kycStatus, 
  role,
  userName
}) => {
  const [showActivityLog, setShowActivityLog] = useState(false);
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setShowActivityLog(true)}>
            <History className="mr-2 h-4 w-4" />
            View activity log
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Key className="mr-2 h-4 w-4" />
            Reset password
          </DropdownMenuItem>
          
          {kycStatus !== 'verified' && (
            <DropdownMenuItem>
              <UserCheck className="mr-2 h-4 w-4" />
              Verify KYC
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <UserX className="mr-2 h-4 w-4" />
            Suspend account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <UserActivityDialog 
        open={showActivityLog}
        onOpenChange={setShowActivityLog}
        userId={userId}
        userName={userName}
      />
    </>
  );
};
