
// Common interface for category details used in mock product generation
export interface CategoryDetails {
  titles: string[];
  descriptions: string[];
  priceRange: [number, number];
  conditions: string[];
  tags: string[];
  propertyTypes?: string[];
  amenities?: string[];
}
