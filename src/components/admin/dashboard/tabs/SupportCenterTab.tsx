
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { TicketHeader } from './support/TicketHeader';
import { TicketFilters } from './support/TicketFilters';
import { TicketTabs } from './support/TicketTabs';
import { TicketFooter } from './support/TicketFooter';
import { useSupportTickets } from '@/hooks/useSupportTickets';
import { Ticket } from '@/services/supportService';
import { filterTickets } from '@/hooks/support/supportTicketUtils';
import { SupportTicket } from '@/hooks/support/types';

export const SupportCenterTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { tickets: allTickets, loading, error } = useSupportTickets();
  
  // Map SupportTicket[] to Ticket[] to ensure compatibility
  const mappedTickets: Ticket[] = allTickets.map(ticket => ({
    id: ticket.id,
    subject: ticket.title, // Map title to subject
    status: ticket.status,
    priority: ticket.priority,
    category: ticket.category,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    userId: ticket.userId,
    userName: ticket.userName,
    assignedTo: ticket.assignedTo || '',
    supportPerson: ticket.assignedTo,
    description: ticket.description
  }));
  
  // Apply filters directly to SupportTicket objects
  const filteredTickets = mappedTickets.filter(ticket => {
    // Apply search filter
    if (searchQuery && !ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter !== "all" && ticket.status !== statusFilter) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter !== "all" && ticket.category !== categoryFilter) {
      return false;
    }
    
    return true;
  });
  
  if (loading) {
    return (
      <div className="border rounded-md p-4 space-y-6">
        <h3 className="text-lg font-semibold mb-2">Support Centre</h3>
        <p className="text-muted-foreground mb-4">Manage customer support tickets and inquiries.</p>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading support tickets...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="border rounded-md p-4 space-y-6">
        <h3 className="text-lg font-semibold mb-2">Support Centre</h3>
        <p className="text-muted-foreground mb-4">Manage customer support tickets and inquiries.</p>
        <div className="text-center py-8 text-red-500">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md p-4 space-y-6">
      <h3 className="text-lg font-semibold mb-2">Support Centre</h3>
      <p className="text-muted-foreground mb-4">Manage customer support tickets and inquiries.</p>
      
      <Tabs defaultValue="active">
        <TicketHeader />
        
        <TicketFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        
        <TicketTabs filteredTickets={filteredTickets} />
      
        <TicketFooter 
          filteredCount={filteredTickets.length} 
          totalCount={mappedTickets.length} 
        />
      </Tabs>
    </div>
  );
};
