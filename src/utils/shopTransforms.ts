
import { Shop, ShopRow } from '@/types/shopTypes';

export const transformShopData = (shop: ShopRow): Shop => ({
  id: shop.id,
  name: shop.name,
  type: shop.type,
  owner_id: shop.owner_id,
  status: shop.status,
  item_count: shop.item_count || 0,
  verified: Boolean(shop.verified),
  featured: Boolean(shop.featured),
  recommended: Boolean(shop.recommended),
  hasPerks: Boolean(shop.has_perks),
  created_at: shop.created_at,
  updated_at: shop.updated_at,
  revenue: shop.revenue || 0,
  rating: shop.rating || 0,
  location: shop.location || '',
  description: shop.description || '',
  image: shop.image || '',
  categories: shop.categories || []
});
