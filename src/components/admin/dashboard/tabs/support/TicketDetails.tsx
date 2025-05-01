
import React from 'react';
import { User, UserCircle } from "lucide-react";
import { getStatusBadge } from './badges/StatusBadge';
import { getPriorityBadge } from './badges/PriorityBadge';

interface TicketDetailsProps {
  ticket: {
    id: string;
    subject: string;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userName: string;
    assignedTo: string;
    supportPerson?: string;
    description?: string;
  };
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span>{getStatusBadge(ticket.status)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Priority:</span>
            <span>{getPriorityBadge(ticket.priority)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Category:</span>
            <span className="capitalize">{ticket.category}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Customer:</span>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {ticket.userName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Assigned To:</span>
            <span className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              {ticket.supportPerson || ticket.assignedTo || "Unassigned"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">User ID:</span>
            <span>{ticket.userId}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2">Description</h4>
        <p className="text-sm text-muted-foreground">
          {ticket.description || "No description provided."}
        </p>
      </div>
    </>
  );
};
