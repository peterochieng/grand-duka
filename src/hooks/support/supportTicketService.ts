
import { supabase } from '@/integrations/supabase/client';
import { SupportTicket, TicketResponse } from './types';
import { getCategoryFromContent, getPriorityFromRating } from './supportTicketUtils';

export const fetchSupportTickets = async (): Promise<SupportTicket[]> => {
  try {
    // Fetch real tickets from the feedback table
    // In a real implementation, this would come from a dedicated support_tickets table
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
    
    // Transform feedback data into support tickets format
    const supportTickets: SupportTicket[] = (feedbackData || []).map(feedback => {
      // Determine priority based on rating (lower rating = higher priority)
      const priority = getPriorityFromRating(feedback.rating);
      
      // Determine status based on seller_response
      const status: 'open' | 'in_progress' | 'resolved' | 'closed' = 
        feedback.seller_response ? 'resolved' : Math.random() > 0.6 ? 'in_progress' : 'open';
      
      // Create a meaningful title from the comment
      const title = feedback.comment 
        ? (feedback.comment.length > 50 
            ? feedback.comment.substring(0, 50) + '...' 
            : feedback.comment)
        : `Feedback on ${feedback.product_name || 'a product'}`;
      
      // Categorize based on product or content
      const category = feedback.comment 
        ? getCategoryFromContent(feedback.comment)
        : feedback.product_name ? 'Product' : 'Other';
      
      // Add mock responses to some tickets
      const hasResponses = feedback.seller_response || Math.random() > 0.7;
      const responses: TicketResponse[] = [];
      
      if (hasResponses) {
        if (feedback.seller_response) {
          // Create response from seller feedback
          responses.push({
            id: `resp-${feedback.id}-1`,
            content: feedback.seller_response,
            createdAt: new Date(new Date(feedback.created_at).getTime() + 24 * 60 * 60 * 1000).toISOString(),
            userId: feedback.seller_id || 'support-agent-1',
            userName: 'Support Agent',
            isStaff: true
          });
        } else {
          // Add a default response
          responses.push({
            id: `resp-${feedback.id}-1`,
            content: "Thank you for contacting support. We are looking into this issue and will get back to you shortly.",
            createdAt: new Date(new Date(feedback.created_at).getTime() + 12 * 60 * 60 * 1000).toISOString(),
            userId: 'support-agent-1',
            userName: 'Support Agent',
            isStaff: true
          });
        }
      }
      
      return {
        id: `ticket-${feedback.id}`,
        title,
        description: feedback.comment || `Feedback regarding ${feedback.product_name || 'a product'}.`,
        status,
        priority,
        category,
        createdAt: feedback.created_at,
        updatedAt: feedback.seller_response 
          ? new Date(new Date(feedback.created_at).getTime() + 24 * 60 * 60 * 1000).toISOString()
          : feedback.created_at,
        userId: feedback.buyer_id || 'unknown',
        userName: feedback.buyer_name || 'Anonymous User',
        userEmail: `user-${feedback.buyer_id ? feedback.buyer_id.substring(0, 8) : 'anon'}@example.com`,
        assignedTo: status === 'in_progress' ? 'support-agent-1' : undefined,
        responses: responses.length > 0 ? responses : undefined
      };
    });
    
    return supportTickets;
  } catch (err) {
    console.error('Error fetching support tickets:', err);
    throw err;
  }
};
