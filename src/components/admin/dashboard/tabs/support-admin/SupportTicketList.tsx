
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/hooks/support/types";
import { SupportTicketItem } from "./SupportTicketItem";

interface SupportTicketListProps {
  tickets: SupportTicket[];
  onAssign: (ticketId: string) => Promise<boolean>;
  onRespond: (ticketId: string, content: string, isPublic: boolean) => Promise<boolean>;
  showAssignButton?: boolean;
}

export const SupportTicketList = ({ 
  tickets, 
  onAssign, 
  onRespond, 
  showAssignButton = true 
}: SupportTicketListProps) => {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No tickets found matching your criteria.</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <SupportTicketItem 
            key={ticket.id}
            ticket={ticket}
            onAssign={onAssign}
            onRespond={onRespond}
            showAssignButton={showAssignButton && !ticket.assignedTo}
          />
        ))}
      </TableBody>
    </Table>
  );
};
