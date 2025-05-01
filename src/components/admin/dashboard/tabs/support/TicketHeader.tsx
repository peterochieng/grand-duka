
import React from 'react';
import { MessageSquare, CheckCircle2, Clock } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TicketHeader: React.FC = () => {
  return (
    <TabsList>
      <TabsTrigger value="active">
        <Clock className="mr-2 h-4 w-4" />
        Active Tickets
      </TabsTrigger>
      <TabsTrigger value="resolved">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Resolved
      </TabsTrigger>
      <TabsTrigger value="all">
        <MessageSquare className="mr-2 h-4 w-4" />
        All Tickets
      </TabsTrigger>
    </TabsList>
  );
};
