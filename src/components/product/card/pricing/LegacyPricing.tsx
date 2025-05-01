
import { Product } from '@/lib/data';

interface LegacyPricingProps {
  product: Product;
}

export const LegacyPricing = ({ product }: LegacyPricingProps) => {
  if (product.listingTypes) return null;

  if (product.listingType === 'auction') {
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Current bid:</span>
          <span className="text-xs text-muted-foreground">{product.timeLeft}</span>
        </div>
        <p className="font-semibold">
          {product.currency} {product.currentBid?.toLocaleString()}
        </p>
      </div>
    );
  }

  return (
    <p className="font-semibold">
      {product.currency} {product.price.toLocaleString()}
    </p>
  );
};
