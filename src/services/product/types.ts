
import { Product } from '@/lib/types';
import { ProductRow } from '@/lib/types/supabaseTypes';

export interface ProductQueryFilters {
  category?: string;
  subcategory?: string;
  sellerId?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  search?: string;
}

export interface ProductQueryResult {
  products: Product[];
  count: number;
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
