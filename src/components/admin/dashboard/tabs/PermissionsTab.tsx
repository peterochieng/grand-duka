
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { AdminRole } from '@/lib/types/userTypes';
import { toast } from "sonner";

// Define types for permission states
type PermissionSetting = {
  id: string;
  label: string;
  enabled: boolean;
};

type RolePermissions = {
  [key: string]: PermissionSetting[];
};

export const PermissionsTab = () => {
  const [currentRole, setCurrentRole] = useState<AdminRole | null>(null);
  
  // Initialize permissions state with default values
  const [permissions, setPermissions] = useState<RolePermissions>({
    userAdmin: [
      { id: "user-perm-1", label: "Manage buyer accounts", enabled: true },
      { id: "user-perm-2", label: "Approve KYC applications", enabled: true },
      { id: "user-perm-3", label: "View seller applications", enabled: true },
      { id: "user-perm-4", label: "Edit user profiles", enabled: true }
    ],
    sellerAdmin: [
      { id: "seller-perm-1", label: "Approve new sellers", enabled: true },
      { id: "seller-perm-2", label: "Edit product listings", enabled: true },
      { id: "seller-perm-3", label: "Review seller metrics", enabled: true },
      { id: "seller-perm-4", label: "Manage product categories", enabled: true }
    ],
    shopAdmin: [
      { id: "shop-perm-1", label: "Approve new shops", enabled: true },
      { id: "shop-perm-2", label: "Review inspection reports", enabled: true },
      { id: "shop-perm-3", label: "Manage shop features", enabled: true },
      { id: "shop-perm-4", label: "Edit shop profiles", enabled: true }
    ],
    supportAdmin: [
      { id: "support-perm-1", label: "Manage support tickets", enabled: true },
      { id: "support-perm-2", label: "View user profiles", enabled: true },
      { id: "support-perm-3", label: "Respond to customer inquiries", enabled: true },
      { id: "support-perm-4", label: "Escalate issues to developers", enabled: true },
      { id: "support-perm-5", label: "Manage regular shops and users", enabled: true },
      { id: "support-perm-6", label: "View product listings and categories", enabled: true }
    ]
  });

  // Load saved permissions from localStorage if available
  useEffect(() => {
    const savedPermissions = localStorage.getItem('adminPermissions');
    if (savedPermissions) {
      try {
        setPermissions(JSON.parse(savedPermissions));
      } catch (error) {
        console.error("Error parsing saved permissions:", error);
      }
    }
    
    // Get current admin role from localStorage
    const role = localStorage.getItem('adminRole') as AdminRole | null;
    setCurrentRole(role);
  }, []);

  // Save permissions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adminPermissions', JSON.stringify(permissions));
  }, [permissions]);

  // Handler for toggling permission switches
  const handleTogglePermission = (roleKey: string, permId: string) => {
    setPermissions(prevPermissions => {
      const updatedPermissions = { ...prevPermissions };
      
      // Find and toggle the specific permission
      updatedPermissions[roleKey] = updatedPermissions[roleKey].map(perm => 
        perm.id === permId ? { ...perm, enabled: !perm.enabled } : perm
      );
      
      // Show toast notification for the change
      const permission = updatedPermissions[roleKey].find(p => p.id === permId);
      if (permission) {
        const status = permission.enabled ? 'enabled' : 'disabled';
        toast.success(`Permission "${permission.label}" ${status}`);
      }
      
      return updatedPermissions;
    });
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Role Management</h3>
      <p className="text-muted-foreground mb-4">Configure access permissions for admin roles.</p>
      
      <div className="space-y-6">
        {(currentRole === 'super-admin' || currentRole === null) && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>User Admin Permissions</CardTitle>
                <CardDescription>Configure what User Admins can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {permissions.userAdmin.map(permission => (
                    <div key={permission.id} className="flex items-center justify-between">
                      <Label htmlFor={permission.id}>{permission.label}</Label>
                      <Switch 
                        id={permission.id}
                        checked={permission.enabled}
                        onCheckedChange={() => handleTogglePermission('userAdmin', permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Seller Admin Permissions</CardTitle>
                <CardDescription>Configure what Seller Admins can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {permissions.sellerAdmin.map(permission => (
                    <div key={permission.id} className="flex items-center justify-between">
                      <Label htmlFor={permission.id}>{permission.label}</Label>
                      <Switch 
                        id={permission.id}
                        checked={permission.enabled}
                        onCheckedChange={() => handleTogglePermission('sellerAdmin', permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shop Admin Permissions</CardTitle>
                <CardDescription>Configure what Shop Admins can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {permissions.shopAdmin.map(permission => (
                    <div key={permission.id} className="flex items-center justify-between">
                      <Label htmlFor={permission.id}>{permission.label}</Label>
                      <Switch 
                        id={permission.id}
                        checked={permission.enabled}
                        onCheckedChange={() => handleTogglePermission('shopAdmin', permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Support Admin Permissions</CardTitle>
            <CardDescription>Configure what Support Admins can access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {permissions.supportAdmin.map(permission => (
                <div key={permission.id} className="flex items-center justify-between">
                  <Label htmlFor={permission.id}>{permission.label}</Label>
                  <Switch 
                    id={permission.id}
                    checked={permission.enabled}
                    onCheckedChange={() => handleTogglePermission('supportAdmin', permission.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
