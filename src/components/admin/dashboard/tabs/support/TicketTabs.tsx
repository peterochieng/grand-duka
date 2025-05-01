
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { TicketList } from './TicketList';

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
}

interface TicketTabsProps {
  filteredTickets: Ticket[];
}

export const TicketTabs: React.FC<TicketTabsProps> = ({ filteredTickets }) => {
  return (
    <>
      <TabsContent value="active">
        <TicketList 
          tickets={filteredTickets.filter(ticket => ticket.status !== "resolved" && ticket.status !== "closed")} 
          view="active" 
        />
      </TabsContent>
      
      <TabsContent value="resolved">
        <TicketList 
          tickets={filteredTickets.filter(ticket => ticket.status === "resolved" || ticket.status === "closed")} 
          view="resolved" 
        />
      </TabsContent>
      
      <TabsContent value="all">
        <TicketList 
          tickets={filteredTickets} 
          view="all" 
        />
      </TabsContent>
    </>
  );
};
