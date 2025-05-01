
export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories?: string[];
  specialSubcategories?: {
    [key: string]: string[]
  };
  hidden?: boolean; // Property to hide categories
};
