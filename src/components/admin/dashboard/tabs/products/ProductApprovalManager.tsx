import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useProductManager } from '@/hooks/useProductManager';
import { toast } from 'sonner';

export const ProductApprovalManager = () => {
  const {
    products,
    loading,
    error,
    filter,
    setFilter,
    fetchProducts,
    approveProduct,
    rejectProduct,
  } = useProductManager();

  const [currentRejectProductId, setCurrentRejectProductId] = useState<string | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState<string>('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleApprove = async (productId: string) => {
    try {
      const success = await approveProduct(productId);
      if (success) {
        toast.success('Product approved successfully!');
        fetchProducts(); // Refresh the product list
      } else {
        toast.error('Failed to approve product.');
      }
    } catch (error) {
      console.error('Error approving product:', error);
      toast.error('An error occurred while approving the product.');
    }
  };

  const openRejectDialog = (productId: string) => {
    setCurrentRejectProductId(productId);
    setRejectionFeedback('');
    setShowRejectDialog(true);
  };

  const handleReject = async () => {
    if (!currentRejectProductId) return;

    try {
      const success = await rejectProduct(currentRejectProductId, rejectionFeedback);
      if (success) {
        toast.success('Product rejected successfully!');
        fetchProducts(); // Refresh the product list
      } else {
        toast.error('Failed to reject product.');
      }
    } catch (error) {
      console.error('Error rejecting product:', error);
      toast.error('An error occurred while rejecting the product.');
    } finally {
      setShowRejectDialog(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Product Approval Management</CardTitle>
        <CardDescription>
          Review and manage product listings that require approval.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4" onValueChange={(value) => setFilter(value as any)}>
          <TabsList>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2">
                {products.filter((p) => p.approval_status === 'pending').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <Badge variant="secondary" className="ml-2">
                {products.filter((p) => p.approval_status === 'approved').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <Badge variant="secondary" className="ml-2">
                {products.filter((p) => p.approval_status === 'rejected').length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>Error loading products: {error.message}</p>
            ) : (
              <div className="space-y-4">
                {products
                  .filter((product) => product.approval_status === 'pending')
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <h3 className="text-lg font-medium">{product.title}</h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="success" onClick={() => handleApprove(product.id)}>
                          Approve
                        </Button>
                        <Button variant="destructive" onClick={() => openRejectDialog(product.id)}>
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Rejection Feedback Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Product</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Provide feedback for rejecting this product..."
            value={rejectionFeedback}
            onChange={(e) => setRejectionFeedback(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};