
import { useState, useEffect } from 'react';
import { Shop, ShopFilter } from '@/types/shopTypes';
import { getShops, transformApiDataToShops } from './shopTransforms';

export const useShopQuery = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<ShopFilter>('all');

  useEffect(() => {
    fetchShops();
  }, [filter]);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const data = await getShops();
      
      // Apply filter if needed
      let filteredShops = data;
      if (filter === 'verified') {
        filteredShops = data.filter(shop => shop.verified);
      } else if (filter === 'featured') {
        filteredShops = data.filter(shop => shop.featured);
      }
      
      setShops(filteredShops);
      setError(null);
    } catch (err) {
      console.error('Error fetching shops:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch shops'));
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchShops();
  };

  return { shops, loading, error, filter, setFilter, refresh };
};
