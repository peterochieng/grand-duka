
// Re-export all category details from the modular files
import { CategoryDetails } from './types';
import { homeCategories } from './categories/homeCategories';
import { collectiblesCategories } from './categories/collectiblesCategories';
import { leisureCategories } from './categories/leisureCategories';
import { familyCategories } from './categories/familyCategories';
import { serviceCategories } from './categories/serviceCategories';
import { mediaCategories } from './categories/mediaCategories';
import { healthCategories } from './categories/healthCategories';
import { vehicleCategories } from './categories/vehicleCategories';
import { gamingCategories } from './categories/gamingCategories';
import { businessCategories } from './categories/businessCategories';

// Combine all category details into a single map
export const categoryDetailsMap: Record<string, CategoryDetails> = {
  ...homeCategories,
  ...collectiblesCategories,
  ...leisureCategories,
  ...familyCategories,
  ...serviceCategories,
  ...mediaCategories,
  ...healthCategories,
  ...vehicleCategories,
  ...gamingCategories,
  ...businessCategories,
  'Music Services': leisureCategories['Music Services'],
  'Music Equipment Rental': leisureCategories['Music Equipment Rental']
};

// Re-export the CategoryDetails interface for backward compatibility
export type { CategoryDetails };
