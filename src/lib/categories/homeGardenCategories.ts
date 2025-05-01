
import { Category } from '../types';
import { ExtendedCategory } from '../types/extendedCategoryTypes';

export const homeGardenCategories: Category[] = [
  {
    id: '6',
    name: 'Home & Garden',
    icon: 'Sofa',
    count: 4328,
    specialSubcategories: {
      'Indoor': [
        'Furniture',
        'Decor',
        'Kitchen',
        'Bathroom',
        'Bedroom',
        'Lighting',
        'Appliances',
        'Storage'
      ],
      'Outdoor': [
        'Patio Furniture',
        'Garden Tools',
        'Plants & Seeds',
        'Outdoor Decor',
        'BBQ & Outdoor Cooking',
        'Pools & Spas',
        'Outdoor Lighting',
        'Lawn Care'
      ]
    }
  } as ExtendedCategory
];
