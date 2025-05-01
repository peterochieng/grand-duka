
import { useState, useCallback } from 'react';
import { ChatMessage, ChatContext } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { 
  generateProductSpecificResponse, 
  getPersonalizedRecommendations,
  generateInspectionResponse,
  generateTemplateResponse
} from './generators';
import { ChatHookReturn } from './types';

export const useInspectionChat = (initialContext?: ChatContext): ChatHookReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<ChatContext>(initialContext || {});
  const { toast } = useToast();

  // Determine the item type based on context or default to vehicle
  const getItemType = useCallback(() => {
    if (context.itemType) return context.itemType;
    // Try to infer type from other properties
    if (context.vehicleId || context.vehicleName) return 'vehicle';
    return 'product'; // Default fallback
  }, [context.itemType, context.vehicleId, context.vehicleName]);

  // Get a friendly name for the item being inspected
  const getItemName = useCallback(() => {
    return context.itemName || context.vehicleName || 'this item';
  }, [context.itemName, context.vehicleName]);

  // Extract product data for detailed responses
  const getProductData = useCallback(() => {
    return context.productData || null;
  }, [context.productData]);

  // Add initial welcome message if no messages exist
  const initializeChat = useCallback((newContext?: ChatContext) => {
    if (newContext) {
      setContext(newContext);
    }
    
    const itemName = newContext?.itemName || newContext?.vehicleName || context.itemName || context.vehicleName || 'this item';
    const itemType = newContext?.itemType || context.itemType || getItemType();
    
    let welcomeMessage = `Hello! I'm your product assistant for ${itemName}. You can ask me about details, condition, or any specific features. How can I help you today?`;
    
    // Customize welcome message based on item type
    if (itemType === 'vehicle') {
      welcomeMessage = `Hello! I'm your vehicle assistant for ${itemName}. You can ask me about the inspection results, condition, history, or any details you'd like to know. How can I help you today?`;
    } else if (itemType === 'commodity') {
      welcomeMessage = `Hello! I'm your commodity assistant for ${itemName}. You can ask me about quality, specifications, or market information. How can I help you today?`;
    }
    
    setMessages([{
      id: uuidv4(),
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date().toISOString()
    }]);
  }, [context.itemName, context.vehicleName, context.itemType, getItemType]);

  // Add a user message
  const addUserMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    const newMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Process user message and generate assistant response
  const processMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addUserMessage(content);
    setIsLoading(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get product data if available
      const productData = getProductData();
      
      // Try to generate product-specific response first
      let response = productData ? generateProductSpecificResponse(content, productData) : null;
      
      // If no product-specific response, try template response
      if (!response) {
        response = generateTemplateResponse(content);
      }
      
      // If no template response, try personalized recommendations
      if (!response) {
        response = getPersonalizedRecommendations(content, context);
      }
      
      // If no personalized recommendation, try inspection response
      if (!response) {
        response = generateInspectionResponse(content, context);
      }
      
      // If we still don't have a response, use a default
      if (!response) {
        const itemName = getItemName();
        response = `I'm not sure how to answer that about ${itemName}. Could you ask about the condition, details, or other specifics?`;
      }
      
      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [addUserMessage, getItemName, getProductData, context, toast]);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    initializeChat();
  }, [initializeChat]);

  return {
    messages,
    isLoading,
    context,
    setContext,
    initializeChat,
    addUserMessage,
    processMessage,
    clearMessages
  };
};
