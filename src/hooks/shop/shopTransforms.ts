
import { supabase } from '@/integrations/supabase/client';
import { Shop, ShopRow } from '@/types/shopTypes';

// Transform shop data from database format to application format
export const transformApiDataToShops = (shopRows: ShopRow[]): Shop[] => {
  return shopRows.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    owner_id: row.owner_id,
    type: row.type,
    categories: row.categories,
    item_count: row.item_count,
    location: row.location,
    status: row.status,
    verified: row.verified,
    rating: row.rating,
    revenue: row.revenue,
    image: row.image,
    created_at: row.created_at,
    updated_at: row.updated_at,
    featured: false, // Added missing required field
    recommended: false,
    hasPerks: false,
    owner: {
      id: row.owner_id || '',
      name: 'Shop Owner', // Placeholder - in a real app, would fetch from user profile
    }
  }));
};

// Fetch shops from the database
export const getShops = async (): Promise<Shop[]> => {
  try {
    const { data: shopRows, error } = await supabase
      .from('shops')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching shops:', error);
      throw error;
    }
    
    return transformApiDataToShops(shopRows || []);
  } catch (err) {
    console.error('Exception in getShops:', err);
    return [];
  }
};
