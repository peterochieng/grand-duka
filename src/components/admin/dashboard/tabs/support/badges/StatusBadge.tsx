
import React from 'react';
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return <Badge variant="default" className="bg-blue-500">Open</Badge>;
    case "in-progress":
      return <Badge variant="default" className="bg-yellow-500">In Progress</Badge>;
    case "pending":
      return <Badge variant="default" className="bg-purple-500">Pending</Badge>;
    case "resolved":
      return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
    case "closed":
      return <Badge variant="outline">Closed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
