import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { SubcategoryRequest, useSubcategoryRequests } from '@/services/useSubcategoryRequests';

const AdminSubcategoryTemplateManagerSub = () => {
  const { requests, loading, error, fetchRequests } = useSubcategoryRequests();

  const handleApprove = async (request: SubcategoryRequest) => {
    try {
      const { error } = await supabase
        .from('subcategory_requests' as any)
        .update({ status: 'approved' })
        .eq('id', request.id);
      if (error) throw error;
      toast.success(`Subcategory "${request.subcategory_name}" approved.`);
      fetchRequests();
    } catch (err: any) {
      console.error('Error approving subcategory:', err);
      toast.error('Failed to approve subcategory');
    }
  };

  const handleReject = async (request: SubcategoryRequest) => {
    try {
      const { error } = await supabase
        .from('subcategory_requests' as any)
        .update({ status: 'rejected' })
        .eq('id', request.id);
      if (error) throw error;
      toast.success(`Subcategory "${request.subcategory_name}" rejected.`);
      fetchRequests();
    } catch (err: any) {
      console.error('Error rejecting subcategory:', err);
      toast.error('Failed to reject subcategory');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">Error loading subcategory requests.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Subcategory Requests</CardTitle>
        <CardDescription>
          Review the subcategory requests and approve or reject them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending subcategory requests.</p>
        ) : (
          <div className="space-y-4">
            {requests?.map((req) => (
              <div key={req.id} className="border rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{req.subcategory_name}</p>
                  <p className="text-sm text-muted-foreground">Under Category: {req.category_name}</p>
                  <p className="text-xs text-gray-500">Requested by: {req.requested_by} on {new Date(req.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button variant="success" size="sm" onClick={() => handleApprove(req)}>
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleReject(req)}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSubcategoryTemplateManagerSub;