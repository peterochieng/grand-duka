
import { ProductListing } from './types';
import { vehicleListings } from './vehicleListings';
import { electronicsListings } from './electronicsListings';
import { fashionListings } from './fashionListings';
import { miscListings } from './miscListings';
import { businessListings } from './businessListings';

// Combine all product listings from different categories
export const productListings: ProductListing[] = [
  ...vehicleListings,
  ...electronicsListings,
  ...fashionListings,
  ...miscListings,
  ...businessListings
];

// Re-export all types and category-specific listings
export * from './types';
export * from './vehicleListings';
export * from './electronicsListings';
export * from './fashionListings';
export * from './miscListings';
export * from './businessListings';
