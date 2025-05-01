
import { 
  Car, 
  Bike, 
  Sailboat, 
  Truck, 
  Bus, 
  Wrench, 
  CircuitBoard, 
  Gauge, 
  Fuel,
  LayoutGrid
} from 'lucide-react';

export const vehicleTypes = [
  {
    id: 'cars',
    name: 'Cars',
    icon: Car,
    count: 2154,
    subcategories: ['Sedan', 'SUV', 'Hatchback', 'Coupe', '+4 more']
  },
  {
    id: 'motorcycles',
    name: 'Motorcycles',
    icon: Bike,
    count: 876,
    subcategories: ['Sport', 'Cruiser', 'Touring', 'Off-road', '+3 more']
  },
  {
    id: 'boats',
    name: 'Boats & Watercraft',
    icon: Sailboat,
    count: 432,
    subcategories: ['Motor Boats', 'Sailboats', 'Fishing Boats', 'Yachts', '+3 more']
  },
  {
    id: 'trucks',
    name: 'Trucks & Commercial',
    icon: Truck,
    count: 654,
    subcategories: ['Pickup Trucks', 'Delivery Vans', 'Box Trucks', 'Semi-Trucks', '+3 more']
  },
  {
    id: 'buses',
    name: 'Buses & Coaches',
    icon: Bus,
    count: 128,
    subcategories: ['City Buses', 'Tour Buses', 'School Buses', 'Mini Buses', '+2 more']
  }
];

export const popularCategories = [
  { name: 'Electric Cars', icon: Car, path: '/category/vehicles/cars?type=electric' },
  { name: 'Sport Motorcycles', icon: Bike, path: '/category/vehicles/motorcycles?type=sport' },
  { name: 'Luxury Yachts', icon: Sailboat, path: '/category/vehicles/boats?type=luxury' },
  { name: 'Luxury Cars', icon: Car, path: '/category/vehicles/cars?type=luxury' },
  { name: 'Engines', icon: Gauge, path: '/category/vehicles/parts/engines' },
  { name: 'Stereo Systems', icon: CircuitBoard, path: '/category/vehicles/parts/stereo-systems' },
  { name: 'Wheels & Rims', icon: LayoutGrid, path: '/category/vehicles/parts/wheels' },
  { name: 'Diagnostic Tools', icon: Wrench, path: '/category/vehicles/parts/diagnostic-tools' },
];
