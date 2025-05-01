
import { Category } from '../types';

export const electronicsCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    icon: 'DeviceDesktop',
    count: 8547,
  },
  {
    id: '5',
    name: 'Watches',
    icon: 'Clock',
    count: 2165,
  },
  {
    id: '7',
    name: 'Gaming',
    icon: 'GamepadIcon',
    count: 1876,
    subcategories: [
      'Consoles',
      'Video Games',
      'Gaming Accessories',
      'PC Gaming',
      'Virtual Reality',
    ]
  }
];
