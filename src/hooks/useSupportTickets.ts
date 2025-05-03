
import { useState, useEffect } from 'react';
import { SupportTicket } from './support/types';
import { filterTickets } from './support/supportTicketUtils';
import { fetchSupportTickets } from './support/supportTicketService';

// Use 'export type' when re-exporting types with isolatedModules enabled
export type { SupportTicket, TicketResponse } from './support/types';

export const useSupportTickets = () => {
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
        console.error('Error fetching support tickets:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch support tickets'));
      } finally {
        setLoading(false);
      }
    };
    loadTickets();
  }, []);

  return { tickets, loading, error };
};