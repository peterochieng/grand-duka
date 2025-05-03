import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { getProducts } from "@/services/product";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        // getProducts should query your database or filter your global list
        // Here we assume getProducts accepts a search query and returns matching products.
        const results = await getProducts(query);
        setProducts(results);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchFilteredProducts();
    } else {
      setProducts([]);
    }
  }, [query]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found matching your query.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;