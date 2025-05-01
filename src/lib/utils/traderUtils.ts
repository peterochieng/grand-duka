
import { Trader, Commodity } from '../types';
import { traders } from '../data/traders';
import { commodities } from '../data/commodities';

// Trader utility functions
export const getTraderById = (id: string): Trader | undefined => {
  return traders.find(trader => trader.id === id);
};

export const getCommodityById = (id: string): Commodity | undefined => {
  return commodities.find(commodity => commodity.id === id);
};

export const getCommoditiesByTrader = (traderId: string): Commodity[] => {
  return commodities.filter(commodity => commodity.trader.id === traderId);
};

export const getTradersBySpecialty = (specialty: string): Trader[] => {
  return traders.filter(trader => trader.specialties.includes(specialty));
};
