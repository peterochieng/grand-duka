
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const SupportAdminStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Team Performance</CardTitle>
        <CardDescription>
          Monitor support admin activity and resolution rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Ticket Resolution Rate</span>
              <span className="text-sm text-muted-foreground">85%</span>
            </div>
            <Progress value={85} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Response Time</span>
              <span className="text-sm text-muted-foreground">2.5 hours</span>
            </div>
            <Progress value={75} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">KYC Approval Rate</span>
              <span className="text-sm text-muted-foreground">94%</span>
            </div>
            <Progress value={94} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New User Approval Rate</span>
              <span className="text-sm text-muted-foreground">89%</span>
            </div>
            <Progress value={89} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Product Review Accuracy</span>
              <span className="text-sm text-muted-foreground">92%</span>
            </div>
            <Progress value={92} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
