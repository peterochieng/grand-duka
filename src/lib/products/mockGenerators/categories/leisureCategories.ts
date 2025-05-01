
import { CategoryDetails } from '../types';

export const leisureCategories: Record<string, CategoryDetails> = {
  'Sporting Goods': {
    titles: [
      'Professional Tennis Racket Set', 
      'Premium Golf Clubs Collection', 
      'High-Performance Diving Equipment',
      'Mountain Bike with Accessories',
      'Complete Home Gym Equipment'
    ],
    descriptions: [
      'Professional-grade tennis racket set used by tournament players.',
      'Complete set of premium golf clubs suitable for professional and amateur golfers.',
      'High-quality diving equipment for deep sea exploration and professional diving.',
      'All-terrain mountain bike with premium accessories and adjustable features.',
      'Comprehensive home gym setup with weights, bench, and cardio equipment.'
    ],
    priceRange: [200, 5000],
    conditions: ['New', 'Like New', 'Good', 'Used'],
    tags: ['sports', 'fitness', 'outdoor', 'equipment', 'professional']
  },
  'Toys & Hobbies': {
    titles: [
      'Collectors Edition Model Train', 
      'Remote Control Racing Drone', 
      'Vintage Action Figure Collection',
      'Professional Art Supplies Kit',
      'Advanced Robotics Building Set'
    ],
    descriptions: [
      'Limited edition model train with detailed craftsmanship and authentic features.',
      'High-performance racing drone with 4K camera and extended battery life.',
      'Complete collection of rare vintage action figures in original packaging.',
      'Comprehensive art supplies kit with professional grade materials.',
      'Advanced robotics set for building programmable robots with AI capabilities.'
    ],
    priceRange: [100, 2000],
    conditions: ['New', 'Like New', 'Collector Condition', 'Used'],
    tags: ['collectible', 'hobby', 'entertainment', 'limited edition', 'educational']
  },
  'Music': {
    titles: [
      'Vintage Vinyl Record Collection',
      'Professional DJ Equipment Set',
      'Limited Edition Artist Signed Album',
      'High-End Studio Microphone',
      'Acoustic Guitar with Case',
      'Premium Music Production Software',
      'Rare Middle Eastern Instrument',
      'Exclusive Record Player with Speakers',
      'Classical Music Sheet Collection',
      'Professional Digital Piano'
    ],
    descriptions: [
      'Rare collection of vinyl records from the 70s and 80s in excellent condition.',
      'Complete professional DJ setup including mixer, controllers, and headphones.',
      'Limited edition album signed by the artist with certificate of authenticity.',
      'Studio-quality condenser microphone perfect for professional recordings.',
      'Handcrafted acoustic guitar with solid wood construction and premium case.',
      'Professional music production software suite with lifetime updates.',
      'Authentic Middle Eastern instrument handmade by master craftsmen.',
      'Premium record player with built-in speakers and Bluetooth connectivity.',
      'Comprehensive collection of classical music sheets from renowned composers.',
      'Digital piano with weighted keys and authentic grand piano sound.'
    ],
    priceRange: [200, 5000],
    conditions: ['New', 'Like New', 'Excellent', 'Good', 'Vintage'],
    tags: ['music', 'instruments', 'vinyl', 'studio', 'audio', 'professional', 'collection']
  },
  'Music Services': {
    titles: [
      'Professional Recording Studio Services',
      'Experienced Sound Engineer Available',
      'Music Production & Mixing Services',
      'Songwriting and Composition',
      'Voice Coaching Sessions',
      'Music Video Production Services',
      'Live Event Sound Management',
      'Professional Music Mastering Services',
      'Audio Restoration Specialist',
      'Session Musicians Available'
    ],
    descriptions: [
      'Professional recording studio with state-of-the-art equipment and experienced engineers.',
      'Experienced sound engineer offering mixing and recording services for all music genres.',
      'Complete music production services from concept to final master by industry professionals.',
      'Professional songwriter and composer available for custom music creation and collaboration.',
      'Voice coaching by experienced vocal coach for singers of all levels and genres.',
      'Full-service music video production from concept development to final editing.',
      'Professional sound management for live events, concerts, and performances.',
      'Expert mastering services to give your music the professional polish it deserves.',
      'Specialized audio restoration for vintage recordings and damaged audio files.',
      'Professional session musicians available for studio recordings and live performances.'
    ],
    priceRange: [500, 10000],
    conditions: ['Professional', 'Experienced', 'Certified', 'Award-winning'],
    tags: ['studio', 'production', 'engineering', 'songwriting', 'mixing', 'mastering', 'professional', 'audio']
  },
  'Music Equipment Rental': {
    titles: [
      'Professional PA System Rental',
      'DJ Equipment Rental Package',
      'Studio Recording Equipment Rental',
      'Concert Grand Piano Rental',
      'Premium Guitar and Amp Rental',
      'Stage Lighting Equipment Rental',
      'Drum Kit Rental for Events',
      'Mobile Recording Setup Rental',
      'Premium Microphone Collection Rental',
      'Live Streaming Audio Equipment Rental'
    ],
    descriptions: [
      'Complete PA system rental for events of all sizes with delivery and setup available.',
      'Professional DJ equipment package including controllers, speakers, and lighting effects.',
      'High-end recording equipment rental for professional studio sessions and home recording.',
      'Concert grand piano rental for performances, recordings, and special events.',
      'Premium guitar and amplifier rental for recording sessions and live performances.',
      'Professional stage lighting equipment for concerts, performances, and special events.',
      'Complete drum kit rental for recording sessions, performances, and practice.',
      'Mobile recording setup with all necessary equipment for on-location recording.',
      'Collection of premium microphones for various recording applications and voice types.',
      'Complete audio equipment setup for professional live streaming and broadcasting.'
    ],
    priceRange: [200, 5000],
    conditions: ['Excellent', 'Professional Grade', 'Well-maintained', 'Calibrated'],
    tags: ['rental', 'equipment', 'professional', 'audio', 'sound', 'event', 'studio', 'performance']
  }
};
