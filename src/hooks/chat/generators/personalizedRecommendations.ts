
import { ChatContext } from '@/lib/types';

/**
 * Generate personalized recommendations based on user query and context
 */
export const getPersonalizedRecommendations = (query: string, context: ChatContext): string | null => {
  const lcQuery = query.toLowerCase();
  
  // Vehicle recommendations
  if (lcQuery.includes('recommend') && lcQuery.includes('car')) {
    return "Based on your browsing history, you might be interested in the Toyota Land Cruiser or Nissan Patrol. Both offer excellent reliability and are popular in the UAE. Would you like more specific recommendations based on your budget or needs?";
  }
  
  // Price recommendations
  if (lcQuery.includes('good price') || lcQuery.includes('fair price') || lcQuery.includes('should i pay')) {
    return "For this type of item, the current market rate in UAE is typically between AED 50,000-65,000 depending on condition and features. If you're getting it for less than AED 55,000 in this condition, it's generally considered a good deal.";
  }
  
  // Negotiation advice
  if (lcQuery.includes('negotiate') || lcQuery.includes('offer') || lcQuery.includes('counteroffer')) {
    return "When negotiating for this item, consider starting with an offer about 10-15% below the asking price. Highlighting the market rate and any minor issues from the inspection can help support your offer. Be prepared to meet in the middle for a fair deal.";
  }
  
  // Similar items
  if (lcQuery.includes('similar') || lcQuery.includes('alternative') || lcQuery.includes('other options')) {
    return "There are currently 5 similar listings on the platform. The Toyota Prado is a popular alternative at a slightly lower price point, while the Lexus LX offers more luxury features at a higher price. Would you like me to show you these alternatives?";
  }
  
  // Trending items
  if (lcQuery.includes('popular') || lcQuery.includes('trending') || lcQuery.includes('best selling')) {
    return "Currently, the most popular items in this category are the Toyota Land Cruiser, Nissan Patrol, and Ford Expedition. Electric vehicles like the Tesla Model Y are also gaining popularity in the UAE market.";
  }
  
  // Default personalized message
  if (context.itemName) {
    return `Based on your interest in the ${context.itemName}, you might also like to explore our premium selection of similar items. We have several options that match your browsing patterns with excellent condition ratings.`;
  }
  
  return null;
};
