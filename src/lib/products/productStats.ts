
import { Product } from '../types';
import { products } from './index';
import { productListings } from '@/data/listings';
import { convertListingToProduct } from './listingConverter';

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRecentProducts = (): Product[] => {
  // Get recent regular products
  const recentRegular = [...products].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Get recent business listings
  const recentBusinesses = productListings
    .filter(listing => listing.status === 'published')
    .map(convertListingToProduct)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  
  // Combine and take the most recent 6
  return [...recentRegular, ...recentBusinesses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);
};

export const getProductCountsByCategory = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  // Count products from the main products array
  products.forEach(product => {
    if (product.category) {
      const category = product.category;
      counts[category] = (counts[category] || 0) + 1;
    }
  });
  
  // Count products from business listings
  productListings
    .filter(listing => listing.status !== 'hidden' && listing.status !== 'rejected')
    .forEach(listing => {
      if (listing.category) {
        const category = listing.category;
        counts[category] = (counts[category] || 0) + 1;
      }
    });
  
  return counts;
};
