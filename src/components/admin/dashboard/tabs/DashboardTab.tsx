
import React from 'react';
import { AdminStats } from "../AdminStats";
import { AdminRole } from '@/lib/types/userTypes';
import { AdminToolbar } from "../../utils/AdminToolbar";

interface DashboardTabProps {
  currentRole: AdminRole | null;
}

export const DashboardTab = ({ currentRole }: DashboardTabProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="col-span-3 lg:col-span-2">
        <AdminStats currentRole={currentRole} />
      </div>
      
      {currentRole === 'super-admin' && (
        <div className="col-span-3 lg:col-span-1">
          <AdminToolbar />
        </div>
      )}
    </div>
  );
};
