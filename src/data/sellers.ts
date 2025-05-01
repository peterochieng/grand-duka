
import { Shop, shops } from '@/data/shopsData';

export interface Seller {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  productsCount: number;
  rating: number;
  status: 'active' | 'pending' | 'suspended';
  verified: boolean;
  createdAt: string;
  revenue: number;
  location: string;
  businessType: 'sole-proprietor' | 'shop';
  shopId?: string;
}

// Mock sellers data
export const sellers: Seller[] = [
  {
    id: "seller-1",
    businessName: "TechHub Electronics",
    ownerName: "James Wilson",
    email: "james@techhub.com",
    phone: "+971 55 123 4567",
    productsCount: 324,
    rating: 4.8,
    status: "active",
    verified: true,
    createdAt: "2023-05-12T09:00:00Z",
    revenue: 125600,
    location: "Dubai, UAE",
    businessType: "shop",
    shopId: "shop1"
  },
  {
    id: "seller-2",
    businessName: "Fashion Forward",
    ownerName: "Emma Johnson",
    email: "emma@fashionforward.com",
    phone: "+971 50 987 6543",
    productsCount: 567,
    rating: 4.7,
    status: "active",
    verified: true,
    createdAt: "2023-06-24T14:30:00Z",
    revenue: 89500,
    location: "Abu Dhabi, UAE",
    businessType: "shop",
    shopId: "shop2"
  },
  {
    id: "seller-3",
    businessName: "Global Commodities Trading",
    ownerName: "Ahmed Hassan",
    email: "ahmed@globalcommodities.com",
    phone: "+971 54 456 7890",
    productsCount: 27,
    rating: 4.9,
    status: "active",
    verified: true,
    createdAt: "2023-04-08T11:15:00Z",
    revenue: 420800,
    location: "Dubai, UAE",
    businessType: "shop",
    shopId: "shop3"
  },
  {
    id: "seller-4",
    businessName: "Luxury Watch Emporium",
    ownerName: "Sarah Williams",
    email: "sarah@luxurywatches.com",
    phone: "+971 52 345 6789",
    productsCount: 92,
    rating: 4.8,
    status: "active",
    verified: true,
    createdAt: "2023-07-19T16:45:00Z",
    revenue: 215300,
    location: "Dubai, UAE",
    businessType: "shop",
    shopId: "shop4"
  },
  {
    id: "seller-5",
    businessName: "Energy Solutions Ltd",
    ownerName: "Mohammed Al Farsi",
    email: "mohammed@energysolutions.com",
    phone: "+971 56 789 0123",
    productsCount: 18,
    rating: 4.7,
    status: "pending",
    verified: false,
    createdAt: "2023-08-05T10:20:00Z",
    revenue: 378900,
    location: "Abu Dhabi, UAE",
    businessType: "sole-proprietor"
  },
  {
    id: "seller-6",
    businessName: "Home Decor Haven",
    ownerName: "Jennifer Lee",
    email: "jennifer@homedecor.com",
    phone: "+971 58 234 5678",
    productsCount: 418,
    rating: 4.6,
    status: "suspended",
    verified: true,
    createdAt: "2023-03-02T13:40:00Z",
    revenue: 52700,
    location: "Sharjah, UAE",
    businessType: "shop",
    shopId: "shop6"
  },
  {
    id: "seller-7",
    businessName: "Premium Motors",
    ownerName: "Michael Brown",
    email: "michael@premiummotors.com",
    phone: "+971 55 876 5432",
    productsCount: 42,
    rating: 4.8,
    status: "active",
    verified: true,
    createdAt: "2023-05-28T08:15:00Z",
    revenue: 1250000,
    location: "Dubai, UAE",
    businessType: "shop",
    shopId: "shop7"
  },
  {
    id: "seller-8",
    businessName: "TechHub Store",
    ownerName: "Lisa Chen",
    email: "lisa@techhubstore.com",
    phone: "+971 52 765 4321",
    productsCount: 128,
    rating: 4.6,
    status: "active",
    verified: true,
    createdAt: "2023-04-15T11:30:00Z",
    revenue: 583000,
    location: "Abu Dhabi, UAE",
    businessType: "shop",
    shopId: "shop8"
  },
  {
    id: "seller-9",
    businessName: "Bulk Grains Supply",
    ownerName: "Robert Williams",
    email: "robert@bulkgrains.com",
    phone: "+971 54 654 3210",
    productsCount: 15,
    rating: 4.7,
    status: "pending",
    verified: false,
    createdAt: "2023-07-10T09:45:00Z",
    revenue: 760000,
    location: "Sharjah, UAE",
    businessType: "sole-proprietor"
  },
  {
    id: "seller-10",
    businessName: "Handmade Crafts Market",
    ownerName: "Aisha Abdullah",
    email: "aisha@handmadecrafts.com",
    phone: "+971 50 111 2222",
    productsCount: 54,
    rating: 4.5,
    status: "active",
    verified: true,
    createdAt: "2023-06-05T15:20:00Z",
    revenue: 35600,
    location: "Dubai, UAE",
    businessType: "sole-proprietor"
  },
  {
    id: "seller-11",
    businessName: "Rare Collectibles",
    ownerName: "David Thompson",
    email: "david@rarecollectibles.com",
    phone: "+971 52 333 4444",
    productsCount: 76,
    rating: 4.4,
    status: "active",
    verified: true,
    createdAt: "2023-04-22T13:10:00Z",
    revenue: 92400,
    location: "Abu Dhabi, UAE",
    businessType: "sole-proprietor"
  }
];
