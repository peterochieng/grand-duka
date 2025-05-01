
import React from 'react';
import { Link } from 'react-router-dom';
import { Clipboard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface InspectionRequest {
  id: string;
  vehicleId: string;
  vehicleName: string;
  status: string;
  requestDate: string;
  completionDate?: string;
}

interface InspectionsTabProps {
  inspectionRequests: InspectionRequest[];
}

export const InspectionsTab = ({ inspectionRequests }: InspectionsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection Requests</CardTitle>
        <CardDescription>Track the status of your inspection requests</CardDescription>
      </CardHeader>
      <CardContent>
        {inspectionRequests.length === 0 ? (
          <div className="text-center p-8 border rounded-md">
            <Clipboard className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">No inspection requests</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You haven't requested any inspections yet.
            </p>
            <Button asChild>
              <Link to="/">Browse Vehicles</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspectionRequests.map(request => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.vehicleName}</TableCell>
                  <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {request.status === 'completed' ? (
                      <Badge className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30">
                        Completed
                      </Badge>
                    ) : request.status === 'pending' ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        {request.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/inspections/${request.id}`}>
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
