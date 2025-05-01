
import { Category, Product } from '@/lib/types';

// Define filter types with proper TypeScript
export type Filters = {
  category?: string;
  condition?: string[];
  priceRange?: [number, number];
  location?: string[];
  sellerType?: string[];
  listingType?: string[];
  subcategory?: string[];
  brand?: string[];
  searchTerm?: string;
  specializedFilters?: Record<string, string[]>;
};

export interface CommonFilterProps {
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
  className?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onChange: (categoryId: string) => void;
  className?: string;
}

export interface SubcategoryFilterProps extends CommonFilterProps {
  subcategories: string[];
  parentCategory?: string;
}

export interface SpecializedSubcategoryFilterProps {
  category: Category;
  selectedValues: Record<string, string[]>;
  onChange: (section: string, value: string, checked: boolean) => void;
  className?: string;
}

export interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentRange?: [number, number];
  onChange: (range: [number, number]) => void;
  className?: string;
}

export type ListingTypeOption = 'auction' | 'buy-now' | 'best-offer';

export interface ListingTypeFilterProps extends CommonFilterProps {
  listingTypes?: ListingTypeOption[];
}
