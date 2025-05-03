import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const CategoryRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('category_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) {
      setRequests(data);
    } else {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load category requests');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const openProcessDialog = (req: any) => {
    setSelectedRequest(req);
    setFeedback(''); // reset feedback
    setDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;
    const { error } = await supabase
      .from('category_requests')
      .update({ status: 'approved', feedback })
      .eq('id', selectedRequest.id);
    if (!error) {
      toast.success('Category request approved');
      fetchRequests();
      setDialogOpen(false);
      setSelectedRequest(null);
    } else {
      toast.error('Failed to approve request');
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;
    const { error } = await supabase
      .from('category_requests')
      .update({ status: 'rejected', feedback })
      .eq('id', selectedRequest.id);
    if (!error) {
      toast.success('Category request rejected');
      fetchRequests();
      setDialogOpen(false);
      setSelectedRequest(null);
    } else {
      toast.error('Failed to reject request');
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Category Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p>No category requests to review.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="border p-4 my-2 flex items-center justify-between">
                <div>
                  <p className="font-bold">{req.name}</p>
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Requested by User ID: {req.seller_id}
                  </p>
                  <p className="text-xs text-muted-foreground">Status: {req.status}</p>
                </div>
                <Button onClick={() => openProcessDialog(req)} variant="outline">
                  Process
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {dialogOpen && selectedRequest && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Request: {selectedRequest.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="mb-2 text-sm">Provide feedback (optional):</p>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback for this request..."
                rows={4}
              />
            </div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button onClick={handleApprove}>Approve</Button>
              <Button onClick={handleReject} variant="destructive">
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};