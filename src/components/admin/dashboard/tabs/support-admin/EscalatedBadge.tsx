
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const EscalatedBadge = () => {
  return (
    <Badge variant="destructive" className="gap-1">
      <AlertTriangle className="h-3 w-3" />
      Escalated to Dev Team
    </Badge>
  );
};
