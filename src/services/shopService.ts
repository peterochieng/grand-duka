
import { supabase } from '@/integrations/supabase/client';
import { ShopRow } from '@/lib/types/supabaseTypes';
import { enhancedShops as mockShops } from '@/data/enhancedShops';

export const getShops = async (): Promise<ShopRow[]> => {
  try {
    const { data, error } = await supabase
      .from('shops')
      .select('*');

    if (error) {
      console.error('Error fetching shops from database:', error);
      // Fall back to mock data
      return mockShops.map(shop => ({
        id: shop.id,
        name: shop.name,
        image: shop.image,
        description: shop.description,
        rating: shop.rating,
        verified: shop.verified,
        type: shop.type,
        categories: shop.categories,
        item_count: shop.itemCount,
        location: shop.location,
        status: 'active',
        revenue: 0,
        owner_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    }

    return data as ShopRow[] || [];
  } catch (e) {
    console.error('Exception in getShops:', e);
    // Fall back to mock data
    return mockShops.map(shop => ({
      id: shop.id,
      name: shop.name,
      image: shop.image,
      description: shop.description,
      rating: shop.rating,
      verified: shop.verified,
      type: shop.type,
      categories: shop.categories,
      item_count: shop.itemCount,
      location: shop.location,
      status: 'active',
      revenue: 0,
      owner_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  }
};

export const getShopById = async (id: string): Promise<ShopRow | null> => {
  try {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching shop from database:', error);
      // Find in mock data
      const mockShop = mockShops.find(s => s.id === id);
      if (!mockShop) return null;
      
      return {
        id: mockShop.id,
        name: mockShop.name,
        image: mockShop.image,
        description: mockShop.description,
        rating: mockShop.rating,
        verified: mockShop.verified,
        type: mockShop.type,
        categories: mockShop.categories,
        item_count: mockShop.itemCount,
        location: mockShop.location,
        status: 'active',
        revenue: 0,
        owner_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    return data as ShopRow;
  } catch (e) {
    console.error('Exception in getShopById:', e);
    // Find in mock data
    const mockShop = mockShops.find(s => s.id === id);
    if (!mockShop) return null;
    
    return {
      id: mockShop.id,
      name: mockShop.name,
      image: mockShop.image,
      description: mockShop.description,
      rating: mockShop.rating,
      verified: mockShop.verified,
      type: mockShop.type,
      categories: mockShop.categories,
      item_count: mockShop.itemCount,
      location: mockShop.location,
      status: 'active',
      revenue: 0,
      owner_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};
