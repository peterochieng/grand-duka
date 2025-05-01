
import { StatCard } from "./StatCard";
import { MessageSquare, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface SupportStatsProps {
  openTickets: number;
  resolvedTickets: number;
  highPriorityTickets: number;
  responseTime: number;
  ticketGrowth: number;
  resolutionRateGrowth: number;
  priorityTicketGrowth: number;
  responseTimeGrowth: number;
}

export const SupportStats = ({
  openTickets,
  resolvedTickets,
  highPriorityTickets,
  responseTime,
  ticketGrowth,
  resolutionRateGrowth,
  priorityTicketGrowth,
  responseTimeGrowth
}: SupportStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard
        title="Open Tickets"
        value={openTickets}
        icon={MessageSquare}
        change={ticketGrowth}
        changeLabel={ticketGrowth > 0 ? "increase" : "decrease"}
        periodLabel="from last week"
        iconColor="text-blue-500"
        borderColor="border-l-blue-500"
      />
      
      <StatCard
        title="Resolved Tickets"
        value={resolvedTickets}
        icon={CheckCircle2}
        change={resolutionRateGrowth}
        changeLabel={resolutionRateGrowth > 0 ? "increase" : "decrease"}
        periodLabel="from last week"
        iconColor="text-green-500"
        borderColor="border-l-green-500"
      />
      
      <StatCard
        title="High Priority"
        value={highPriorityTickets}
        icon={AlertCircle}
        change={priorityTicketGrowth}
        changeLabel={priorityTicketGrowth > 0 ? "increase" : "decrease"}
        periodLabel="from last week"
        iconColor="text-red-500"
        borderColor="border-l-red-500"
      />
      
      <StatCard
        title="Avg. Response Time"
        value={`${responseTime} min`}
        icon={Clock}
        change={responseTimeGrowth}
        changeLabel={responseTimeGrowth > 0 ? "slower" : "faster"}
        periodLabel="from last week"
        iconColor="text-purple-500"
        borderColor="border-l-purple-500"
      />
    </div>
  );
};
