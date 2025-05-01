
export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string;
  userEmail: string;
  assignedTo?: string;
  attachments?: string[];
  responses?: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  userName: string;
  isStaff: boolean;
}
