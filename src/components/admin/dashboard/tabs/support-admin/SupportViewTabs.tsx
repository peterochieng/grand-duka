
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SupportTicket } from '@/hooks/support/types';
import { SupportAdminView } from '@/types/supportAdminTypes';
import { SupportTicketList } from './SupportTicketList';

interface SupportViewTabsProps {
  view: SupportAdminView;
  handleViewChange: (view: SupportAdminView) => void;
  filteredTickets: SupportTicket[];
  tickets: SupportTicket[];
  assignTicketToSelf: (ticketId: string) => Promise<boolean>;
  addResponseToTicket: (ticketId: string, content: string, isPublic?: boolean) => Promise<boolean>;
}

export const SupportViewTabs = ({
  view,
  handleViewChange,
  filteredTickets,
  tickets,
  assignTicketToSelf,
  addResponseToTicket
}: SupportViewTabsProps) => {
  return (
    <Tabs defaultValue={view} onValueChange={(value) => handleViewChange(value as SupportAdminView)}>
      <TabsList>
        <TabsTrigger value="all">
          All Tickets
          <Badge variant="secondary" className="ml-2">{tickets.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="backlog">
          Backlog
          <Badge variant="secondary" className="ml-2">
            {tickets.filter(t => !t.assignedTo).length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="assigned">
          My Tickets
          <Badge variant="secondary" className="ml-2">
            {tickets.filter(t => t.assignedTo === 'support-agent-1').length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <SupportTicketList 
          tickets={filteredTickets} 
          onAssign={assignTicketToSelf} 
          onRespond={addResponseToTicket}
        />
      </TabsContent>
      
      <TabsContent value="backlog" className="mt-6">
        <SupportTicketList 
          tickets={filteredTickets.filter(t => !t.assignedTo)} 
          onAssign={assignTicketToSelf} 
          onRespond={addResponseToTicket}
          showAssignButton={true}
        />
      </TabsContent>
      
      <TabsContent value="assigned" className="mt-6">
        <SupportTicketList 
          tickets={filteredTickets.filter(t => t.assignedTo === 'support-agent-1')} 
          onAssign={assignTicketToSelf} 
          onRespond={addResponseToTicket}
          showAssignButton={false}
        />
      </TabsContent>
    </Tabs>
  );
};
