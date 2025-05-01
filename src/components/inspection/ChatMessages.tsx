
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  
  // Render a single message
  const renderMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user';
    
    return (
      <div
        key={message.id}
        className={cn(
          "flex w-full mb-4 last:mb-0",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-4 py-2 max-w-[85%]",
            isUser 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted"
          )}
        >
          {message.content}
        </div>
      </div>
    );
  };
  
  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="h-[320px] p-4"
      type="always"
    >
      {messages.map(renderMessage)}
      {isLoading && (
        <div className="flex items-center space-x-2 text-muted-foreground animate-pulse">
          <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
          <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
          <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
        </div>
      )}
    </ScrollArea>
  );
};
