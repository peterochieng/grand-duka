import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';
import { Separator } from '@/components/ui/separator';
import { Car, FileCheck, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/useCategories';

const CategoryPage = () => {
  const { name } = useParams<{ categoryId: string }>();
  const { categories, loading: catLoading } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [allCategoryProducts, setAllCategoryProducts] = useState<any[]>([]);

  const categoryDetails = categories.find(c => c.id === name);
  const categoryName = categoryDetails ? categoryDetails.name : '';

  useEffect(() => {
    const fetchProducts = async () => {
      if (!name) return;
      const products = await getProductsByCategory(name);
      console.log(products);
      // Filter for only published products
      const publishedProducts = products.filter(product => product.approval_status === 'published');
      setAllCategoryProducts(publishedProducts);
    };

    fetchProducts();
  }, [name]);

  // Filter products based on search query
  const products = searchQuery
    ? allCategoryProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : allCategoryProducts;

  const isVehiclesCategory = categoryName.toLowerCase() === 'vehicles';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching in category:", searchQuery);
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold flex items-center">
                {isVehiclesCategory && <Car className="mr-2 h-6 w-6" />}
                {categoryName}
                {isVehiclesCategory && " Category"}
              </h1>
              <p className="text-muted-foreground">
                Browse our selection of {categoryName.toLowerCase()} products
                {isVehiclesCategory && " with detailed inspection reports"}
              </p>
            </div>

            <Separator className="my-4" />

            {/* Search bar */}
            <form onSubmit={handleSearch} className="my-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search in ${categoryName}...`}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </form>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `We couldn't find any products matching "${searchQuery}" in this category.` 
                    : "We couldn't find any products in this category. Please check back later."}
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}

            {isVehiclesCategory && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-2">
                  <FileCheck className="h-5 w-5" />
                  <h3>Vehicle Inspection Reports</h3>
                </div>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  All our vehicles come with detailed inspection reports. Click on any vehicle to view its full inspection details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;