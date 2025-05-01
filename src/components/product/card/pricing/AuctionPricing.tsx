
import { Product } from '@/lib/data';

interface AuctionPricingProps {
  product: Product;
}

export const AuctionPricing = ({ product }: AuctionPricingProps) => {
  if (!product.listingTypes?.auction?.enabled) return null;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Current bid:</span>
        <span className="text-xs text-muted-foreground">{product.listingTypes.auction.timeLeft}</span>
      </div>
      <p className="font-semibold">
        {product.currency} {product.listingTypes.auction.currentBid?.toLocaleString()}
      </p>
    </div>
  );
};
