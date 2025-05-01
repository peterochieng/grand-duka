
import { CategoryDetails } from '../types';

export const familyCategories: Record<string, CategoryDetails> = {
  'Baby Essentials': {
    titles: [
      'Premium Baby Stroller with Accessories', 
      'Complete Nursery Furniture Set', 
      'Organic Baby Clothing Collection',
      'High-End Baby Monitor System',
      'Baby Development Toy Bundle'
    ],
    descriptions: [
      'Luxury stroller with multiple configurations and premium accessories.',
      'Complete matching nursery set including crib, changing table, and wardrobe.',
      'Collection of organic cotton baby clothes for ages 0-24 months.',
      'Advanced baby monitoring system with night vision and breathing sensors.',
      'Comprehensive bundle of educational and developmental toys for babies.'
    ],
    priceRange: [200, 3000],
    conditions: ['New', 'Like New', 'Gently Used'],
    tags: ['baby', 'nursery', 'organic', 'premium', 'parenting']
  },
  'Pet Supplies': {
    titles: [
      'Premium Pet Bed Collection',
      'Luxury Pet Grooming Kit',
      'Automatic Pet Feeder System',
      'Designer Pet Carrier',
      'Smart Pet Monitoring System',
      'Organic Pet Food Bundle',
      'Interactive Pet Toy Set',
      'Pet Training Equipment'
    ],
    descriptions: [
      'High-quality pet bed collection with orthopedic support and premium materials.',
      'Complete pet grooming kit with professional-grade tools for home use.',
      'Smart automatic feeding system with portion control and scheduling features.',
      'Designer pet carrier with ventilation, safety features, and stylish appearance.',
      'Advanced monitoring system to track your pet\'s activity, health, and location.',
      'Bundle of organic, grain-free pet food formulated by veterinary nutritionists.',
      'Set of interactive toys designed to stimulate your pet\'s mind and encourage exercise.',
      'Professional-grade training equipment for pets of all ages and breeds.'
    ],
    priceRange: [40, 1000],
    conditions: ['New', 'Like New', 'Unopened', 'Barely Used'],
    tags: ['pets', 'dogs', 'cats', 'pet care', 'premium', 'organic', 'pet health']
  }
};
