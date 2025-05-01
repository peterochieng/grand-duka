
import { supabase } from '@/integrations/supabase/client';

export interface Ticket {
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
}

// This function will fetch tickets from the database in the future
export const getTickets = async (): Promise<Ticket[]> => {
  try {
    // In future implementation, replace with actual database query:
    // const { data, error } = await supabase
    //   .from('support_tickets')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    // if (error) throw new Error(error.message);
    // return data as Ticket[];
    
    // For now, use an empty array instead of mock data
    // The actual ticket data is now generated within the useSupportTickets hook
    return [];
  } catch (err) {
    console.error('Error fetching support tickets:', err);
    return [];
  }
};

export const filterTickets = (
  tickets: Ticket[],
  searchQuery: string,
  statusFilter: string,
  categoryFilter: string
): Ticket[] => {
  return tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
};

export const updateTicketStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    // In a real implementation, update the ticket in the database
    // const { error } = await supabase
    //   .from('support_tickets')
    //   .update({ status, updated_at: new Date().toISOString() })
    //   .eq('id', id);
    
    // if (error) throw new Error(error.message);
    
    // For now, just return success
    return true;
  } catch (err) {
    console.error('Error updating ticket status:', err);
    return false;
  }
};

export const assignTicket = async (id: string, supportPerson: string): Promise<boolean> => {
  try {
    // In a real implementation, update the ticket in the database
    // const { error } = await supabase
    //   .from('support_tickets')
    //   .update({ 
    //     assigned_to: supportPerson, 
    //     updated_at: new Date().toISOString() 
    //   })
    //   .eq('id', id);
    
    // if (error) throw new Error(error.message);
    
    // For now, just return success
    return true;
  } catch (err) {
    console.error('Error assigning ticket:', err);
    return false;
  }
};
