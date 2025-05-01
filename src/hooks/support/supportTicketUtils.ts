
import { SupportTicket } from './types';

export const filterTickets = (
  tickets: SupportTicket[],
  search: string,
  statusFilter: string,
  categoryFilter: string
) => {
  return tickets.filter(ticket => {
    const matchesSearch = !search || 
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(search.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' ||
      ticket.status === statusFilter;
      
    const matchesCategory = categoryFilter === 'all' ||
      ticket.category === categoryFilter;
      
    return matchesSearch && matchesStatus && matchesCategory;
  });
};

export const getCategoryFromContent = (content: string): string => {
  if (!content) return 'Other';
  
  const contentLower = content.toLowerCase();
  if (contentLower.includes('payment') || contentLower.includes('refund') || contentLower.includes('money')) {
    return 'Payment';
  } else if (contentLower.includes('ship') || contentLower.includes('deliver') || contentLower.includes('receive')) {
    return 'Order';
  } else if (contentLower.includes('product') || contentLower.includes('item') || contentLower.includes('quality')) {
    return 'Product';
  } else if (contentLower.includes('account') || contentLower.includes('login') || contentLower.includes('password')) {
    return 'Account';
  } else if (contentLower.includes('error') || contentLower.includes('website') || contentLower.includes('app')) {
    return 'Technical';
  }
  return 'Other';
};

export const getPriorityFromRating = (rating: number | null): 'low' | 'medium' | 'high' | 'urgent' => {
  if (!rating) return 'medium';
  
  if (rating < 2) return 'urgent';
  if (rating < 3) return 'high';
  if (rating < 4) return 'medium';
  return 'low';
};
