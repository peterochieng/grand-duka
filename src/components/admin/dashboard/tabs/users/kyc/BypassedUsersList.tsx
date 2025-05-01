
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

interface BypassedUsersListProps {
  users: Array<{
    id: string;
    first_name: string;
    last_name: string;
  }>;
  onRestoreKyc: (userId: string, userEmail: string) => void;
}

export const BypassedUsersList = ({
  users,
  onRestoreKyc
}: BypassedUsersListProps) => {
  if (users.length === 0) return null;

  return (
    <div className="border rounded-md mt-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 border-b">
        <h4 className="font-medium">Users with KYC Bypass</h4>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {users.map((user) => (
          <div key={user.id} className="p-3 border-b last:border-b-0 flex justify-between items-center">
            <div>
              <p>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || user.id}</p>
              <p className="text-xs text-muted-foreground">ID: {user.id}</p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onRestoreKyc(user.id, `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.id)}
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Restore KYC
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
