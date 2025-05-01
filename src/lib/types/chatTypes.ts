
// Chat message type for the AI inspection chatbot
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

// Chat context type - expanded to handle any type of item
export interface ChatContext {
  vehicleId?: string; // Legacy support
  vehicleName?: string; // Legacy support
  inspectionId?: string;
  itemId?: string;
  itemName?: string;
  itemType?: string;
  productData?: any; // Full product data for detailed responses
}
