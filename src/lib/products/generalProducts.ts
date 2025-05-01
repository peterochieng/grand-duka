import { Product } from '../types';

export const generalProducts: Product[] = [
  {
    id: '7',
    title: 'Samsung 65" Neo QLED 4K Smart TV',
    price: 5899,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Samsung 65" Neo QLED 4K Smart TV with Quantum HDR, Ultra Viewing Angle, and Anti-Reflection technology.',
    seller: {
      id: 'seller7',
      name: 'Electronics Superstore',
      rating: 4.7,
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
        price: 5899
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Electronics',
    tags: ['tv', 'samsung', '4k', 'smart tv'],
    shipping: 100,
    createdAt: '2023-09-12T15:30:00Z',
    updatedAt: '2023-09-12T15:30:00Z', // Added updatedAt property
  },
  {
    id: '8',
    title: 'Bose QuietComfort 45 Noise Cancelling Headphones',
    price: 1399,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Bose QuietComfort 45 wireless noise cancelling headphones with high-fidelity audio and up to 24 hours of battery life.',
    seller: {
      id: 'seller8',
      name: 'Sound & Vision',
      rating: 4.6,
      verified: true,
    },
    condition: 'New',
    location: 'Sharjah',
    listingType: 'fixed',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 1399
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Electronics',
    tags: ['headphones', 'bose', 'audio', 'noise cancelling'],
    shipping: 0,
    createdAt: '2023-09-08T17:45:00Z',
    updatedAt: '2023-09-08T17:45:00Z', // Added updatedAt property
  },
  {
    id: '9',
    title: 'Dyson V15 Detect Absolute Vacuum Cleaner',
    price: 2599,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1597861405049-0b011428568f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Dyson V15 Detect Absolute vacuum with laser dust detection, intelligent power optimization, and up to 60 minutes of run time.',
    seller: {
      id: 'seller9',
      name: 'Home Appliances Plus',
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
        price: 2599
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Home & Garden',
    tags: ['vacuum', 'dyson', 'appliance', 'cleaning'],
    shipping: 50,
    createdAt: '2023-09-14T12:20:00Z',
    updatedAt: '2023-09-14T12:20:00Z', // Added updatedAt property
  },
  {
    id: '10',
    title: 'DJI Mavic 3 Pro Drone Fly More Combo',
    price: 7999,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'DJI Mavic 3 Pro Fly More Combo with Hasselblad camera, 4/3 CMOS sensor, and up to 46 minutes of flight time.',
    seller: {
      id: 'seller10',
      name: 'Drone Zone',
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
        price: 7999
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Electronics',
    tags: ['drone', 'dji', 'camera', 'photography'],
    shipping: 0,
    createdAt: '2023-09-16T14:15:00Z',
    updatedAt: '2023-09-16T14:15:00Z', // Added updatedAt property
  },
];

// Add this line at the end:
// Set updatedAt for each general product that doesn't have it explicitly set
generalProducts.forEach(product => {
  if (!product.updatedAt) {
    product.updatedAt = product.createdAt; // Default to createdAt if updatedAt is not set
  }
});
