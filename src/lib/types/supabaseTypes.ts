// Move these types from userTypes.ts to supabaseTypes.ts
export interface CategoryRow {
  id: string;
  name: string;
  description?: string;
  is_published: boolean;
  restricted: boolean;
  trading_type: string;
  parent_id?: string;
  created_at?: string;
  updated_at?: string;
  icon?: string;
  is_available_to_sellers?: boolean;
  requires_review?: boolean;
}

export interface SubcategoryRow {
  id: string;
  name: string;
  category_id?: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SellerRow {
  id: string;
  business_name: string;
  owner_name?: string;
  email: string;
  phone?: string;
  location: string;
  business_type: string;
  status: string;
  products_count: number;
  rating: number;
  verified: boolean;
  revenue: number;
  created_at: string;
  updated_at: string;
}

export interface ShopRow {
  id: string;
  name: string;
  description: string;
  owner_id?: string | null;
  type: string;
  categories: string[];
  item_count: number;
  location: string;
  status: string;
  verified: boolean;
  rating: number;
  revenue: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ProductRow {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  image?: string;
  condition?: string;
  location?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  seller_id: string;
  approval_status: string;
  approved_by?: string;
  approved_at?: string;
  featured: boolean;
  shipping: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  phone?: string;
  location?: string;
  about?: string;
  kyc_required?: boolean;
  kyc_status?: string;
  kyc_disabled_by?: string;
  kyc_disabled_at?: string;
  updated_at?: string;
}

export interface OrderRow {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  amount: number;
  shipping_fee: number;
  tax: number;
  total_amount: number;
  currency: string;
  status: string;
  payment_status: string;
  payment_method: string;
  transaction_id?: string;
  delivery_method: string;
  tracking_number?: string;
  shipping_address?: any;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentRow {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  provider: string;
  provider_payment_id?: string;
  status: string;
  payer_email?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface FeedbackRow {
  id: string;
  seller_id: string;
  buyer_id?: string;
  buyer_name: string;
  buyer_image?: string | null;
  rating: number;
  comment: string;
  created_at: string;
  verified_purchase: boolean;
  product_id?: string | null;
  product_name?: string | null;
  seller_response?: string | null;
  helpful: number;
}

export interface ProductDetailRow {
  product_id: string;
  detail_type: string;
  details: any;
  created_at: string;
  updated_at: string;
}

import { Product } from '@/lib/types';

export const convertProductRowToProduct = (row: ProductRow): Product => {
  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    price: row.price,
    currency: row.currency,
    image: row.image || '/placeholder.svg',
    condition: row.condition,
    location: row.location,
    category: row.category || 'Uncategorized',
    subcategory: row.subcategory,
    tags: row.tags || [],
    seller: {
      id: row.seller_id,
      name: 'Unknown',
      rating: 0,
      verified: false
    },
    featured: row.featured,
    shipping: row.shipping,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // Default empty listingTypes object to match Product type
    listingTypes: {
      auction: { enabled: false },
      buyItNow: { enabled: true, price: row.price },
      bestOffer: { enabled: false }
    }
  };
};
