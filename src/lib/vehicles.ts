import { Product } from './types';

export const vehicleProducts: Product[] = [
  {
    id: 'v1',
    title: '2021 Tesla Model 3 Standard Range Plus',
    price: 175000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Tesla Model 3 in excellent condition with only 15,000 km. Full service history, still under warranty.',
    seller: {
      id: 'seller21',
      name: 'EV Specialists Dubai',
      rating: 4.8,
      verified: true,
    },
    condition: 'Used',
    location: 'Dubai',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 175000
      },
      bestOffer: {
        enabled: true,
        minOffer: 165000
      }
    },
    category: 'Vehicles',
    tags: ['car', 'electric', 'tesla', 'model 3'],
    shipping: 0,
    createdAt: '2023-09-18T08:30:00Z',
    updatedAt: '2023-09-18T08:30:00Z', // Added updatedAt property
  },
  {
    id: 'v2',
    title: '2022 Ducati Panigale V4 - Only 1,200 km',
    price: 120000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Pristine Ducati Panigale V4 in Racing Red. Comes with Akrapovic exhaust, racing ECU, and service documentation.',
    seller: {
      id: 'seller22',
      name: 'Motorcycle Paradise',
      rating: 4.9,
      verified: true,
    },
    condition: 'Like New',
    location: 'Abu Dhabi',
    listingTypes: {
      auction: {
        enabled: true,
        timeLeft: '3d 6h',
        currentBid: 115000,
        reservePrice: 118000
      },
      buyItNow: {
        enabled: true,
        price: 120000
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Vehicles',
    tags: ['motorcycle', 'sport', 'ducati', 'panigale'],
    shipping: 0,
    createdAt: '2023-09-16T11:20:00Z',
    updatedAt: '2023-09-16T11:20:00Z', // Added updatedAt property
  },
  {
    id: 'v3',
    title: '2020 Sea Ray 320 Sundancer - Excellent Condition',
    price: 820000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Beautiful Sea Ray 320 Sundancer with twin 350hp Mercury engines. Low hours, fully serviced, and ready for the water.',
    seller: {
      id: 'seller23',
      name: 'Premium Marine Dubai',
      rating: 4.7,
      verified: true,
    },
    condition: 'Used',
    location: 'Dubai Marina',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 820000
      },
      bestOffer: {
        enabled: true,
        minOffer: 780000
      }
    },
    category: 'Vehicles',
    tags: ['boat', 'sea ray', 'yacht', 'marine'],
    shipping: 0,
    createdAt: '2023-09-14T15:10:00Z',
    updatedAt: '2023-09-14T15:10:00Z', // Added updatedAt property
  },
  {
    id: 'v4',
    title: 'BMW M3/M4 Carbon Fiber Front Splitter',
    price: 3500,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1611921059115-38327d1a3308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Genuine BMW M Performance carbon fiber front splitter for F80 M3 and F82 M4. Brand new in original packaging.',
    seller: {
      id: 'seller24',
      name: 'Performance Auto Parts',
      rating: 4.6,
      verified: true,
    },
    condition: 'New',
    location: 'Dubai',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 3500
      },
      bestOffer: {
        enabled: true,
        minOffer: 3000
      }
    },
    category: 'Vehicles',
    tags: ['parts', 'exterior', 'bmw', 'carbon fiber'],
    shipping: 75,
    createdAt: '2023-09-20T09:45:00Z',
    updatedAt: '2023-09-20T09:45:00Z', // Added updatedAt property
  },
  {
    id: 'v5',
    title: 'JL Audio 12W7AE-3 12-inch Subwoofer',
    price: 2200,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'JL Audio 12W7AE-3 12-inch subwoofer with 3-ohm voice coil. Premium sound quality for serious car audio enthusiasts.',
    seller: {
      id: 'seller25',
      name: 'Car Audio Specialists',
      rating: 4.8,
      verified: true,
    },
    condition: 'New',
    location: 'Sharjah',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 2200
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Vehicles',
    tags: ['parts', 'electronics', 'audio', 'subwoofer'],
    shipping: 50,
    createdAt: '2023-09-17T13:25:00Z',
    updatedAt: '2023-09-17T13:25:00Z', // Added updatedAt property
  },
  {
    id: 'v6',
    title: 'Ford Mustang GT 5.0 Coyote Engine - Complete',
    price: 28000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Complete Ford Mustang GT 5.0L Coyote Engine with only 15,000 km. Pulled from a 2019 Mustang GT. Includes all accessories and harness.',
    seller: {
      id: 'seller26',
      name: 'American Muscle Dubai',
      rating: 4.9,
      verified: true,
    },
    condition: 'Used',
    location: 'Dubai',
    listingTypes: {
      auction: {
        enabled: true,
        timeLeft: '5d 8h',
        currentBid: 25500,
        reservePrice: 27000
      },
      buyItNow: {
        enabled: true,
        price: 28000
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Vehicles',
    tags: ['parts', 'engine', 'ford', 'mustang'],
    shipping: 0,
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-09-15T10:30:00Z', // Added updatedAt property
  },
  {
    id: 'v7',
    title: 'Yamaha YZF-R1 2022 SuperSport - 500km only',
    price: 95000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Practically new Yamaha YZF-R1 in perfect condition. Still under warranty with all service records.',
    seller: {
      id: 'seller22',
      name: 'Motorcycle Paradise',
      rating: 4.9,
      verified: true,
    },
    condition: 'Like New',
    location: 'Dubai',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 95000
      },
      bestOffer: {
        enabled: true,
        minOffer: 85000
      }
    },
    category: 'Vehicles',
    tags: ['motorcycle', 'yamaha', 'r1', 'sportbike'],
    shipping: 0,
    createdAt: '2023-09-10T14:20:00Z',
    updatedAt: '2023-09-10T14:20:00Z', // Added updatedAt property
  },
  {
    id: 'v8',
    title: 'Bayliner Element E7 Boat 2021',
    price: 235000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Perfect family boat with low hours. Comes with trailer and all safety equipment.',
    seller: {
      id: 'seller23',
      name: 'Premium Marine Dubai',
      rating: 4.7,
      verified: true,
    },
    condition: 'Used',
    location: 'Dubai',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 235000
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Vehicles',
    tags: ['boat', 'bayliner', 'family boat'],
    shipping: 0,
    createdAt: '2023-09-05T11:30:00Z',
    updatedAt: '2023-09-05T11:30:00Z', // Added updatedAt property
  },
  {
    id: 'v9',
    title: 'Mercedes-Benz Actros 2022 Heavy Duty Truck',
    price: 580000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Commercial heavy duty truck with low mileage. Full service history and excellent condition.',
    seller: {
      id: 'seller26',
      name: 'American Muscle Dubai',
      rating: 4.9,
      verified: true,
    },
    condition: 'Used',
    location: 'Abu Dhabi',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 580000
      },
      bestOffer: {
        enabled: true,
        minOffer: 550000
      }
    },
    category: 'Vehicles',
    tags: ['truck', 'commercial', 'mercedes', 'actros'],
    shipping: 0,
    createdAt: '2023-09-08T09:45:00Z',
    updatedAt: '2023-09-08T09:45:00Z', // Added updatedAt property
  },
  {
    id: 'v10',
    title: 'Sea-Doo GTX 300 Limited - 2022',
    price: 75000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1626438307613-89153caf4f1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
    description: 'Top of the line personal watercraft with all the bells and whistles. Low hours and excellent condition.',
    seller: {
      id: 'seller23',
      name: 'Premium Marine Dubai',
      rating: 4.7,
      verified: true,
    },
    condition: 'Used',
    location: 'Dubai',
    listingTypes: {
      auction: {
        enabled: false
      },
      buyItNow: {
        enabled: true,
        price: 75000
      },
      bestOffer: {
        enabled: false
      }
    },
    category: 'Vehicles',
    tags: ['watercraft', 'sea-doo', 'jet ski'],
    shipping: 0,
    createdAt: '2023-09-12T15:20:00Z',
    updatedAt: '2023-09-12T15:20:00Z', // Added updatedAt property
  }
];

// Add this line at the end:
// Set updatedAt for each vehicle product that doesn't have it explicitly set
vehicleProducts.forEach(product => {
  if (!product.updatedAt) {
    product.updatedAt = product.createdAt; // Default to createdAt if updatedAt is not set
  }
});

export const vehicleSubcategoryMap = {
  'v1': 'cars',
  'v2': 'motorcycles',
  'v3': 'boats',
  'v4': 'parts',
  'v5': 'parts',
  'v6': 'parts',
  'v7': 'motorcycles',
  'v8': 'boats',
  'v9': 'trucks',
  'v10': 'watercraft',
};

// Apply subcategory tags to vehicle products
vehicleProducts.forEach(product => {
  const id = product.id;
  if (vehicleSubcategoryMap[id]) {
    product.tags.push(vehicleSubcategoryMap[id]);
  }
});
