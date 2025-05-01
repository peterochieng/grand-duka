
import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSignInForm } from './AdminSignInForm';
import { AdminRole } from '@/lib/types/userTypes';

interface AdminSignInCardProps {
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

export const AdminSignInCard: React.FC<AdminSignInCardProps> = (props) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
        <CardDescription>
          Secure login for GrandDuka administration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AdminSignInForm {...props} />
      </CardContent>
    </Card>
  );
};
