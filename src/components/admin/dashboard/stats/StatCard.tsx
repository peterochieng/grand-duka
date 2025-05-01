
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change: number;
  changeLabel: string;
  periodLabel?: string;
  iconColor: string;
  borderColor: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  periodLabel = "from last month",
  iconColor,
  borderColor,
}: StatCardProps) => {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColorClass = isPositive ? "text-green-500" : "text-red-500";
  
  // For specific metrics where negative change is good (like response time)
  const isBetterWhenNegative = title.toLowerCase().includes("response time");
  const effectiveColorClass = isBetterWhenNegative ? 
    (isPositive ? "text-red-500" : "text-green-500") : 
    (isPositive ? "text-green-500" : "text-red-500");

  return (
    <Card className={`border-l-4 ${borderColor} shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1 text-xs">
          <TrendIcon className={`mr-1 h-3 w-3 ${effectiveColorClass}`} />
          <span className={effectiveColorClass}>
            {Math.abs(change)}% {changeLabel}
          </span>
          <span className="ml-1 text-muted-foreground">{periodLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};
