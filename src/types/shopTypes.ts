
export interface Shop {
  id: string;
  name: string;
  type: string;
  owner_id: string | null;
  status: string;
  item_count: number;
  verified: boolean;
  featured: boolean;
  recommended: boolean;
  hasPerks: boolean;
  created_at: string;
  updated_at: string;
  revenue: number;
  rating: number;
  location: string;
  description: string;
  image: string;
  categories: string[];
}

export type ShopFilter = 'all' | 'verified' | 'featured';

export interface ShopRow {
  id: string;
  name: string;
  type: string;
  owner_id: string | null;
  status: string;
  item_count: number;
  verified: boolean;
  featured?: boolean;
  recommended?: boolean;
  has_perks?: boolean;
  created_at: string;
  updated_at: string;
  revenue: number;
  rating: number;
  location: string;
  description: string;
  image: string;
  categories: string[];
}

export type ShopUpdateFields = {
  status?: string;
  verified?: boolean;
  featured?: boolean;
  recommended?: boolean;
  has_perks?: boolean;
  updated_at?: string;
};
