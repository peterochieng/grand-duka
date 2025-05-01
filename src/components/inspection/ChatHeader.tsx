
import React from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';

interface ChatHeaderProps {
  clearMessages: () => void;
}

export const ChatHeader = ({ clearMessages }: ChatHeaderProps) => {
  return (
    <div className="px-4 py-3 flex flex-row items-center space-x-2">
      <Bot className="h-5 w-5" />
      <CardTitle className="text-lg">Product Assistant</CardTitle>
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={clearMessages}
          title="Reset conversation"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
