
import { CategoryDetails } from '../types';

export const serviceCategories: Record<string, CategoryDetails> = {
  'Specialty Services': {
    titles: [
      'Premium Car Detailing Service', 
      'Professional Home Staging Consultation', 
      'Personal Stylist Session Package',
      'Luxury Yacht Charter Experience',
      'VIP Event Planning Service',
      'Executive Photography Session',
      'Premium Home Cleaning Service',
      'Corporate Catering Package',
      'Luxury Pet Grooming Service',
      'Professional Resume Writing Service',
      'Interior Design Consultation',
      'Professional Moving Service',
      'Exclusive Wedding Planning Package',
      'Business Branding Consultation',
      'Luxury Spa Day Experience'
    ],
    descriptions: [
      'Comprehensive car detailing service with premium products and professional finish.',
      'Expert home staging consultation to maximize property value and appeal.',
      'Personalized styling sessions with professional fashion consultant and shopping assistance.',
      'All-inclusive luxury yacht charter with crew and customizable itinerary.',
      'End-to-end VIP event planning with exclusive venue access and premium catering.',
      'Professional photography session with editing, perfect for corporate headshots or personal branding.',
      'Thorough home cleaning service using eco-friendly products and attention to detail.',
      'Full-service catering for corporate events with customizable menu options.',
      'Premium pet grooming service including bath, haircut, and spa treatments.',
      'Professional resume writing and career coaching to help advance your career.',
      'Comprehensive interior design consultation with 3D visualization and furniture selection.',
      'Professional moving service with packing, transport, and setup in your new location.',
      'Luxury wedding planning service covering everything from venue selection to day-of coordination.',
      'Strategic branding consultation for businesses including logo design and marketing strategy.',
      'All-inclusive spa day experience with massage, facial, and other relaxation treatments.'
    ],
    priceRange: [500, 10000],
    conditions: ['Premium', 'Standard', 'Basic', 'Customizable', 'All-Inclusive'],
    tags: ['service', 'professional', 'premium', 'luxury', 'exclusive', 'customizable', 'consultation', 'experience']
  }
};
