
import { ProductListing } from './types';

export const electronicsListings: ProductListing[] = [
  {
    id: "P-12346",
    name: "iPhone 14 Pro",
    category: "Electronics",
    seller: {
      id: "seller-8",
      name: "TechHub Store"
    },
    price: 4599,
    currency: "AED",
    status: "pending",
    createdAt: "2023-08-20T10:15:00Z",
    views: 125,
    shop: {
      id: "shop8",
      name: "TechHub Store"
    }
  },
  {
    id: "P-12347",
    name: "Samsung Galaxy S23 Ultra",
    category: "Electronics",
    seller: {
      id: "seller-1",
      name: "TechHub Electronics"
    },
    price: 4899,
    currency: "AED",
    status: "published",
    createdAt: "2023-08-18T09:45:00Z",
    views: 208,
    shop: {
      id: "shop1",
      name: "TechHub Electronics"
    }
  }
];
