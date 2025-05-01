
import { CategoryDetails } from '../types';

export const collectiblesCategories: Record<string, CategoryDetails> = {
  'Collectibles & Art': {
    titles: [
      'Vintage Middle Eastern Artwork', 
      'Limited Edition Sculpture', 
      'Rare Coin Collection',
      'Antique Persian Carpet',
      'Signed Celebrity Memorabilia',
      'Contemporary Abstract Painting',
      'Japanese Wood Block Print',
      'Bronze Garden Sculpture',
      'Hand-woven Fiberware Basket',
      'Victorian Wall Decoration',
      'Art Deco Wall Mirror'
    ],
    descriptions: [
      'Authentic vintage artwork showcasing Middle Eastern culture and heritage.',
      'Handcrafted sculpture by renowned artist, limited to only 100 pieces worldwide.',
      'Complete collection of rare coins from the early Ottoman Empire period.',
      'Exquisite handwoven Persian carpet with intricate designs and natural dyes.',
      'One-of-a-kind signed memorabilia with certificate of authenticity.',
      'Bold and colorful abstract painting by emerging contemporary artist.',
      'Traditional Japanese woodblock print with vibrant colors and detailed craftsmanship.',
      'Weather-resistant bronze sculpture perfect for garden or outdoor display.',
      'Handcrafted fiberware basket made using traditional weaving techniques.',
      'Ornate Victorian-era wall decoration with gold leaf detailing.',
      'Geometric Art Deco wall mirror with beveled glass and brass frame.'
    ],
    priceRange: [1000, 50000],
    conditions: ['Mint', 'Excellent', 'Good', 'Fair'],
    tags: ['collectible', 'art', 'investment', 'rare', 'limited edition', 'home decor', 'wall art', 'sculpture']
  },
  'Antiques': {
    titles: [
      'Antique Arabian Coffee Set', 
      '19th Century Writing Desk', 
      'Victorian Era Pocket Watch',
      'Authentic Ottoman Era Artifacts',
      'Antique Islamic Calligraphy Art'
    ],
    descriptions: [
      'Authentic Arabian coffee set with intricate designs dating back to early 20th century.',
      'Beautifully preserved writing desk from the 19th century with original hardware.',
      'Rare pocket watch from the Victorian era in working condition with original chain.',
      'Collection of authenticated artifacts from the Ottoman Empire period.',
      'Exquisite Islamic calligraphy artwork with gold leaf detailing from the 18th century.'
    ],
    priceRange: [1000, 25000],
    conditions: ['Excellent', 'Good', 'Fair', 'Restored'],
    tags: ['antique', 'vintage', 'historical', 'collectible', 'rare']
  }
};
