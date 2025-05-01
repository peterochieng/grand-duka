
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const SupportAdminPermissions = () => {
  const [canReviewProducts, setCanReviewProducts] = useState(true);
  const [canManageKyc, setCanManageKyc] = useState(true);
  const [canManageSignups, setCanManageSignups] = useState(true);

  const handleToggleReviewAccess = async (enabled: boolean) => {
    setCanReviewProducts(enabled);
    toast.success(
      `Product review access ${enabled ? 'enabled' : 'disabled'} for support admins`
    );
  };

  const handleToggleKycAccess = async (enabled: boolean) => {
    setCanManageKyc(enabled);
    toast.success(
      `KYC management access ${enabled ? 'enabled' : 'disabled'} for support admins`
    );
  };

  const handleToggleSignupAccess = async (enabled: boolean) => {
    setCanManageSignups(enabled);
    toast.success(
      `User signup approval access ${enabled ? 'enabled' : 'disabled'} for support admins`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Admin Permissions</CardTitle>
        <CardDescription>
          Manage access levels and permissions for support administrators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="review-products">Product Review Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow support admins to review and approve/reject product listings
              </p>
            </div>
            <Switch
              id="review-products"
              checked={canReviewProducts}
              onCheckedChange={handleToggleReviewAccess}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="manage-kyc">KYC Management Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow support admins to manage user KYC verifications
              </p>
            </div>
            <Switch
              id="manage-kyc"
              checked={canManageKyc}
              onCheckedChange={handleToggleKycAccess}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="manage-signups">User Signup Approval Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow support admins to review and approve new user registrations
              </p>
            </div>
            <Switch
              id="manage-signups"
              checked={canManageSignups}
              onCheckedChange={handleToggleSignupAccess}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
