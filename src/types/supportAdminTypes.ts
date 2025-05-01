import { SupportTicket } from '@/hooks/support/types';

export type SupportTicketAssignment = {
  id: string;
  ticketId: string;
  adminId: string;
  adminName: string;
  assignedAt: string;
};

export type SupportAdminView = 'all' | 'backlog' | 'assigned';

export type TicketEscalation = {
  id: string;
  ticketId: string;
  escalatedBy: string;
  escalatedAt: string;
  status: 'pending' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  developerNotes?: string;
  resolution?: string;
};

export type SupportTicketResponse = {
  id: string;
  ticketId: string;
  adminId: string;
  adminName: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
  isEscalated?: boolean;
};

export type SupportProductApprovalView = 'pending' | 'approved' | 'rejected' | 'all';
