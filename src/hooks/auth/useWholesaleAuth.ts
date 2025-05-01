
import { useState } from 'react';

export const useWholesaleAuth = () => {
  const [isTraderTeam, setIsTraderTeam] = useState(false);
  const [traderId, setTraderId] = useState('');

  return {
    isTraderTeam,
    setIsTraderTeam,
    traderId,
    setTraderId
  };
};
