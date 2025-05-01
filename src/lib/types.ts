
// Type definitions for data models

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

export type Template = {
  id: string;
  name: string;
  category: string;
  type: 'standard' | 'custom' | 'local';
  createdBy?: string; // User ID
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  fields: TemplateField[];
  createdAt: string;
  updatedAt?: string;
};

export type TemplateField = {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'image';
  required: boolean;
  options?: string[]; // For select type
  defaultValue?: string | number | boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories?: string[];
  hidden?: boolean; // New property to hide categories
};

export type Commodity = {
  id: string;
  title: string;
  price: number;
  priceUnit: string; // e.g., "per ton", "per barrel"
  currency: string;
  image: string;
  description: string;
  availabilityDate: string; // future date when available
  quantity: number;
  quantityUnit: string; // e.g., "tons", "barrels"
  location: string;
  trader: Trader;
  category: string;
  tags: string[];
  createdAt: string;
};

export type Trader = {
  id: string;
  name: string;
  type: 'trader' | 'broker';
  image: string;
  description: string;
  rating: number;
  verified: boolean;
  location: string;
  specialties: string[];
  followers: number;
  commodities: number;
};

export type Notification = {
  id: string;
  userId: string;
  type: 'trader_update' | 'commodity_update' | 'price_alert' | 'nomination' | 
        'price_change' | 'inspection_update' | 'saved_search';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  entityId?: string; // ID of related trader, commodity, etc.
  entityType?: 'trader' | 'commodity' | 'seller' | 'inspection' | 'search' | 'vehicle';
};

export type UserSubscription = {
  id: string;
  userId: string;
  entityId: string;
  entityType: 'trader' | 'commodity' | 'seller' | 'search' | 'vehicle';
  createdAt: string;
  metadata?: Record<string, any>;
};

// Chat message type for the AI inspection chatbot
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

// Chat context type - expanded to handle any type of item
export interface ChatContext {
  vehicleId?: string; // Legacy support
  vehicleName?: string; // Legacy support
  inspectionId?: string;
  itemId?: string;
  itemName?: string;
  itemType?: string;
  productData?: any; // Full product data for detailed responses
}
