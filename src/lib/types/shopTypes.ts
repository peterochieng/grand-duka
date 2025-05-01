
export type PerkType = 'fee_discount' | 'visibility_boost' | 'featured_listing' | 'priority_support' | 'extended_listing_duration';

export interface ShopPerk {
  id: string;
  name: string;
  description: string | null;
  perk_type: PerkType;
  value: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShopPerkAssignment {
  id: string;
  shop_id: string;
  perk_id: string;
  assigned_by: string | null;
  assigned_at: string;
  expires_at: string | null;
  is_active: boolean;
}
