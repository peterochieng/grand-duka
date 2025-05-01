
import { Trader } from './traderTypes';
import { Template } from './templateTypes';

export type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
    type?: 'individual' | 'business' | 'verified' | 'trusted';
  };
  condition: string;
  location: string;
  subcategory?: string;
  brand?: string;
  listingTypes: {
    auction?: {
      enabled: boolean;
      timeLeft?: string;
      currentBid?: number;
      reservePrice?: number;
      startingBid?: number;
    };
    buyItNow?: {
      enabled: boolean;
      price: number;
    };
    bestOffer?: {
      enabled: boolean;
      minOffer?: number;
    };
  };
  listingType?: 'auction' | 'fixed' | 'offer'; // Keeping for backward compatibility
  timeLeft?: string; // Keeping for backward compatibility
  currentBid?: number; // Keeping for backward compatibility
  category: string;
  tags: string[];
  shipping: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string; // This is the property name we need to use
  relisted?: boolean;
  hidden?: boolean; // New property to hide products
  template?: {
    id: string;
    name: string;
    type: 'standard' | 'custom' | 'local';
  };
  // Category-specific details
  fashionDetails?: {
    targetGroup?: 'adults' | 'kids';
    gender?: 'mens' | 'womens';
    categoryType?: 'clothing' | 'shoes' | 'accessories' | 'beauty';
    clothingType?: string;
    shoeType?: string;
    accessoryType?: string;
    beautyCategory?: 'makeup' | 'hair-products' | 'skincare' | 'fragrance';
    beautyType?: string;
    size?: string;
    color?: string;
    material?: string;
  };
  gamingDetails?: {
    productType?: 'console' | 'game' | 'controller' | 'headset' | 'microphone' | 'monitor' | 'charging_dock' | 'vr_headset' | 'accessories';
    platform?: 'playstation' | 'xbox' | 'nintendo' | 'pc' | 'mobile' | 'multi' | 'other';
    connectivity?: 'wired' | 'wireless' | 'bluetooth' | 'both';
    model?: string;
    condition?: string;
  };
  collectiblesDetails?: {
    itemType?: 'painting' | 'print' | 'sculpture' | 'homeDecoration' | 'fiberware' | 'antique' | 'wallDecor' | 'limitedEdition' | 'memorabilia';
    artist?: string;
    year?: number;
    material?: string;
    dimensions?: string;
    isLimitedEdition?: boolean;
    editionNumber?: string;
    authenticityCertificate?: boolean;
  };
  businessDetails?: {
    businessType?: 'sole_proprietorship' | 'partnership' | 'corporation' | 'llc' | 'franchise' | 'other';
    revenue?: number;
    profit?: number;
    employees?: number;
    yearsInBusiness?: number;
    reason?: string;
    includingInventory?: boolean;
    includingRealEstate?: boolean;
    financialsAvailable?: boolean;
    propertyDetails?: {
      propertyType?: string;
      propertySize?: {
        sqft?: number;
        sqm?: number;
      };
      bedrooms?: string;
      bathrooms?: number;
      amenities?: string[];
      listingType?: 'sale' | 'rent';
      rentalTerm?: 'daily' | 'monthly' | 'quarterly' | 'annually';
      lettingType?: 'residential' | 'commercial';
    };
  };
  propertyDetails?: {
    propertyType?: string;
    propertySize?: {
      sqft?: number;
      sqm?: number;
    };
    bedrooms?: string;
    bathrooms?: number;
    amenities?: string[];
    listingType?: 'sale' | 'rent';
    rentalTerm?: 'daily' | 'monthly' | 'quarterly' | 'annually';
    lettingType?: 'residential' | 'commercial';
  };
  musicDetails?: {
    serviceType?: 'studio' | 'engineering' | 'production' | 'writing' | 'other';
    equipmentType?: string;
    equipmentBrand?: string;
    equipmentCondition?: 'new' | 'excellent' | 'good' | 'fair' | 'needs repair';
    rentalDuration?: string;
    includesDelivery?: boolean;
    includesSetup?: boolean;
    includesTechnician?: boolean;
  };
};
