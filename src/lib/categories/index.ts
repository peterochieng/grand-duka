
import { Category } from '../types';
import { homeGardenCategories } from './homeGardenCategories';
import { electronicsCategories } from './electronicsCategories';
import { vehicleCategories } from './vehicleCategories';
import { realEstateCategories } from './realEstateCategories';
import { fashionCategories } from './fashionCategories';
import { collectiblesCategories } from './collectiblesCategories';
import { sportsCategories } from './sportsCategories';
import { entertainmentCategories } from './entertainmentCategories';
import { businessCategories } from './businessCategories';
import { petFamilyCategories } from './petFamilyCategories';

// Combine all category arrays into a single array
export const categories: Category[] = [
  ...electronicsCategories,
  ...vehicleCategories,
  ...realEstateCategories,
  ...fashionCategories,
  ...homeGardenCategories,
  ...collectiblesCategories,
  ...sportsCategories,
  ...entertainmentCategories,
  ...businessCategories,
  ...petFamilyCategories
];

// Export individual category arrays for specific use cases
export {
  homeGardenCategories,
  electronicsCategories,
  vehicleCategories,
  realEstateCategories,
  fashionCategories,
  collectiblesCategories,
  sportsCategories,
  entertainmentCategories,
  businessCategories,
  petFamilyCategories
};
