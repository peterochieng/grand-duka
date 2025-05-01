
import { Product } from '../types';
import { productListings } from '@/data/listings';
import { products } from './index';
import { convertListingToProduct } from './listingConverter';
import { generateMockProductsForCategory } from './mockGenerators';

// Cache for mock products to ensure they're available to getProductById
const mockProductsCache: Record<string, Product[]> = {};

// Product utility functions
export const getProductById = (id: string): Product | undefined => {
  // First check in normal products
  const product = products.find(product => product.id === id);
  if (product) return product;
  
  // Check in mock products cache
  for (const categoryProducts of Object.values(mockProductsCache)) {
    const mockProduct = categoryProducts.find(product => product.id === id);
    if (mockProduct) return mockProduct;
  }
  
  // If not found, check in business listings
  const listing = productListings.find(listing => listing.id === id);
  if (listing && listing.status !== 'hidden' && listing.status !== 'rejected') {
    return convertListingToProduct(listing);
  }
  
  return undefined;
};

export const getProductsByCategory = (category: string): Product[] => {
  // Normalize category name for case-insensitive comparison
  const normalizedCategory = category.toLowerCase();
  
  // Special handling for Vehicle Parts category - map from different possible inputs
  let searchCategory = category;
  if (normalizedCategory === 'vehicles/parts' || normalizedCategory === 'vehicle parts') {
    searchCategory = 'Vehicle Parts';
  }
  
  // Filter regular products
  const regularProducts = products.filter(product => 
    product.category && product.category.toLowerCase() === normalizedCategory
  );
  
  // Filter business listings
  const businessProducts = productListings
    .filter(listing => 
      listing.category && 
      listing.category.toLowerCase() === normalizedCategory && 
      listing.status !== 'hidden' && 
      listing.status !== 'rejected'
    )
    .map(convertListingToProduct);
  
  // Combine both sources
  const combinedProducts = [...regularProducts, ...businessProducts];
  
  // If fewer than 3 products for important categories, generate mock ones
  const missingCategories = [
    'Real Estate', 
    'Collectibles & Art', 
    'Sporting Goods', 
    'Toys & Hobbies', 
    'Antiques', 
    'Baby Essentials', 
    'Specialty Services',
    'Books, Movies & Music',
    'Health & Beauty',
    'Pet Supplies',
    'Music',
    'Vehicle Parts'  // Added Vehicle Parts to the list of categories with mock products
  ];
  
  if (missingCategories.map(c => c.toLowerCase()).includes(normalizedCategory) || 
      searchCategory === 'Vehicle Parts') {
    
    if (combinedProducts.length < 3) {
      const mockCount = 3 - combinedProducts.length;
      
      // Check if we already have mock products for this category
      if (!mockProductsCache[searchCategory]) {
        // Generate and store new mock products
        mockProductsCache[searchCategory] = generateMockProductsForCategory(searchCategory, mockCount);
      }
      
      return [...combinedProducts, ...mockProductsCache[searchCategory]];
    }
  }
  
  return combinedProducts;
};
