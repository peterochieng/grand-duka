
import { useState, useEffect } from 'react';
import { SupportTicket } from '@/hooks/support/types';
import { SupportAdminView } from '@/types/supportAdminTypes';
import { fetchSupportTickets, assignTicketToSelf, addResponseToTicket } from './support/ticketService';

export const useSupportAdmin = () => {
  const [view, setView] = useState<SupportAdminView>('all');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const supportTickets = await fetchSupportTickets();
        setTickets(supportTickets);
      } catch (err) {
        console.error('Error fetching support tickets for admin:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch support tickets'));
      } finally {
        setLoading(false);
      }
    };
    
    loadTickets();
  }, [view]);

  const handleAssignTicket = async (ticketId: string) => {
    const success = await assignTicketToSelf(ticketId);
    if (success) {
      setTickets(currentTickets => 
        currentTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, assignedTo: 'support-agent-1', status: 'in_progress' } 
            : ticket
        )
      );
    }
    return success;
  };

  const handleAddResponse = async (ticketId: string, content: string, isPublic: boolean = true) => {
    const success = await addResponseToTicket(ticketId, content, isPublic);
    if (success) {
      setTickets(currentTickets => 
        currentTickets.map(ticket => {
          if (ticket.id === ticketId) {
            const newResponse = {
              id: `resp-${Date.now()}`,
              content,
              createdAt: new Date().toISOString(),
              userId: 'support-agent-1',
              userName: 'Support Admin',
              isStaff: true
            };
            
            return { 
              ...ticket, 
              responses: ticket.responses ? [...ticket.responses, newResponse] : [newResponse],
              status: isPublic ? 'resolved' : ticket.status
            };
          }
          return ticket;
        })
      );
    }
    return success;
  };

  return {
    view,
    setView,
    tickets,
    loading,
    error,
    assignTicketToSelf: handleAssignTicket,
    addResponseToTicket: handleAddResponse
  };
};
