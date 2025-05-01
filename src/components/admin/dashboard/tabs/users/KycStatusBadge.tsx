
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { KycStatus } from "@/lib/types/userTypes";

interface KycStatusBadgeProps {
  status: KycStatus;
}

export const KycStatusBadge: React.FC<KycStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "verified":
      return <Badge variant="default" className="bg-green-500">Verified</Badge>;
    case "pending":
      return <Badge variant="default" className="bg-amber-500">Pending</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    case "not_started":
      return <Badge variant="outline" className="bg-slate-200 text-slate-700">Not Started</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
