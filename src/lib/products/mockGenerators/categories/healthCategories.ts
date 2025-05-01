
import { CategoryDetails } from '../types';

export const healthCategories: Record<string, CategoryDetails> = {
  'Health & Beauty': {
    titles: [
      'Luxury Skincare Collection',
      'Professional Makeup Kit',
      'Organic Wellness Package',
      'Premium Hair Care Set',
      'Spa Treatment Bundle',
      'Natural Beauty Essentials',
      'Aromatherapy Collection',
      'High-End Perfume Set'
    ],
    descriptions: [
      'Complete luxury skincare collection with serums, creams, and treatments using premium ingredients.',
      'Professional-grade makeup kit with brushes and palette used by industry professionals.',
      'Comprehensive wellness package featuring organic supplements and natural remedies.',
      'Advanced hair care set with treatments and styling products for all hair types.',
      'Luxury spa treatment bundle with bath oils, face masks, and relaxation essentials.',
      'All-natural beauty products made with organic ingredients and sustainable packaging.',
      'Full aromatherapy collection with essential oils and diffusers for stress relief and relaxation.',
      'Collection of designer fragrances perfect for any occasion or season.'
    ],
    priceRange: [80, 2000],
    conditions: ['New', 'Sealed', 'Unopened', 'Limited Edition'],
    tags: ['beauty', 'skincare', 'wellness', 'organic', 'luxury', 'spa', 'self-care']
  }
};
