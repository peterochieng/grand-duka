
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Package, FileText } from 'lucide-react';

export const LogisticsCenter = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logistics Center</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Input placeholder="Search by tracking number..." className="max-w-xs" />
            <div className="flex-1"></div>
            <Button>Process Shipments</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Shipping Method</TableHead>
                <TableHead>Tracking #</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#ORD-5123</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Standard Shipping</TableCell>
                <TableCell>TRK123456789</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-800">
                    In Transit
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Truck className="h-4 w-4 mr-1" /> Track
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
