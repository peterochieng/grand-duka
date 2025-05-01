
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from './ProductCard';
import { getFeaturedProducts, Product } from '@/lib/data';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a slight delay
    const timer = setTimeout(() => {
      setProducts(getFeaturedProducts());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Skeleton loader during data fetching
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-800 aspect-[4/3]" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="my-12 animate-fade-in animation-delay-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Featured Products</h2>
        <Button variant="ghost" className="group">
          View all
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
