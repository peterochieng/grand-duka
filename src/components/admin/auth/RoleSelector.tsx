
import React from 'react';
import { Shield, Lock, Code } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminRole } from '@/lib/types/userTypes';

interface RoleSelectorProps {
  role: AdminRole;
  setRole: (role: AdminRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ role, setRole }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="role">Admin Role</Label>
      <Select 
        value={role} 
        onValueChange={(value) => setRole(value as AdminRole)}
      >
        <SelectTrigger id="role">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="super-admin">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-red-500" />
              <span>Super Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="support-admin">
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2 text-blue-500" />
              <span>Support Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="developer">
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-2 text-green-500" />
              <span>Developer</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
