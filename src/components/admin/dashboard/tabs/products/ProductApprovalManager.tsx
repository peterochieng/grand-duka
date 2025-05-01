
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProductApprovals } from './ProductApprovals';
import { useProductManager } from '@/hooks/useProductManager';

export const ProductApprovalManager = () => {
  const {
    products,
    loading,
    error,
    filter,
    setFilter,
    fetchProducts,
    handleApprove,
    handleReject
  } = useProductManager();

  const pendingCount = products.filter(p => p.approval_status === 'pending').length;
  const approvedCount = products.filter(p => p.approval_status === 'approved').length;
  const rejectedCount = products.filter(p => p.approval_status === 'rejected').length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Product Approval Management</CardTitle>
        <CardDescription>
          Review and manage product listings that require approval
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4" onValueChange={(value) => setFilter(value as any)}>
          <TabsList>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2">{pendingCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <Badge variant="secondary" className="ml-2">{approvedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <Badge variant="secondary" className="ml-2">{rejectedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="all">
              All Listings
              <Badge variant="secondary" className="ml-2">{products.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            <ProductApprovals />
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            <div className="text-muted-foreground">
              {approvedCount === 0 ? (
                <p className="text-center py-8">No approved products found</p>
              ) : (
                <p className="mb-4">Products that have been approved</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4">
            <div className="text-muted-foreground">
              {rejectedCount === 0 ? (
                <p className="text-center py-8">No rejected products found</p>
              ) : (
                <p className="mb-4">Products that have been rejected</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            <div className="text-muted-foreground mb-4">
              <p>All products requiring moderation</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
