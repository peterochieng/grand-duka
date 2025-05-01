
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, X, MessageCircle, Search, Users } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { format } from 'date-fns';

// Types for category request
interface CategoryRequest {
  id: string;
  name: string;
  description: string;
  seller_id: string;
  seller_name: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  parent_category_id?: string;
  parent_category_name?: string;
  feedback?: string;
}

export const CategoryRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CategoryRequest | null>(null);
  const [feedback, setFeedback] = useState("");
  const [notifySellers, setNotifySellers] = useState(false);
  const queryClient = useQueryClient();

  // Mock category requests data - would be replaced with actual query
  const categoryRequests: CategoryRequest[] = [
    {
      id: "1",
      name: "Gaming Consoles",
      description: "Video game systems like PlayStation, Xbox, Nintendo",
      seller_id: "seller1",
      seller_name: "John's Electronics",
      status: "pending",
      created_at: new Date().toISOString(),
      parent_category_id: "1",
      parent_category_name: "Electronics"
    },
    {
      id: "2",
      name: "Vintage Clothing",
      description: "Retro fashion items from the 60s, 70s, and 80s",
      seller_id: "seller2",
      seller_name: "RetroFashion Store",
      status: "approved",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      parent_category_id: "3",
      parent_category_name: "Fashion"
    },
    {
      id: "3",
      name: "Smart Home Devices",
      description: "IoT devices for home automation",
      seller_id: "seller3",
      seller_name: "TechHome Solutions",
      status: "rejected",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      parent_category_id: "1",
      parent_category_name: "Electronics",
      feedback: "This is too similar to our existing Home Automation category."
    }
  ];

  const filteredRequests = categoryRequests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.seller_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = activeTab === "all" || request.status === activeTab;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (request: CategoryRequest) => {
    setSelectedRequest(request);
    setFeedback("");
    setNotifySellers(false);
    setResponseDialogOpen(true);
  };

  const handleReject = (request: CategoryRequest) => {
    setSelectedRequest(request);
    setFeedback("");
    setNotifySellers(false);
    setResponseDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    if (!selectedRequest) return;
    
    // Determine if this is an approval or rejection based on the button clicked
    const isApproval = selectedRequest.status !== 'rejected';
    
    // Here we would update in Supabase
    toast.success(
      isApproval 
        ? `Category request approved${notifySellers ? ' and sellers notified' : ''}` 
        : 'Category request rejected'
    );
    
    setResponseDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <RequestsTable 
            requests={filteredRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <RequestsTable 
            requests={filteredRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>
        
        <TabsContent value="approved" className="mt-4">
          <RequestsTable 
            requests={filteredRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-4">
          <RequestsTable 
            requests={filteredRequests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedRequest?.status === 'rejected' 
                ? 'Reject Category Request' 
                : 'Approve Category Request'}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest?.status === 'rejected'
                ? 'Provide feedback for why this category request is being rejected'
                : 'Approve this category request and add it to your platform'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <h3 className="font-medium">Request Details</h3>
              <p className="text-sm"><strong>Name:</strong> {selectedRequest?.name}</p>
              <p className="text-sm"><strong>Description:</strong> {selectedRequest?.description}</p>
              <p className="text-sm"><strong>Seller:</strong> {selectedRequest?.seller_name}</p>
              <p className="text-sm"><strong>Parent Category:</strong> {selectedRequest?.parent_category_name}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={
                  selectedRequest?.status === 'rejected'
                    ? "Explain why this category request is being rejected..."
                    : "Optional: Add any notes about this approval..."
                }
                rows={4}
              />
            </div>
            
            {selectedRequest?.status !== 'rejected' && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="notify-sellers"
                  checked={notifySellers}
                  onCheckedChange={setNotifySellers}
                />
                <Label htmlFor="notify-sellers" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Notify all sellers about new category
                </Label>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitResponse}
              variant={selectedRequest?.status === 'rejected' ? "destructive" : "default"}
            >
              {selectedRequest?.status === 'rejected' ? 'Reject' : 'Approve'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface RequestsTableProps {
  requests: CategoryRequest[];
  onApprove: (request: CategoryRequest) => void;
  onReject: (request: CategoryRequest) => void;
}

const RequestsTable: React.FC<RequestsTableProps> = ({ requests, onApprove, onReject }) => {
  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            No category requests found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-6 p-4 font-medium border-b">
            <div className="col-span-2">Category</div>
            <div>Parent Category</div>
            <div>Seller</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y">
            {requests.map((request) => (
              <div key={request.id} className="grid grid-cols-6 p-4 items-center">
                <div className="col-span-2">
                  <div className="font-medium">{request.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {request.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Requested on {format(new Date(request.created_at), 'MMM d, yyyy')}
                  </div>
                </div>
                <div>{request.parent_category_name || "N/A"}</div>
                <div>{request.seller_name}</div>
                <div>
                  <StatusBadge status={request.status} />
                </div>
                <div className="flex justify-end space-x-2">
                  {request.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-green-600"
                        onClick={() => onApprove(request)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600"
                        onClick={() => onReject({...request, status: 'rejected'})}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {request.status !== 'pending' && request.feedback && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      title="View feedback"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge: React.FC<{ status: 'pending' | 'approved' | 'rejected' }> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case 'approved':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    default:
      return null;
  }
};
