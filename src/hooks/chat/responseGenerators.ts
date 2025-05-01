
import { generateInspectionResponse } from './generators/inspectionResponses';
import { getPersonalizedRecommendations } from './generators/personalizedRecommendations';
import { generateProductSpecificResponse, generateTemplateResponse } from './generators/productResponses';
import { ChatContext } from '@/lib/types';

/**
 * Main response generator that routes to specific generators based on query and context
 */
export const generateChatResponse = (userQuery: string, context: ChatContext): string => {
  // First check if we need to handle inspection-specific queries
  if (context.inspectionId) {
    const inspectionResponse = generateInspectionResponse(userQuery, context);
    if (inspectionResponse) return inspectionResponse;
  }
  
  // Check if we have product-specific context
  if (context.productData) {
    const productResponse = generateProductSpecificResponse(userQuery, context.productData);
    if (productResponse) return productResponse;
  }
  
  // Check if we need to provide template information
  const templateResponse = generateTemplateResponse(userQuery);
  if (templateResponse) return templateResponse;
  
  // Get personalized recommendations if no specific answer was found
  const personalizedResponse = getPersonalizedRecommendations(userQuery, context);
  if (personalizedResponse) return personalizedResponse;
  
  // Default fallback response
  return "I don't have specific information about that. Is there something else about this product or inspection I can help you with?";
};
