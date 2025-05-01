
// Re-export traders, commodities, and utility functions from their respective files
// This maintains backward compatibility with existing imports

import { traders } from './data/traders';
import { commodities } from './data/commodities';
import { 
  getTraderById, 
  getCommodityById, 
  getCommoditiesByTrader, 
  getTradersBySpecialty 
} from './utils/traderUtils';

export { 
  traders, 
  commodities, 
  getTraderById, 
  getCommodityById, 
  getCommoditiesByTrader, 
  getTradersBySpecialty 
};
