
import React from 'react';
import { Badge } from "@/components/ui/badge";

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="default" className="bg-orange-500">Medium</Badge>;
    case "low":
      return <Badge variant="default" className="bg-green-500">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};
