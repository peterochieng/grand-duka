
import { ProductListing } from './types';

export const miscListings: ProductListing[] = [
  {
    id: "P-12349",
    name: "Organic Wheat - 1 Ton Bulk",
    category: "Agriculture",
    seller: {
      id: "seller-9",
      name: "Bulk Grains Supply"
    },
    price: 2500,
    currency: "AED",
    status: "pending",
    createdAt: "2023-08-21T11:30:00Z",
    views: 42,
    shop: {
      id: "shop9",
      name: "Bulk Grains Supply"
    }
  },
  {
    id: "P-12350",
    name: "Rolex Submariner",
    category: "Watches",
    seller: {
      id: "seller-4",
      name: "Luxury Watch Emporium"
    },
    price: 45000,
    currency: "AED",
    status: "published",
    createdAt: "2023-08-10T16:45:00Z",
    views: 231,
    shop: {
      id: "shop4",
      name: "Luxury Watch Emporium"
    }
  },
  {
    id: "P-12351",
    name: "Natural Gas Futures - 10 Units",
    category: "Energy",
    seller: {
      id: "seller-5",
      name: "Energy Solutions Ltd"
    },
    price: 65000,
    currency: "AED",
    status: "rejected",
    createdAt: "2023-08-16T13:10:00Z",
    views: 28,
    shop: {
      id: "shop5",
      name: "Energy Solutions Ltd"
    }
  },
  {
    id: "P-12352",
    name: "Handcrafted Coffee Table",
    category: "Home & Garden",
    seller: {
      id: "seller-6",
      name: "Home Decor Haven"
    },
    price: 1850,
    currency: "AED",
    status: "published",
    createdAt: "2023-08-12T12:15:00Z",
    views: 154,
    shop: {
      id: "shop6",
      name: "Home Decor Haven"
    }
  }
];
