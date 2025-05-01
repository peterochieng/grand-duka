
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
