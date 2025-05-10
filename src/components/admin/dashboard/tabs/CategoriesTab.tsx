import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AdminCategoryManager } from './categories/AdminCategoryManager';
import { AdminSubcategoryManager } from './categories/AdminSubcategoryManager';

export const CategoriesTab = () => {
  // Maintain the selected category state; this is set by the AdminCategoryManager.
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('categories');

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="categories">
            Categories {selectedCategory && ` (${selectedCategory.name})`}
          </TabsTrigger>
          <TabsTrigger value="subcategories">
            Subcategories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <AdminCategoryManager 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </TabsContent>
        <TabsContent value="subcategories">
          {selectedCategory ? (
            <AdminSubcategoryManager 
              categoryId={selectedCategory.id} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-muted-foreground">
                Please select a category from the Categories tab to manage its subcategories.
              </p>
              <Button onClick={() => setActiveTab('categories')} className="mt-2">
                Go to Categories
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoriesTab;