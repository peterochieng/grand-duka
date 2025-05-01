
export interface ProductListing {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  seller: {
    id: string;
    name: string;
  };
  price: number;
  currency: string;
  status: 'published' | 'pending' | 'rejected' | 'hidden';
  createdAt: string;
  views: number;
  shop: {
    id: string;
    name: string;
  };
  fashionDetails?: {
    targetGroup?: 'adults' | 'kids';
    gender?: 'mens' | 'womens';
    categoryType?: 'clothing' | 'shoes' | 'accessories' | 'beauty';
    beautyCategory?: 'makeup' | 'hair-products' | 'skincare' | 'fragrance';
    size?: string;
    color?: string;
    material?: string;
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
}
