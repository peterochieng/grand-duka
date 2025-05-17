
import { Product } from '../types';
import { productListings } from '@/data/listings';
import { products } from './index';
import { convertListingToProduct } from './listingConverter';
import { generateMockProductsForCategory } from './mockGenerators';
import { supabase } from '@/integrations/supabase/client';

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

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  if (!category) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
    console.log(data);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  return data as any || [];
};


// This function fetches all products from the database.
export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false }); // Adjust the order if needed
 console.log(data);
  if (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
  return data as any || [];
};

// Use this function in your search query to filter products.
export const getProducts = async (query: string): Promise<Product[]> => {
  // Get all products from the database
  const allProducts = await fetchAllProducts();
  
  // If no search query is provided, return all products
  if (!query.trim()) return allProducts;
  
  // Filter the products based on query matching in title or description
  return allProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
};