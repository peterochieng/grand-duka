
import { Product } from '@/lib/types';

// Helper function to check if product has multiple listing types
export const hasMultipleListingTypes = (product: Product) => {
  if (!product.listingTypes) return false;
  
  let enabledCount = 0;
  if (product.listingTypes.auction?.enabled) enabledCount++;
  if (product.listingTypes.buyItNow?.enabled) enabledCount++;
  if (product.listingTypes.bestOffer?.enabled) enabledCount++;
  
  return enabledCount > 1;
};
