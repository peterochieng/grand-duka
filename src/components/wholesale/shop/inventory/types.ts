import { commodities } from '@/lib/data/commodities';

// Extended inventory item with visibility setting
export interface InventoryItem {
  id: string;
  title: string;
  price: number;
  priceUnit: string;
  currency: string;
  image: string;
  quantity: number;
  quantityUnit: string;
  category: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper function to convert commodities to inventory items
export const getInitialInventoryItems = (): InventoryItem[] => {
  // Convert commodities to inventory items with visibility
  const initialItems: InventoryItem[] = commodities.map(commodity => ({
    id: commodity.id,
    title: commodity.title,
    price: commodity.price,
    priceUnit: commodity.priceUnit,
    currency: commodity.currency,
    image: commodity.image,
    quantity: commodity.quantity,
    quantityUnit: commodity.quantityUnit,
    category: commodity.category,
    isPublic: Math.random() > 0.3, // Random visibility for demo
    createdAt: commodity.createdAt,
    updatedAt: new Date().toISOString(),
  }));
  
  // Add more mock items for the inventory
  const additionalItems: InventoryItem[] = [
    {
      id: 'i1',
      title: 'Premium Coffee Beans - Colombian Arabica',
      price: 1850,
      priceUnit: 'per ton',
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
      quantity: 500,
      quantityUnit: 'tons',
      category: 'Agriculture',
      isPublic: true,
      createdAt: '2023-09-12T10:15:00Z',
      updatedAt: '2023-09-12T10:15:00Z',
    },
    {
      id: 'i2',
      title: 'Natural Rubber - Grade A',
      price: 2250,
      priceUnit: 'per ton',
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80',
      quantity: 1200,
      quantityUnit: 'tons',
      category: 'Industrial',
      isPublic: false,
      createdAt: '2023-09-10T14:30:00Z',
      updatedAt: '2023-09-10T14:30:00Z',
    }
  ];
  
  return [...initialItems, ...additionalItems];
};
