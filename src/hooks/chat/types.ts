
import { ChatMessage, ChatContext } from '@/lib/types/chatTypes';

// Mock user preferences for personalized recommendations
export interface UserPreferences {
  interests: string[];
  priceRange: {
    min: number;
    max: number;
  };
  recentSearches: string[];
  purchaseHistory: string[];
}

// Mock inspection data - can be expanded for different item types
export interface InspectionDataItem {
  [key: string]: any;
}

export interface InspectionData {
  vehicle: InspectionDataItem;
  product: InspectionDataItem;
  commodity: InspectionDataItem;
  [key: string]: InspectionDataItem;
}

export interface ChatHookReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  context: ChatContext;
  setContext: (context: ChatContext) => void;
  initializeChat: (newContext?: ChatContext) => void;
  addUserMessage: (content: string) => ChatMessage | undefined;
  processMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}
