import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SellerCategoryRequestForm } from './SellerCategoryRequestForm';
import { useCategories } from '@/hooks/useCategories';
import { getSubcategories } from '@/services/category/subcategory/getSubcategories';
import SellerSubcategoryRequestForm from './SellerSubcategoryRequestForm';

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  is_available_to_sellers: boolean;
  subcategories?: Subcategory[];
}

const CategoryBrowser = () => {
  const { categories, loading } = useCategories();
  const [combinedCategories, setCombinedCategories] = useState<Category[]>([]);
  // Track which category is requesting a new subcategory
  const [openSubRequestCategoryId, setOpenSubRequestCategoryId] = useState<string | null>(null);

  useEffect(() => {
    // Once categories have loaded, fetch subcategories for each category
    async function combineCategoriesWithSubcategories() {
      if (!loading && categories && categories.length > 0) {
        const updatedCategories = await Promise.all(
          categories.map(async (cat: Category) => {
            try {
              const subs = await getSubcategories(cat.id);
              return { ...cat, subcategories: subs };
            } catch (err) {
              console.error(`Error fetching subcategories for ${cat.name}:`, err);
              return { ...cat, subcategories: [] };
            }
          })
        );
        setCombinedCategories(updatedCategories);
      }
    }
    combineCategoriesWithSubcategories();
  }, [categories, loading]);

  if (loading) {
    return (
      <TabsContent value="categories">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px] mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    );
  }
  
  return (
    <TabsContent value="categories">
      <Card>
        <CardHeader>
          <CardTitle>Available Categories</CardTitle>
          <CardDescription>
            Browse categories and subcategories available for your listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {combinedCategories
              ?.filter((category: Category) => category.is_available_to_sellers === true)
              .map((category: Category) => (
                <div
                  key={category.id}
                  className="border p-4 rounded-md hover:shadow transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  {category.subcategories && category.subcategories.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {category.subcategories.map((subcategory: Subcategory) => (
                        <Badge
                          key={subcategory.id}
                          variant="secondary"
                          className="text-sm"
                        >
                          {subcategory.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-2">
                      No subcategories available.
                    </p>
                  )}
                  {/* Button to request a new subcategory for this category */}
                  <Button 
  variant="outline" 
  size="sm"
  onClick={() => setOpenSubRequestCategoryId(category.id)}
>
  Request New Subcategory
</Button>
{openSubRequestCategoryId === category.id && (
  <div className="mt-4">
    <SellerSubcategoryRequestForm 
      categoryId={category.id} 
      categoryName={category.name}
      onClose={() => setOpenSubRequestCategoryId(null)}
    />
  </div>
)}
                </div>
              ))}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Didn't find your category?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Request a new category and our team will review it.
              </p>
              <SellerCategoryRequestForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CategoryBrowser;