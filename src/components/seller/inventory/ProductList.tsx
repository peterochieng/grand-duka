
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Edit, Trash2, Plus, PackageCheck, Filter } from 'lucide-react';

export const ProductList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Input placeholder="Search products..." className="max-w-xs" />
            <div className="flex-1"></div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-200 mr-2"></div>
                    <span>Sample Product</span>
                  </div>
                </TableCell>
                <TableCell>Electronics</TableCell>
                <TableCell>$199.99</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-800">
                    <Eye className="h-3 w-3 mr-1" /> Public
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <EyeOff className="h-4 w-4 mr-1" /> Hide
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
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
