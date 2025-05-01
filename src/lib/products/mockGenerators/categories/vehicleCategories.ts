
import { CategoryDetails } from '../types';

export const vehicleCategories: Record<string, CategoryDetails> = {
  'Vehicle Parts': {
    titles: [
      'BMW M3/M4 Carbon Fiber Front Splitter',
      'JL Audio 12W7AE-3 12-inch Subwoofer',
      'Ford Mustang GT 5.0 Coyote Engine - Complete',
      'Mercedes AMG Carbon Fiber Steering Wheel',
      'Toyota Land Cruiser Performance Off-Road Suspension Kit',
      'Akrapovic Evolution Titanium Exhaust System - BMW M4',
      'Brembo GT Big Brake Kit - 6 Piston',
      'Nitto NT555 G2 Ultra-High Performance Tires - 275/40ZR20',
      'Pioneer DMH-WT8600NEX Wireless Android Auto/CarPlay Head Unit',
      'Mishimoto Performance Aluminum Radiator'
    ],
    descriptions: [
      'Authentic carbon fiber front splitter for BMW M3/M4 models, improves aerodynamics and adds aggressive styling.',
      'High-performance 12-inch subwoofer with 1500W power handling, perfect for audiophiles seeking premium sound quality.',
      'Complete Ford Mustang GT 5.0L Coyote engine with all accessories, low mileage and excellent condition.',
      'Factory AMG carbon fiber steering wheel with Alcantara grips and illuminated AMG badge.',
      'Complete suspension lift kit for Toyota Land Cruiser with heavy-duty shocks, springs and all mounting hardware.',
      'Premium titanium exhaust system for BMW M4, reduces weight and enhances exhaust note with perfect backfire acoustics.',
      'Professional-grade big brake kit with 6-piston calipers, slotted rotors and stainless steel lines for maximum stopping power.',
      'Set of four ultra-high performance tires with excellent wet and dry traction, suitable for sports cars and performance sedans.',
      'Latest wireless CarPlay/Android Auto head unit with 10.1" HD capacitive touchscreen and premium audio processing.',
      'Full-size aluminum performance radiator that provides 30% more cooling capacity than stock units.'
    ],
    priceRange: [500, 25000],
    conditions: ['New', 'Used', 'Refurbished', 'Like New'],
    tags: ['vehicle parts', 'automotive', 'car accessories', 'parts', 'performance', 'audio', 'wheels', 'engine', 'exhaust', 'suspension']
  }
};
