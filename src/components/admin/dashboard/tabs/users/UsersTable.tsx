
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserRoleBadge } from "./UserRoleBadge";
import { KycStatusBadge } from "./KycStatusBadge";
import { UserActionsButton } from "./UserActionsButton";
import { User } from "@/lib/types/userTypes";
import { Badge } from "@/components/ui/badge";
import { Users, Clock } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface UsersTableProps {
  users: User[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const getAccessTypeBadge = (user: User) => {
    if ('accessType' in user) {
      return user.accessType === 'multi' ? (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
          <Users className="h-3 w-3 mr-1" />
          Multi-User
        </Badge>
      ) : null;
    }
    return null;
  };

  const getLastActiveStatus = (user: User) => {
    if (user.lastActive) {
      const isOnline = new Date().getTime() - new Date(user.lastActive).getTime() < 15 * 60 * 1000; // Within 15 minutes
      
      if (isOnline) {
        return (
          <Badge variant="default" className="bg-green-500">
            Online now
          </Badge>
        );
      } else {
        return (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
          </div>
        );
      }
    }
    
    return <span className="text-xs text-muted-foreground">Never</span>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Access</TableHead>
          <TableHead>KYC Status</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-mono text-xs">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <UserRoleBadge role={user.role} />
            </TableCell>
            <TableCell>
              {getAccessTypeBadge(user)}
            </TableCell>
            <TableCell>
              <KycStatusBadge status={user.kycStatus} />
            </TableCell>
            <TableCell>
              <Badge 
                variant={user.status === 'active' ? 'default' : 'outline'} 
                className={
                  user.status === 'active' ? 'bg-green-500' : 
                  user.status === 'pending' ? 'bg-amber-500' : 
                  user.status === 'suspended' ? 'bg-red-500' : 
                  'bg-slate-400'
                }
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              {getLastActiveStatus(user)}
            </TableCell>
            <TableCell>
              <UserActionsButton 
                kycStatus={user.kycStatus} 
                role={user.role} 
                userId={user.id} 
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
