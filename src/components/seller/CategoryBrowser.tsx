
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { CategoryRequest } from './CategoryRequest';
import { useCategories } from '@/hooks/useCategories';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { SellerCategoryRequestForm } from './SellerCategoryRequestForm';

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories?: Subcategory[];
}

const CategoryBrowser = () => {
  const { categories, loading } = useCategories();

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
            Browse categories and subcategories available for your listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categories
              ?.filter((category: any) => category.is_available_to_sellers === true)
              .map((category: any) => (
                <div key={category.id} className="space-y-2">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories?.map((subcategory: any) => (
                      <Badge key={subcategory.id} variant="secondary">
                        {subcategory.name}
                      </Badge>
                    ))}
                  </div>
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
