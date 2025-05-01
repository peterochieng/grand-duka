
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoleSelector } from './RoleSelector';
import { PasswordField } from './PasswordField';
import { AdminRole } from '@/lib/types/userTypes';

interface AdminSignInFormProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  role: AdminRole;
  setRole: (role: AdminRole) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const AdminSignInForm: React.FC<AdminSignInFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  role,
  setRole,
  showPassword,
  setShowPassword,
  isLoading,
  handleSubmit
}) => {
  const navigate = useNavigate();

  const handleReturnToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RoleSelector role={role} setRole={setRole} />
      
      <div className="space-y-2">
        <Label htmlFor="username">Email</Label>
        <Input 
          id="username"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter email"
        />
      </div>
      
      <PasswordField 
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Authenticating...' : 'Access Admin Dashboard'}
      </Button>

      <div className="mt-6 text-center">
        <div className="text-xs text-muted-foreground">
          <Button variant="link" size="sm" onClick={handleReturnToHome}>
            Return to GrandDuka
          </Button>
        </div>
      </div>
    </form>
  );
};
