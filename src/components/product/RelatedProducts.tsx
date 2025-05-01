
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/data';
import { motion } from 'framer-motion';

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;
  
  return (
    <motion.section 
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-medium mb-6">Related Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
};
