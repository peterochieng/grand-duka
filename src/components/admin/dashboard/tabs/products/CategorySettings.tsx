
import { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CategoryRow } from '@/lib/types/supabaseTypes';
import { Loader2 } from 'lucide-react';

export const CategorySettings = () => {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (categoryId: string, updates: Partial<CategoryRow>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', categoryId);

      if (error) throw error;
      
      setCategories(prev => 
        prev.map(cat => 
          cat.id === categoryId ? { ...cat, ...updates } : cat
        )
      );
      
      toast.success('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="p-4 border-b">
        <h3 className="font-medium">Category Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure category availability and review requirements.
        </p>
      </div>
      
      <div className="divide-y">
        {categories.map((category) => (
          <div key={category.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-muted-foreground">
                {category.description || 'No description provided'}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <span className="text-sm">Available to Sellers</span>
                <Switch
                  checked={category.is_available_to_sellers}
                  onCheckedChange={(checked) => 
                    updateCategory(category.id, { is_available_to_sellers: checked })
                  }
                />
              </label>
              
              <label className="flex items-center gap-2">
                <span className="text-sm">Requires Review</span>
                <Switch
                  checked={category.requires_review}
                  onCheckedChange={(checked) =>
                    updateCategory(category.id, { requires_review: checked })
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
