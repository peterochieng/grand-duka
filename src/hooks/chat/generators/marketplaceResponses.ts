
import { ChatContext } from '@/lib/types';

/**
 * Generate marketplace relationship model responses
 */
export const generateMarketplaceResponse = (query: string): string | null => {
  const lcQuery = query.toLowerCase();
  
  // Retail buyer-seller relationship
  if (lcQuery.includes('retail relationship') || lcQuery.includes('retail buyer') || 
      (lcQuery.includes('retail') && lcQuery.includes('one to'))) {
    return "In our retail marketplace, we support a one-to-one or one-to-many relationship between buyers and listings. This means a buyer can purchase a single product listing (one-to-one) or multiple product listings (one-to-many) in separate transactions. Each retail listing is typically for a specific item that can be purchased by one buyer.";
  }
  
  // Wholesale buyer-seller relationship
  if (lcQuery.includes('wholesale relationship') || lcQuery.includes('wholesale buyer') || 
      (lcQuery.includes('wholesale') && lcQuery.includes('many to'))) {
    return "Our wholesale marketplace supports more complex relationships. Not only can one buyer purchase multiple listings (one-to-many), but multiple buyers can also purchase portions of a single bulk listing (many-to-one). This allows for partial fulfillment of large commodity orders, where multiple buyers can each claim a percentage or specific quantity from a single large-volume listing.";
  }
  
  // Quantity allocation in wholesale
  if (lcQuery.includes('partial purchase') || lcQuery.includes('proportion') || 
      (lcQuery.includes('wholesale') && lcQuery.includes('portion'))) {
    return "In wholesale trading, buyers can purchase a proportion or specific quantity of a bulk listing. For example, if a seller lists 1000 tons of a commodity, one buyer might purchase 300 tons while two other buyers purchase 400 tons and 300 tons respectively, together fulfilling the entire listing. This allows for efficient allocation of large-volume commodities to multiple buyers based on their specific needs.";
  }
  
  return null;
};
