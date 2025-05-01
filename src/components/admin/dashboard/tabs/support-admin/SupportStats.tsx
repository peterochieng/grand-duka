
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SupportStatsProps {
  openCount: number;
  inProgressCount: number;
  resolvedCount: number;
}

export const SupportStats = ({ openCount, inProgressCount, resolvedCount }: SupportStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openCount}</div>
          <p className="text-xs text-muted-foreground">Awaiting assignment</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressCount}</div>
          <p className="text-xs text-muted-foreground">Currently being worked on</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">Resolved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resolvedCount}</div>
          <p className="text-xs text-muted-foreground">Completed tickets</p>
        </CardContent>
      </Card>
    </div>
  );
};
