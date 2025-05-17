
import { Product } from '@/lib/types';
import { ProductQueryFilters, ProductQueryResult } from '@/services/product/types';
import { 
  getProducts as getProductsQuery,
  getProductById as getProductByIdQuery
} from '@/services/product/queries';
import {
  createProduct,
  updateProduct,
  deleteProduct
} from '@/services/product/mutations';
import {
  approveProduct,
  rejectProduct,
  getProductsByApprovalStatus
} from '@/services/product/approval';
import {
  getFeaturedProducts as getFeaturedProductsQuery,
  getRelatedProducts as getRelatedProductsQuery
} from '@/services/product/featured';

export const getProducts = async (filters?: ProductQueryFilters): Promise<ProductQueryResult> => {
  return await getProductsQuery(filters as any);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return await getProductByIdQuery(id);
};

export const getFeaturedProducts = async (limit: number = 6): Promise<Product[]> => {
  return await getFeaturedProductsQuery(limit);
};

export const getRelatedProducts = async (
  productId: string,
  category: string,
  limit: number = 4
): Promise<Product[]> => {
  return await getRelatedProductsQuery(productId, category, limit);
};

// Re-export other functions
export {
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  rejectProduct,
  getProductsByApprovalStatus
};
