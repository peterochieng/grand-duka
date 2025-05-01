
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "./analytics/DateRangeSelector";
import { AnalyticsTabs } from "./analytics/AnalyticsTabs";

export const DataAnalyticsTab = () => {
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month");

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Data Analytics</h3>
      <p className="text-muted-foreground mb-4">Query and visualize platform data for business insights.</p>
      
      <div className="flex justify-between mb-4">
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        <Button size="sm">Export Data</Button>
      </div>
      
      <AnalyticsTabs />
    </div>
  );
};
