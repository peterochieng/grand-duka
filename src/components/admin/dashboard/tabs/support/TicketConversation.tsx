
import React from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface TicketConversationProps {
  messages?: Message[];
}

export const TicketConversation: React.FC<TicketConversationProps> = ({ messages }) => {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold mb-2">Conversation History</h4>
      <div className="max-h-64 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="p-2 rounded border">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{message.sender}</span>
              <span className="text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
