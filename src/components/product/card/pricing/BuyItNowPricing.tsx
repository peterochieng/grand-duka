
import { Product } from '@/lib/data';

interface BuyItNowPricingProps {
  product: Product;
}

export const BuyItNowPricing = ({ product }: BuyItNowPricingProps) => {
  if (!product.listingTypes?.buyItNow?.enabled) return null;

  return (
    <p className="font-semibold">
      {product.currency} {product.listingTypes.buyItNow.price.toLocaleString()}
    </p>
  );
};
