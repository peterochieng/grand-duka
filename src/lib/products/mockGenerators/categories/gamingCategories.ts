
import { CategoryDetails } from '../types';

export const gamingCategories: Record<string, CategoryDetails> = {
  'Gaming': {
    titles: [
      'Pro Gaming Headset with Noise Cancellation',
      'RGB Mechanical Gaming Keyboard',
      'Ultra HD Gaming Monitor 144Hz',
      'Premium Gaming Controller',
      'USB Microphone for Streamers',
      'Gaming Console Charging Dock',
      'VR Gaming Headset',
      'Gaming PC Bundle',
      'Limited Edition Console',
      'Ergonomic Gaming Chair'
    ],
    descriptions: [
      'Premium gaming headset with noise cancellation technology and surround sound.',
      'RGB mechanical keyboard with customizable keys and anti-ghosting technology.',
      'Ultra HD gaming monitor with 144Hz refresh rate and 1ms response time.',
      'Professional gaming controller with programmable buttons and enhanced grip.',
      'High-quality USB microphone perfect for gaming and streaming.',
      'Multi-device charging dock for gaming controllers with LED indicators.',
      'Immersive VR headset with high-resolution display and motion tracking.',
      'Complete gaming PC bundle with RGB lighting and latest generation components.',
      'Limited edition gaming console with exclusive design and bonus content.',
      'Ergonomic gaming chair with lumbar support and adjustable armrests.'
    ],
    priceRange: [50, 3000],
    conditions: ['New', 'Like New', 'Good', 'Used'],
    tags: ['gaming', 'accessories', 'electronics', 'console', 'pc gaming', 'headset', 'controller']
  },
  'Gaming Accessories': {
    titles: [
      'Professional Gaming Headset',
      'Gaming Microphone with Stand',
      'Pro Gaming Controller',
      'Gaming Console Charging Station',
      'Curved Gaming Monitor 32-inch',
      'Limited Edition Console Skin',
      'RGB Gaming Mouse',
      'Wireless Gaming Earbuds',
      'Gaming Laptop Cooling Pad',
      'Gaming Glasses with Blue Light Filter'
    ],
    descriptions: [
      'Premium gaming headset with 7.1 surround sound and comfortable ear cups.',
      'Professional microphone for gamers and streamers with noise cancellation.',
      'Responsive controller with customizable buttons and extended battery life.',
      'Dual charging station for console controllers with fast charging capability.',
      'Immersive curved gaming monitor with high refresh rate and HDR support.',
      'Custom designed skin for gaming console with premium vinyl material.',
      'Precision gaming mouse with adjustable DPI and programmable buttons.',
      'Low-latency wireless earbuds designed specifically for gaming.',
      'Cooling pad with multiple fans to prevent gaming laptop overheating.',
      'Gaming glasses that reduce eye strain during long gaming sessions.'
    ],
    priceRange: [20, 800],
    conditions: ['New', 'Like New', 'Good', 'Used'],
    tags: ['gaming accessories', 'headset', 'microphone', 'controller', 'monitor', 'console', 'peripherals']
  }
};
