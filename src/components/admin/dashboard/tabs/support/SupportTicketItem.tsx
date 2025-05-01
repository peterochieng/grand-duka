
import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, UserCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getStatusBadge } from './badges/StatusBadge';
import { getPriorityBadge } from './badges/PriorityBadge';
import { TicketDetails } from './TicketDetails';
import { TicketConversation } from './TicketConversation';
import { TicketAttachments } from './TicketAttachments';

interface Attachment {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  size?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string;
  assignedTo: string;
  supportPerson?: string;
  description?: string;
  messages?: Message[];
  attachments?: Attachment[];
}

interface SupportTicketItemProps {
  ticket: Ticket;
  view: 'active' | 'resolved' | 'all';
}

export const SupportTicketItem: React.FC<SupportTicketItemProps> = ({ ticket, view }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAttachment = (newAttachment: Attachment) => {
    // In a real app, would update the ticket on the server
    if (!ticket.attachments) {
      ticket.attachments = [];
    }
    
    ticket.attachments.push(newAttachment);
    // Force a re-render by creating a new array
    ticket.attachments = [...ticket.attachments];
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    // In a real app, would call an API here
    if (ticket.attachments) {
      const index = ticket.attachments.findIndex(a => a.id === attachmentId);
      if (index !== -1) {
        ticket.attachments.splice(index, 1);
        // Force a re-render by creating a new array
        ticket.attachments = [...ticket.attachments];
        
        toast({
          title: "Attachment removed",
          description: "The attachment has been removed from this ticket"
        });
      }
    }
  };

  return (
    <>
      <TableRow key={ticket.id}>
        <TableCell className="font-medium">{ticket.id}</TableCell>
        <TableCell>{ticket.subject}</TableCell>
        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
        
        {view === 'active' && (
          <>
            <TableCell>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {ticket.userName}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                {ticket.supportPerson || ticket.assignedTo || "Unassigned"}
              </div>
            </TableCell>
          </>
        )}
        
        {view === 'resolved' && (
          <>
            <TableCell>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {ticket.userName}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                {ticket.supportPerson || ticket.assignedTo || "Not assigned"}
              </div>
            </TableCell>
          </>
        )}
        
        {view === 'all' && (
          <>
            <TableCell className="capitalize">{ticket.category}</TableCell>
            <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
          </>
        )}
        
        <TableCell>
          <Button size="sm" variant="outline" onClick={() => setIsDialogOpen(true)}>View</Button>
        </TableCell>
      </TableRow>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Ticket #{ticket.id}: {ticket.subject}</DialogTitle>
            <DialogDescription>
              Created: {new Date(ticket.createdAt).toLocaleString()} | Updated: {new Date(ticket.updatedAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <TicketDetails ticket={ticket} />
          
          <TicketConversation messages={ticket.messages} />
          
          <TicketAttachments 
            attachments={ticket.attachments} 
            onAddAttachment={handleAddAttachment}
            onRemoveAttachment={handleRemoveAttachment}
          />

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
            <Button>Update Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
