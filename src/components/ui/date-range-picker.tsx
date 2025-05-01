
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Create a separate interface that doesn't extend HTMLAttributes
export interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  align?: "center" | "start" | "end";
  calendarClassName?: string;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  className,
  align = "start",
  calendarClassName,
  ...props
}: DateRangePickerProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>) {
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto", calendarClassName)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
