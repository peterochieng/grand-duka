
import { Star, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/types';
import { Link } from 'react-router-dom';

interface ProductHeaderProps {
  product: Product;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-medium mb-2">{product.title}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-amber-500 mr-1" />
          <span className="text-sm font-medium">{product.seller.rating}</span>
        </div>
        <Separator orientation="vertical" className="mx-3 h-4" />
        <span className="text-sm text-muted-foreground">
          Seller: {' '}
          <Link to={`/seller/${product.seller.id}`} className="hover:underline text-primary">
            {product.seller.name}
            {product.seller.verified && (
              <Check className="inline-block ml-1 h-3 w-3 text-blue-500" />
            )}
          </Link>
        </span>
      </div>
    </>
  );
};
