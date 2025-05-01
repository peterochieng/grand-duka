
import { Button } from "@/components/ui/button";

type DateRange = "week" | "month" | "quarter" | "year";

interface DateRangeSelectorProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export const DateRangeSelector = ({ dateRange, setDateRange }: DateRangeSelectorProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant={dateRange === "week" ? "default" : "outline"} 
        onClick={() => setDateRange("week")}
      >
        Last Week
      </Button>
      <Button 
        size="sm" 
        variant={dateRange === "month" ? "default" : "outline"} 
        onClick={() => setDateRange("month")}
      >
        Last Month
      </Button>
      <Button 
        size="sm" 
        variant={dateRange === "quarter" ? "default" : "outline"} 
        onClick={() => setDateRange("quarter")}
      >
        Last Quarter
      </Button>
      <Button 
        size="sm" 
        variant={dateRange === "year" ? "default" : "outline"} 
        onClick={() => setDateRange("year")}
      >
        Last Year
      </Button>
    </div>
  );
};
