
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Filter } from 'lucide-react';

export const SalesHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Input placeholder="Search orders..." className="max-w-xs" />
            <div className="flex-1"></div>
            <Button>Export Report</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#ORD-5123</TableCell>
                <TableCell>Apr 15, 2023</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Sample Product</TableCell>
                <TableCell>$199.99</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-800">
                    Delivered
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" /> Details
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
