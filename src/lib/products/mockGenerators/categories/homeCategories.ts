
import { CategoryDetails } from '../types';

export const homeCategories: Record<string, CategoryDetails> = {
  'Real Estate': {
    titles: [
      'Luxury Villa in Palm Jumeirah', 
      'Modern Apartment in Downtown', 
      'Commercial Space in Business Bay',
      'Studio Apartment in Dubai Marina',
      'Beachfront Property in Jumeirah',
      'Penthouse with Panoramic Sea View',
      'Waterfront Villa with Private Beach',
      'Spacious Family Home in Arabian Ranches'
    ],
    descriptions: [
      'Stunning waterfront property with private beach access and panoramic sea views.',
      'Spacious apartment with modern amenities and breathtaking city views.',
      'Prime commercial location with excellent infrastructure and connectivity.',
      'Cozy studio perfect for investors or young professionals in the heart of the city.',
      'Exclusive beachfront property featuring private pool and garden.',
      'Luxurious penthouse offering unparalleled views of the sea and city skyline.',
      'Elegant villa with direct beach access and high-end finishes throughout.',
      'Family-friendly home in a prestigious community with world-class amenities.'
    ],
    priceRange: [500000, 15000000],
    conditions: ['New', 'Like New', 'Good'],
    tags: ['property', 'investment', 'real estate', 'luxury', 'waterfront', 'beachfront', 'residential', 'commercial'],
    propertyTypes: [
      'Apartment', 
      'Villa', 
      'Penthouse', 
      'Townhouse', 
      'Commercial', 
      'Land',
      'Studio'
    ],
    amenities: [
      'Maids Room',
      'Central A/C',
      'Balcony',
      'Security',
      'Covered Parking',
      'Built in Wardrobes',
      'View of Water',
      'View of Landmark',
      'Private Pool',
      'Gym',
      'Concierge Service',
      'Smart Home System'
    ]
  }
};
