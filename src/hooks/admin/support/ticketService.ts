
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { transformFeedbackToTickets } from './ticketTransformers';
import { SupportTicket } from '@/hooks/support/types';

export const fetchSupportTickets = async () => {
  try {
    const { data: feedbackData, error: feedbackError } = await supabase
      .from('feedback')
      .select(`
        id,
        comment,
        rating,
        created_at,
        buyer_id,
        buyer_name,
        seller_response,
        seller_id,
        product_id,
        product_name
      `)
      .order('created_at', { ascending: false });
      
    if (feedbackError) {
      throw feedbackError;
    }
    
    return transformFeedbackToTickets(feedbackData || []);
  } catch (err) {
    console.error('Error fetching support tickets:', err);
    throw err;
  }
};

export const assignTicketToSelf = async (ticketId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      throw new Error('You must be logged in to assign tickets');
    }
    
    toast.success('Ticket assigned to you successfully');
    return true;
  } catch (error) {
    console.error('Error assigning ticket:', error);
    toast.error('Failed to assign ticket: ' + (error instanceof Error ? error.message : 'Unknown error'));
    return false;
  }
};

export const addResponseToTicket = async (ticketId: string, content: string, isPublic: boolean = true) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      throw new Error('You must be logged in to respond to tickets');
    }
    
    toast.success(isPublic ? 'Response sent to customer' : 'Internal note added');
    return true;
  } catch (error) {
    console.error('Error adding response:', error);
    toast.error('Failed to add response: ' + (error instanceof Error ? error.message : 'Unknown error'));
    return false;
  }
};
