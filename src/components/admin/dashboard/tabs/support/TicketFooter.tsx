
import React from 'react';
import { Button } from "@/components/ui/button";

interface TicketFooterProps {
  filteredCount: number;
  totalCount: number;
}

export const TicketFooter: React.FC<TicketFooterProps> = ({ filteredCount, totalCount }) => {
  return (
    <div className="flex justify-between mt-6">
      <Button variant="outline">New Ticket</Button>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCount} tickets
        </span>
      </div>
    </div>
  );
};
