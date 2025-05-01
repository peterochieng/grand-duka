
import { useState } from 'react';

export const useRetailAuth = () => {
  const [isShopEmployee, setIsShopEmployee] = useState(false);
  const [shopId, setShopId] = useState('');

  return {
    isShopEmployee,
    setIsShopEmployee,
    shopId,
    setShopId
  };
};
