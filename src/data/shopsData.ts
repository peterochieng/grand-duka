
// Shop data types
export interface Shop {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  verified: boolean;
  type: 'retail' | 'wholesale';
  categories: string[];
  itemCount: number;
  location: string;
}

// Sample shop data
export const shops: Shop[] = [
  {
    id: "shop1",
    name: "TechHub Electronics",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Premium electronics and gadgets at competitive prices.",
    rating: 4.8,
    verified: true,
    type: "retail",
    categories: ["Electronics", "Gadgets", "Accessories"],
    itemCount: 324,
    location: "Dubai, UAE",
  },
  {
    id: "shop2",
    name: "Fashion Forward",
    image: "https://images.unsplash.com/photo-1563178384-a9c851a92ff9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Trendy fashion for men and women from leading brands.",
    rating: 4.7,
    verified: true,
    type: "retail",
    categories: ["Fashion", "Clothing", "Accessories"],
    itemCount: 567,
    location: "Abu Dhabi, UAE",
  },
  {
    id: "shop3",
    name: "Global Commodities Trading",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Bulk agricultural commodities for industrial buyers.",
    rating: 4.9,
    verified: true,
    type: "wholesale",
    categories: ["Agriculture", "Grains", "Commodities"],
    itemCount: 27,
    location: "Dubai, UAE",
  },
  {
    id: "shop4",
    name: "Luxury Watch Emporium",
    image: "https://images.unsplash.com/photo-1548171915-94fc44e565a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Authentic luxury watches and accessories.",
    rating: 4.8,
    verified: true,
    type: "retail",
    categories: ["Watches", "Luxury", "Accessories"],
    itemCount: 92,
    location: "Dubai, UAE",
  },
  {
    id: "shop5",
    name: "Energy Solutions Ltd",
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Wholesale energy commodities and renewable solutions.",
    rating: 4.7,
    verified: true,
    type: "wholesale",
    categories: ["Energy", "Oil", "Gas"],
    itemCount: 18,
    location: "Abu Dhabi, UAE",
  },
  {
    id: "shop6",
    name: "Home Decor Haven",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    description: "Unique home decor and furniture for every style.",
    rating: 4.6,
    verified: true,
    type: "retail",
    categories: ["Home", "Furniture", "Decor"],
    itemCount: 418,
    location: "Sharjah, UAE",
  },
];
