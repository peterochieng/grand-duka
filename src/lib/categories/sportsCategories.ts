
import { Category } from '../types';
import { ExtendedCategory } from '../types/extendedCategoryTypes';

export const sportsCategories: Category[] = [
  {
    id: '9',
    name: 'Sporting Goods',
    icon: 'Dumbbell',
    count: 2876,
    specialSubcategories: {
      'Sporting Equipment': [
        'Team Sports',
        'Exercise & Fitness',
        'Golf',
        'Cycling',
        'Water Sports',
        'Winter Sports',
        'Camping & Hiking',
        'Racquet Sports'
      ],
      'Sporting Clothes': [
        'Athletic Shirts',
        'Pants & Shorts',
        'Jackets',
        'Swimwear',
        'Team Uniforms',
        'Athletic Shoes',
        'Sports Bras',
        'Athletic Socks'
      ],
      'Sporting Accessories': [
        'Water Bottles',
        'Sports Bags',
        'Fitness Trackers',
        'Protective Gear',
        'Training Aids',
        'Sports Sunglasses',
        'Hats & Headwear',
        'Sports Watches'
      ]
    }
  } as ExtendedCategory
];
