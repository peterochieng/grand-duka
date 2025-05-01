
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRoleSetter } from './UserRoleSetter';

export const AdminToolbar = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Utilities</CardTitle>
        <CardDescription>Tools for system administrators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserRoleSetter />
        {/* Additional admin tools can be added here */}
      </CardContent>
    </Card>
  );
};
