
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { Button } from "@/components/ui/button";

interface ProductsGridProps {
  products: Product[];
  clearFilters: () => void;
}

const ProductsGrid = ({ products, clearFilters }: ProductsGridProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">{products.length} Products</h2>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search terms
          </p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
