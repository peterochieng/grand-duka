
import { ProductListing } from './types';

export const businessListings: ProductListing[] = [
  {
    id: "P-12358",
    name: "Profitable Coffee Shop in Downtown",
    category: "Business & Industrial",
    subcategory: "Businesses for Sale",
    seller: {
      id: "seller-10",
      name: "Business Brokers Inc."
    },
    price: 125000,
    currency: "AED",
    status: "published",
    createdAt: "2023-08-05T09:30:00Z",
    views: 187,
    shop: {
      id: "shop10",
      name: "Business Brokers Inc."
    },
    businessDetails: {
      businessType: "sole_proprietorship",
      revenue: 380000,
      profit: 95000,
      employees: 5,
      yearsInBusiness: 3,
      reason: "Retirement",
      includingInventory: true,
      includingRealEstate: false,
      financialsAvailable: true
    }
  },
  {
    id: "P-12359",
    name: "Fast Food Franchise - Prime Location",
    category: "Business & Industrial",
    subcategory: "Franchises",
    seller: {
      id: "seller-11",
      name: "Franchise Opportunities UAE"
    },
    price: 450000,
    currency: "AED",
    status: "published",
    createdAt: "2023-08-10T11:45:00Z",
    views: 235,
    shop: {
      id: "shop11",
      name: "Franchise Opportunities UAE"
    },
    businessDetails: {
      businessType: "franchise",
      revenue: 750000,
      profit: 180000,
      employees: 12,
      yearsInBusiness: 5,
      reason: "Portfolio expansion",
      includingInventory: true,
      includingRealEstate: true,
      financialsAvailable: true
    }
  },
  {
    id: "P-12360",
    name: "Professional Call Center Services",
    category: "Business & Industrial",
    subcategory: "Business Services",
    seller: {
      id: "seller-12",
      name: "Corporate Solutions LLC"
    },
    price: 25000,
    currency: "AED",
    status: "published",
    createdAt: "2023-09-01T10:15:00Z",
    views: 98,
    shop: {
      id: "shop12",
      name: "Corporate Solutions LLC"
    }
  },
  {
    id: "P-12361",
    name: "High-Performance Industrial Generator",
    category: "Business & Industrial",
    subcategory: "Hardware Tools",
    seller: {
      id: "seller-13",
      name: "Industrial Supplies UAE"
    },
    price: 15000,
    currency: "AED",
    status: "published",
    createdAt: "2023-09-15T08:30:00Z",
    views: 127,
    shop: {
      id: "shop13",
      name: "Industrial Supplies UAE"
    }
  },
  {
    id: "P-12362",
    name: "Executive Limousine Service - Established Business",
    category: "Business & Industrial",
    subcategory: "Business Services",
    seller: {
      id: "seller-14",
      name: "Premium Transportation Services"
    },
    price: 350000,
    currency: "AED",
    status: "published",
    createdAt: "2023-10-05T14:20:00Z",
    views: 156,
    shop: {
      id: "shop14",
      name: "Premium Transportation Services"
    },
    businessDetails: {
      businessType: "llc",
      revenue: 650000,
      profit: 210000,
      employees: 8,
      yearsInBusiness: 6,
      reason: "Relocating",
      includingInventory: true,
      includingRealEstate: false,
      financialsAvailable: true
    }
  }
];
