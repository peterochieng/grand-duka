
import { CategoryDetails } from '../types';

export const mediaCategories: Record<string, CategoryDetails> = {
  'Books, Movies & Music': {
    titles: [
      'Limited Edition Vinyl Collection',
      'First Edition Signed Novel',
      'Rare Documentary DVD Box Set',
      'Vintage Book Collection',
      'Premium Music Box Set',
      'Classic Film Collection',
      'Audiobook Collection',
      'Arabic Music Anthology'
    ],
    descriptions: [
      'Exclusive vinyl collection featuring limited pressings from renowned artists.',
      'First edition novel signed by the author, perfect for collectors and book enthusiasts.',
      'Comprehensive documentary series covering historical events with never-before-seen footage.',
      'Curated collection of vintage books from the early 20th century in excellent condition.',
      'Complete discography box set with bonus tracks and exclusive artwork.',
      'Restored and remastered collection of classic films from the golden age of cinema.',
      'Complete series of audiobooks narrated by award-winning voice actors.',
      'Authentic anthology of traditional and modern Arabic music with historical booklet.'
    ],
    priceRange: [50, 1200],
    conditions: ['New', 'Like New', 'Very Good', 'Collector\'s Edition', 'Mint'],
    tags: ['books', 'music', 'movies', 'collectible', 'limited edition', 'entertainment']
  }
};
