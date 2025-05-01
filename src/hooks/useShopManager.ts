
import { Shop, ShopFilter } from '@/types/shopTypes';
import { useShopQuery } from './shop/useShopQuery';
import { useShopMutations } from './shop/useShopMutations';

export const useShopManager = () => {
  const { 
    shops, 
    loading, 
    error, 
    filter, 
    setFilter, 
    refresh 
  } = useShopQuery();
  
  const {
    updateShopStatus,
    toggleShopVerification,
    toggleShopFeatured
  } = useShopMutations();

  const handleToggleVerification = async (shopId: string, currentValue: boolean) => {
    const success = await toggleShopVerification(shopId, currentValue);
    if (success) refresh();
  };

  const handleToggleFeatured = async (shopId: string, currentValue: boolean) => {
    const success = await toggleShopFeatured(shopId, currentValue);
    if (success) refresh();
  };

  return {
    shops,
    loading,
    error,
    filter,
    setFilter,
    updateShopStatus,
    toggleShopVerification: handleToggleVerification,
    toggleShopFeatured: handleToggleFeatured
  };
};

export type { Shop, ShopFilter };
