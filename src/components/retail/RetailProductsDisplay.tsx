import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Card } from '@/components/ui/card';
import { Product } from '@/lib/types';

interface RetailProductsDisplayProps {
  isLoading: boolean;
  displayProducts: Product[];
}

const RetailProductsDisplay = ({ isLoading, displayProducts }: RetailProductsDisplayProps) => {
  // Filter products to show only those with approval_status of 'published'
  const publishedProducts = displayProducts.filter(
    (product) => product.approval_status === 'published'
  );
  console.log(publishedProducts);
  
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="h-[300px] animate-pulse bg-muted" />
          ))}
        </div>
      ) : publishedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {publishedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium">No products found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </>
  );
};

export default RetailProductsDisplay;