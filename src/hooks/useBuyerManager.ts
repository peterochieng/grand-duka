
import { useState, useEffect } from 'react';
import { getBuyers, Buyer } from '@/services/userService';

export const useBuyerManager = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        setLoading(true);
        const buyersData = await getBuyers();
        setBuyers(buyersData);
      } catch (err) {
        console.error('Error in useBuyerManager:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch buyers'));
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  return {
    buyers,
    loading,
    error
  };
};
