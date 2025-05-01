import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Clock, Tag, MessageSquare, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { SupportTicket } from "@/hooks/support/types";
import { formatDistanceToNow } from 'date-fns';
import { TicketEscalationDialog } from './TicketEscalationDialog';

interface SupportTicketItemProps {
  ticket: SupportTicket;
  onAssign: (ticketId: string) => Promise<boolean>;
  onRespond: (ticketId: string, content: string, isPublic: boolean) => Promise<boolean>;
  showAssignButton: boolean;
}

export const SupportTicketItem = ({ 
  ticket, 
  onAssign, 
  onRespond, 
  showAssignButton 
}: SupportTicketItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRespondDialogOpen, setIsRespondDialogOpen] = useState(false);
  const [responseContent, setResponseContent] = useState("");
  const [isPublicResponse, setIsPublicResponse] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEscalateDialogOpen, setIsEscalateDialogOpen] = useState(false);
  
  const handleAssign = async () => {
    try {
      await onAssign(ticket.id);
    } catch (error) {
      console.error("Error assigning ticket:", error);
    }
  };
  
  const handleSubmitResponse = async () => {
    if (!responseContent.trim()) return;
    
    try {
      setIsSubmitting(true);
      const success = await onRespond(ticket.id, responseContent, isPublicResponse);
      if (success) {
        setResponseContent("");
        setIsRespondDialogOpen(false);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEscalate = async (priority: string, notes: string) => {
    try {
      setIsSubmitting(true);
      const escalationContent = `[ESCALATED TO DEV TEAM]\nPriority: ${priority}\n\n${notes}`;
      await onRespond(ticket.id, escalationContent, false);
      setIsEscalateDialogOpen(false);
    } catch (error) {
      console.error("Error escalating ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formattedCreatedDate = formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500">Open</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-500">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">High</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="border-red-500 text-red-500">Urgent</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{ticket.id.substring(0, 8)}</TableCell>
        <TableCell>{ticket.title}</TableCell>
        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{ticket.userName}</span>
          </div>
        </TableCell>
        <TableCell>{ticket.category}</TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formattedCreatedDate}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsDialogOpen(true)}>
              View
            </Button>
            
            {showAssignButton && (
              <Button size="sm" variant="secondary" onClick={handleAssign}>
                Assign to Me
              </Button>
            )}
            
            {ticket.assignedTo === 'support-agent-1' && (
              <>
                <Button size="sm" onClick={() => setIsRespondDialogOpen(true)}>
                  Respond
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => setIsEscalateDialogOpen(true)}
                >
                  Escalate
                </Button>
              </>
            )}
          </div>
        </TableCell>
      </TableRow>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {ticket.id.substring(0, 8)}: {ticket.title}
              <span className="ml-2">{getStatusBadge(ticket.status)}</span>
              <span>{getPriorityBadge(ticket.priority)}</span>
            </DialogTitle>
            <DialogDescription>
              Submitted by {ticket.userName} • {formattedCreatedDate}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Description</h4>
              <div className="p-4 border rounded-md bg-muted/50">
                {ticket.description || "No description provided."}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Customer</h4>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{ticket.userName}</span>
                </div>
                <p className="text-sm text-muted-foreground">{ticket.userEmail}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Category</h4>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>{ticket.category}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Conversation History</h4>
              {ticket.responses && ticket.responses.length > 0 ? (
                <div className="space-y-3">
                  {ticket.responses.map(response => (
                    <div key={response.id} className={`p-3 rounded-md ${response.isStaff ? 'bg-muted ml-6' : 'bg-primary/10 mr-6'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{response.isStaff ? 'Support Agent' : ticket.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(response.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p>{response.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No responses yet</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              {showAssignButton && (
                <Button variant="secondary" onClick={handleAssign}>
                  Assign to Me
                </Button>
              )}
              
              {ticket.assignedTo === 'support-agent-1' && (
                <Button onClick={() => {
                  setIsDialogOpen(false);
                  setIsRespondDialogOpen(true);
                }}>
                  Respond
                </Button>
              )}
              
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isRespondDialogOpen} onOpenChange={setIsRespondDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Ticket</DialogTitle>
            <DialogDescription>
              Write your response to {ticket.userName}'s support request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="response">Your Response</Label>
              <Textarea
                id="response"
                placeholder="Type your response here..."
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                rows={5}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="public-response"
                checked={isPublicResponse}
                onCheckedChange={setIsPublicResponse}
              />
              <Label htmlFor="public-response">
                {isPublicResponse ? (
                  <span className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                    Send to customer (Resolves ticket)
                  </span>
                ) : (
                  <span className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
                    Internal note only
                  </span>
                )}
              </Label>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsRespondDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitResponse} 
                disabled={!responseContent.trim() || isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Response'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TicketEscalationDialog 
        isOpen={isEscalateDialogOpen}
        onClose={() => setIsEscalateDialogOpen(false)}
        onEscalate={handleEscalate}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
