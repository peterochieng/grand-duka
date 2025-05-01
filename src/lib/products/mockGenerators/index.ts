
import { Product } from '../../types';
import { createMockProduct } from './productGenerator';

/**
 * Generates mock products for a specific category
 * @param category The category to generate products for
 * @param count The number of products to generate
 * @returns An array of mock products
 */
export const generateMockProductsForCategory = (
  category: string,
  count: number
): Product[] => {
  const mockProducts: Product[] = [];
  
  // For Specialty Services, generate more products than requested
  // Min 8 for Specialty Services, otherwise use the requested count
  const actualCount = category === 'Specialty Services' ? Math.max(count, 8) : count;
  
  for (let i = 0; i < actualCount; i++) {
    // Create a unique product for each index
    const product = createMockProduct(category, i);
    mockProducts.push(product);
  }
  
  return mockProducts;
};

// Re-export for backwards compatibility
export * from './categoryDetails';
export * from './productGenerator';
