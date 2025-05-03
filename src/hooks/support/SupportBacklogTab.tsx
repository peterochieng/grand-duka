import React, { useState } from 'react';
import { useSupportTickets } from '@/hooks/useSupportTickets';
import { SupportTicket } from '@/hooks/support/types';
import { SupportViewTabs } from '@/components/admin/dashboard/tabs/support-admin/SupportViewTabs';
import { SupportTicketList } from '@/components/admin/dashboard/tabs/support-admin/SupportTicketList';

export const SupportBacklogTab: React.FC = () => {
  const { tickets, loading, error } = useSupportTickets();
  const [view, setView] = useState<'all' | 'backlog' | 'assigned'>('backlog');

  // Filter tickets based on the selected view
  const filteredTickets = tickets.filter((ticket) => {
    if (view === 'backlog') {
      return !ticket.assignedTo; // Show only unassigned tickets
    }
    if (view === 'assigned') {
      return ticket.assignedTo === 'support-agent-1'; // Replace with the current admin's ID
    }
    return true; // Show all tickets
  });

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (error) {
    return <p>Error loading tickets: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <SupportViewTabs
        view={view}
        handleViewChange={setView}
        tickets={tickets}
        filteredTickets={filteredTickets}
        assignTicketToSelf={async (ticketId: string) => { console.log(`Assign ticket ${ticketId} to self`); return true; }}
        addResponseToTicket={async (ticketId: string, content: string, isPublic?: boolean) => { console.log(`Add response "${content}" to ticket ${ticketId}`); return true; }}
      />
      <SupportTicketList
        tickets={filteredTickets}
        onAssign={async (ticketId) => { console.log(`Assign ticket ${ticketId}`); return true; }}
        onRespond={async (ticketId, content, isPublic) => { console.log(`Respond to ticket ${ticketId} with ${content}`); return true; }}
      />
    </div>
  );
};