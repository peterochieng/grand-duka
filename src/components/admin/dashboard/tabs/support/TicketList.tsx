
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { SupportTicketItem } from './SupportTicketItem';

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

interface TicketListProps {
  tickets: Ticket[];
  view: 'active' | 'resolved' | 'all';
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, view }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          
          {view === 'active' && (
            <>
              <TableHead>User</TableHead>
              <TableHead>Support Person</TableHead>
            </>
          )}
          
          {view === 'resolved' && (
            <>
              <TableHead>User</TableHead>
              <TableHead>Resolved By</TableHead>
            </>
          )}
          
          {view === 'all' && (
            <>
              <TableHead>Category</TableHead>
              <TableHead>Created</TableHead>
            </>
          )}
          
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map(ticket => (
          <SupportTicketItem key={ticket.id} ticket={ticket} view={view} />
        ))}
      </TableBody>
    </Table>
  );
};
