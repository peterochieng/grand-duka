
import { AdminRole } from '@/lib/types/userTypes';
import { DefaultStats } from './stats/DefaultStats';
import { SupportStats } from './stats/SupportStats';
import { useAdminStats } from '@/hooks/useAdminStats';

interface AdminStatsProps {
  currentRole?: AdminRole | null;
}

export const AdminStats = ({ currentRole }: AdminStatsProps = {}) => {
  const { 
    loading, 
    defaultStats, 
    supportStats, 
    isSupport 
  } = useAdminStats(currentRole);

  // Show loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="border rounded-md p-4 h-24 animate-pulse bg-slate-100 dark:bg-slate-800"
          ></div>
        ))}
      </div>
    );
  }

  // Render support admin stats if the role is support-admin
  if (currentRole === 'support-admin' || isSupport) {
    return (
      <SupportStats
        openTickets={supportStats.openTickets}
        resolvedTickets={supportStats.resolvedTickets}
        highPriorityTickets={supportStats.highPriorityTickets}
        responseTime={supportStats.responseTime}
        ticketGrowth={supportStats.ticketGrowth}
        resolutionRateGrowth={supportStats.resolutionRateGrowth}
        priorityTicketGrowth={supportStats.priorityTicketGrowth}
        responseTimeGrowth={supportStats.responseTimeGrowth}
      />
    );
  }

  // Default stats for other admin roles
  return (
    <DefaultStats
      totalProducts={defaultStats.totalProducts}
      totalUsers={defaultStats.totalUsers}
      totalShops={defaultStats.totalShops}
      pendingVerifications={defaultStats.pendingVerifications}
      productGrowth={defaultStats.productGrowth}
      userGrowth={defaultStats.userGrowth}
      shopGrowth={defaultStats.shopGrowth}
      verificationGrowth={defaultStats.verificationGrowth}
    />
  );
};
