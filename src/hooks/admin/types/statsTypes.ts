
export interface AdminStatsData {
  totalProducts: number;
  totalUsers: number;
  totalShops: number;
  pendingVerifications: number;
  productGrowth: number;
  userGrowth: number;
  shopGrowth: number;
  verificationGrowth: number;
}

export interface SupportStatsData {
  openTickets: number;
  resolvedTickets: number;
  highPriorityTickets: number;
  responseTime: number;
  ticketGrowth: number;
  resolutionRateGrowth: number;
  priorityTicketGrowth: number;
  responseTimeGrowth: number;
}
