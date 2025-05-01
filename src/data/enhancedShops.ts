
import { Shop, shops } from '@/data/shopsData';

// Enhanced shop data with more details
export interface EnhancedShop extends Shop {
  owner: string;
  ownerId: string;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  productCount: number;
  revenue: number;
}

// Mock enhanced shops data
export const enhancedShops: EnhancedShop[] = [
  {
    ...shops[0],
    owner: "James Wilson",
    ownerId: "seller-1",
    status: "active",
    createdAt: "2023-05-12T09:00:00Z",
    productCount: 324,
    revenue: 125600
  },
  {
    ...shops[1],
    owner: "Emma Johnson",
    ownerId: "seller-2",
    status: "active",
    createdAt: "2023-06-24T14:30:00Z",
    productCount: 567,
    revenue: 89500
  },
  {
    ...shops[2],
    owner: "Ahmed Hassan",
    ownerId: "seller-3",
    status: "active",
    createdAt: "2023-04-08T11:15:00Z",
    productCount: 27,
    revenue: 420800
  },
  {
    ...shops[3],
    owner: "Sarah Williams",
    ownerId: "seller-4",
    status: "active",
    createdAt: "2023-07-19T16:45:00Z",
    productCount: 92,
    revenue: 215300
  },
  {
    ...shops[4],
    owner: "Mohammed Al Farsi",
    ownerId: "seller-5",
    status: "pending",
    createdAt: "2023-08-05T10:20:00Z",
    productCount: 18,
    revenue: 378900
  },
  {
    ...shops[5],
    owner: "Jennifer Lee",
    ownerId: "seller-6",
    status: "suspended",
    createdAt: "2023-03-02T13:40:00Z",
    productCount: 418,
    revenue: 52700
  },
  {
    id: "shop7",
    name: "Premium Motors",
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Luxury and premium vehicles with full certification.",
    rating: 4.8,
    verified: true,
    type: "retail",
    categories: ["Vehicles", "Luxury", "Cars"],
    itemCount: 42,
    location: "Dubai, UAE",
    owner: "Michael Brown",
    ownerId: "seller-7",
    status: "active",
    createdAt: "2023-05-28T08:15:00Z",
    productCount: 42,
    revenue: 1250000
  },
  {
    id: "shop8",
    name: "TechHub Store",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Latest technology and electronics at competitive prices.",
    rating: 4.6,
    verified: true,
    type: "retail",
    categories: ["Electronics", "Gadgets", "Computers"],
    itemCount: 128,
    location: "Abu Dhabi, UAE",
    owner: "Lisa Chen",
    ownerId: "seller-8",
    status: "active",
    createdAt: "2023-04-15T11:30:00Z",
    productCount: 128,
    revenue: 583000
  },
  {
    id: "shop9",
    name: "Bulk Grains Supply",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Wholesale agricultural commodities for industrial buyers.",
    rating: 4.7,
    verified: true,
    type: "wholesale",
    categories: ["Agriculture", "Grains", "Commodities"],
    itemCount: 15,
    location: "Sharjah, UAE",
    owner: "Robert Williams",
    ownerId: "seller-9",
    status: "pending",
    createdAt: "2023-07-10T09:45:00Z",
    productCount: 15,
    revenue: 760000
  }
];
