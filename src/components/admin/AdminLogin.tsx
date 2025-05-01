
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminRole } from '@/lib/types/userTypes';
import { Lock, Package } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (username: string, password: string, role: AdminRole) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminRole>('super-admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password, role);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="user-admin">User Admin</SelectItem>
                  <SelectItem value="seller-admin">Seller Admin</SelectItem>
                  <SelectItem value="shop-admin">Shop Admin</SelectItem>
                  <SelectItem value="support-admin">Support Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Access Admin Dashboard
            </Button>
          </form>
          
          <div className="mt-4 text-xs text-center text-muted-foreground">
            <p className="mb-1">For demo purposes, use the following credentials:</p>
            <p><strong>Super Admin:</strong> superadmin / super123</p>
            <p><strong>User Admin:</strong> useradmin / user123</p>
            <p><strong>Seller Admin:</strong> selleradmin / seller123</p>
            <p><strong>Shop Admin:</strong> shopadmin / shop123</p>
            <p><strong>Support Admin:</strong> supportadmin / support123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
