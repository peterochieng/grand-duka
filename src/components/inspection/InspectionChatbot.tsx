
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChatContext } from '@/lib/types';
import { useInspectionChat } from '@/hooks/useInspectionChat';
import { cn } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { getProductById } from '@/lib/products';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { getChatPlaceholder } from './chatUtils';

interface InspectionChatbotProps {
  itemId?: string;
  itemName?: string;
  itemType?: string;
  inspectionId?: string;
  className?: string;
  productData?: any; // Optional product data to provide to the chatbot
}

export const InspectionChatbot = ({ 
  itemId, 
  itemName,
  itemType,
  inspectionId,
  className,
  productData 
}: InspectionChatbotProps) => {
  const [input, setInput] = useState('');
  const { id: routeId } = useParams<{ id: string }>();
  
  // If we're on a product page and no productData was provided, try to get it
  const [resolvedProductData, setResolvedProductData] = useState<any>(productData);
  
  useEffect(() => {
    if (!productData && routeId) {
      const product = getProductById(routeId);
      if (product) {
        setResolvedProductData(product);
      }
    }
  }, [productData, routeId]);
  
  const initialContext: ChatContext = {
    vehicleId: itemId, // For backward compatibility
    vehicleName: itemName, // For backward compatibility
    inspectionId,
    itemId: itemId || routeId,
    itemName: itemName || resolvedProductData?.title,
    itemType,
    productData: resolvedProductData
  };
  
  const {
    messages,
    isLoading,
    initializeChat,
    processMessage,
    clearMessages
  } = useInspectionChat(initialContext);
  
  // Initialize the chat on first render
  useEffect(() => {
    initializeChat({
      ...initialContext,
      productData: resolvedProductData
    });
  }, [initializeChat, itemId, itemName, inspectionId, itemType, resolvedProductData]);
  
  // Handle sending messages
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    await processMessage(input);
    setInput('');
  };
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="p-0">
        <ChatHeader clearMessages={clearMessages} />
      </CardHeader>
      
      <Separator />
      
      <CardContent className="p-0">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </CardContent>
      
      <CardFooter className="p-4 pt-2">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder={getChatPlaceholder(itemType)}
        />
      </CardFooter>
    </Card>
  );
};
