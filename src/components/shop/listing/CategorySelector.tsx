
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategoriesByType, getSubcategoriesByCategory } from '@/services/category';
import { CategoryRow, SubcategoryRow } from '@/lib/types/supabaseTypes';

interface CategorySelectorProps {
  selectedCategory: string;
  selectedSubcategory: string | undefined;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string | undefined) => void;
  tradingType?: 'retail' | 'wholesale' | 'both';
}

const CategorySelector = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  tradingType = 'both'
}: CategorySelectorProps) => {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, error } = await getCategoriesByType(tradingType);
        
        if (error) throw new Error(error.message);
        
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [tradingType]);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) {
        setSubcategories([]);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getSubcategoriesByCategory(selectedCategory);
        setSubcategories(data || []);
        
        // Reset subcategory if it's not in the new list
        if (selectedSubcategory && !data.some(s => s.name === selectedSubcategory)) {
          onSubcategoryChange(undefined);
        }
      } catch (err) {
        console.error('Error fetching subcategories:', err);
        setError('Failed to load subcategories');
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [selectedCategory, selectedSubcategory, onSubcategoryChange]);

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
    // Reset subcategory when category changes
    onSubcategoryChange(undefined);
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select 
          value={selectedCategory} 
          onValueChange={handleCategoryChange}
          disabled={loading}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {subcategories.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select 
            value={selectedSubcategory} 
            onValueChange={onSubcategoryChange}
            disabled={loading}
          >
            <SelectTrigger id="subcategory" className="w-full">
              <SelectValue placeholder="Select subcategory (optional)" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subcat) => (
                <SelectItem key={subcat.id} value={subcat.name}>
                  {subcat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
