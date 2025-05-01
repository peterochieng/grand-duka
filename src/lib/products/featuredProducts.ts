import { Product } from '../types';

export const featuredProducts: Product[] = [
  {
    id: '1',
    title: 'Apple MacBook Pro 14" M2 Pro Chip (2023)',
    price: 2499,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'The MacBook Pro features a brilliant Liquid Retina XDR display, M2 Pro chip, up to 32GB of memory, and amazing battery life.',
    seller: {
      id: 'seller1',
      name: 'Premium Tech UAE',
      rating: 4.9,
      verified: true,
    },
    condition: 'New',
    location: 'Dubai',
    listingType: 'fixed',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 2499
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Electronics',
    tags: ['laptop', 'apple', 'macbook', 'premium'],
    shipping: 0,
    featured: true,
    createdAt: '2023-09-15T14:30:00Z',
    updatedAt: '2023-09-15T14:30:00Z',
  },
  {
    id: '2',
    title: 'Vintage Rolex Submariner 16610 - Box & Papers',
    price: 8500,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1548171915-94fc44e565a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'A classic Rolex Submariner ref. 16610 in excellent condition. Comes with original box, papers, and service history.',
    seller: {
      id: 'seller2',
      name: 'Luxury Watch Collector',
      rating: 4.8,
      verified: true,
    },
    condition: 'Pre-owned',
    location: 'Abu Dhabi',
    listingType: 'auction',
    timeLeft: '2d 14h',
    currentBid: 8500,
    listingTypes: {
      auction: {
        enabled: true,
        timeLeft: '2d 14h',
        currentBid: 8500,
        reservePrice: 7500
      },
      buyItNow: {
        enabled: true,
        price: 12000
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Watches',
    tags: ['luxury', 'watch', 'rolex', 'collectible'],
    shipping: 150,
    featured: true,
    createdAt: '2023-09-01T09:15:00Z',
    updatedAt: '2023-09-01T09:15:00Z',
  },
  {
    id: '3',
    title: 'Louis Vuitton Neverfull MM Monogram Canvas',
    price: 4800,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Authentic Louis Vuitton Neverfull MM in classic monogram canvas. In excellent condition, purchased in 2022.',
    seller: {
      id: 'seller3',
      name: 'Fashion Boutique UAE',
      rating: 4.7,
      verified: true,
    },
    condition: 'Like New',
    location: 'Dubai',
    listingType: 'fixed',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 4800
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Fashion',
    tags: ['bag', 'luxury', 'designer', 'louis vuitton'],
    shipping: 75,
    featured: true,
    createdAt: '2023-09-10T11:45:00Z',
    updatedAt: '2023-09-10T11:45:00Z',
  },
  {
    id: '4',
    title: 'Sony PlayStation 5 Digital Edition - Brand New',
    price: 1799,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Brand new Sony PlayStation 5 Digital Edition. Factory sealed with 1 year warranty.',
    seller: {
      id: 'seller4',
      name: 'Gaming Hub',
      rating: 4.6,
      verified: true,
    },
    condition: 'New',
    location: 'Sharjah',
    listingType: 'offer',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 1799
      },
      bestOffer: {
        enabled: true,
        minOffer: 1500
      }
    },
    category: 'Gaming',
    tags: ['playstation', 'ps5', 'gaming', 'console'],
    shipping: 50,
    featured: true,
    createdAt: '2023-09-18T16:20:00Z',
    updatedAt: '2023-09-18T16:20:00Z',
  },
  {
    id: '5',
    title: '2022 Range Rover Sport Autobiography - Low Mileage',
    price: 465000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: '2022 Range Rover Sport Autobiography in pristine condition with only 8,000 km. Full service history and dealer warranty until 2026.',
    seller: {
      id: 'seller5',
      name: 'Premium Auto Gallery',
      rating: 4.9,
      verified: true,
    },
    condition: 'Like New',
    location: 'Dubai',
    listingType: 'fixed',
    listingTypes: {
      auction: {
        enabled: true,
        timeLeft: '3d 8h',
        currentBid: 425000,
        reservePrice: 450000
      },
      buyItNow: {
        enabled: true,
        price: 465000
      },
      bestOffer: {
        enabled: true,
        minOffer: 440000
      }
    },
    category: 'Vehicles',
    tags: ['luxury', 'car', 'range rover', 'suv'],
    shipping: 0,
    featured: true,
    createdAt: '2023-09-05T13:10:00Z',
    updatedAt: '2023-09-05T13:10:00Z',
  },
  {
    id: '6',
    title: 'iPhone 14 Pro Max 256GB - Graphite',
    price: 4299,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1663499482145-b56ca41e34fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Apple iPhone 14 Pro Max 256GB in Graphite. Brand new, sealed with Apple warranty.',
    seller: {
      id: 'seller6',
      name: 'iStore UAE',
      rating: 4.8,
      verified: true,
    },
    condition: 'New',
    location: 'Abu Dhabi',
    listingType: 'fixed',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 4299
      },
      bestOffer: {
        enabled: true,
        minOffer: 4000
      }
    },
    category: 'Electronics',
    tags: ['apple', 'iphone', 'smartphone', 'mobile'],
    shipping: 0,
    featured: true,
    createdAt: '2023-09-20T10:00:00Z',
    updatedAt: '2023-09-20T10:00:00Z',
  },
];

featuredProducts.forEach(product => {
  if (!product.updatedAt) {
    product.updatedAt = product.createdAt;
  }
});
