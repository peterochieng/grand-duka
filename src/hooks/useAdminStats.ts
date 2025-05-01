
import { useState, useEffect } from 'react';
import { useDefaultStats } from './admin/useDefaultStats';
import { useSupportStats } from './admin/useSupportStats';
import { AdminStatsData, SupportStatsData } from './admin/types/statsTypes';

export type { AdminStatsData, SupportStatsData };

export const useAdminStats = (role?: string | null) => {
  const { loading: defaultLoading, stats: defaultStats } = useDefaultStats();
  const { loading: supportLoading, stats: supportStats } = useSupportStats();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Combined loading state from both hooks
    setLoading(defaultLoading || supportLoading);
  }, [defaultLoading, supportLoading]);

  return {
    loading,
    defaultStats,
    supportStats,
    isSupport: role === 'support-admin'
  };
};
