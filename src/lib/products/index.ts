
import { Product } from '../types';
import { featuredProducts } from './featuredProducts';
import { generalProducts } from './generalProducts';
import { vehicleProducts } from '../vehicles';

// Combine all products
export const products: Product[] = [
  ...featuredProducts,
  ...generalProducts,
  ...vehicleProducts
];

// Re-export everything
export * from './featuredProducts';
export * from './generalProducts';
export * from './productUtils';
