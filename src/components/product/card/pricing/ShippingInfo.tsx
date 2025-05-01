
import { Product } from '@/lib/data';

interface ShippingInfoProps {
  product: Product;
}

export const ShippingInfo = ({ product }: ShippingInfoProps) => {
  return (
    <p className="text-xs text-muted-foreground mt-1">
      {product.shipping === 0 
        ? 'Free shipping' 
        : `+${product.currency} ${product.shipping} shipping`}
    </p>
  );
};
