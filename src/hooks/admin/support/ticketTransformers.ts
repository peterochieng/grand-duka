
import { SupportTicket, TicketResponse } from '@/hooks/support/types';

export const transformFeedbackToTickets = (feedbackData: any[]): SupportTicket[] => {
  return feedbackData.map(feedback => {
    const status = feedback.seller_response 
      ? 'resolved'
      : Math.random() > 0.6 ? 'in_progress' : 'open';
    
    const title = feedback.comment 
      ? (feedback.comment.length > 50 
          ? feedback.comment.substring(0, 50) + '...' 
          : feedback.comment)
      : `Feedback on ${feedback.product_name || 'a product'}`;
    
    const priority = determinePriorityFromRating(feedback.rating);
    const category = determineCategoryFromContent(feedback.comment);
    const assignedTo = status === 'in_progress' ? 'support-agent-1' : undefined;
    
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
      assignedTo,
      responses: feedback.seller_response ? [{
        id: `resp-${feedback.id}-1`,
        content: feedback.seller_response,
        createdAt: new Date(new Date(feedback.created_at).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        userId: feedback.seller_id || 'support-agent-1',
        userName: 'Support Agent',
        isStaff: true
      }] : undefined
    };
  });
};

const determinePriorityFromRating = (rating?: number): 'low' | 'medium' | 'high' | 'urgent' => {
  if (!rating) return 'medium';
  if (rating < 2) return 'urgent';
  if (rating < 3) return 'high';
  if (rating < 4) return 'medium';
  return 'low';
};

const determineCategoryFromContent = (content?: string): string => {
  if (!content) return 'General';
  
  const contentLower = content.toLowerCase();
  if (contentLower.includes('payment') || contentLower.includes('refund')) {
    return 'Payment';
  } else if (contentLower.includes('ship') || contentLower.includes('deliver')) {
    return 'Shipping';
  } else if (contentLower.includes('product') || contentLower.includes('quality')) {
    return 'Product';
  } else if (contentLower.includes('account') || contentLower.includes('login')) {
    return 'Account';
  }
  return 'General';
};
