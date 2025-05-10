import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch only products that have been approved
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("approval_status", "approved")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data as any);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  return (
    <section className="my-12 animate-fade-in animation-delay-200">
      <div className="flex justify-between items-center mb-6">
        {/* You can add a header or title for featured products here */}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};