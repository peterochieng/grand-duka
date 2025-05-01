
import { Category } from '../types';
import { ExtendedCategory } from '../types/extendedCategoryTypes';

export const entertainmentCategories: Category[] = [
  {
    id: '10',
    name: 'Toys & Hobbies',
    icon: 'Toy',
    count: 3451,
  },
  {
    id: '12',
    name: 'Music',
    icon: 'Music',
    count: 2345,
  },
  {
    id: '14',
    name: 'Books, Movies & Music',
    icon: 'Library',
    count: 4256,
    specialSubcategories: {
      'Genres': [
        'Action',
        'Comedy',
        'Drama',
        'Horror',
        'Sci-Fi',
        'Documentary',
        'Animation',
        'Romance',
        'Thriller',
        'Fantasy'
      ],
      'Release Years': [
        'Before 1980',
        '1980-1989',
        '1990-1999',
        '2000-2009',
        '2010-2019',
        '2020-Present'
      ]
    }
  } as ExtendedCategory
];
