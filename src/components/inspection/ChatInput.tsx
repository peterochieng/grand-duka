
import React, { useRef } from 'react';
import { SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  isLoading: boolean;
  placeholder: string;
}

export const ChatInput = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  isLoading,
  placeholder 
}: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={isLoading || !input.trim()}
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};
