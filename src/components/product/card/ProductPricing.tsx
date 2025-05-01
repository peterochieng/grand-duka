
import { Product } from '@/lib/data';
import { AuctionPricing } from './pricing/AuctionPricing';
import { BuyItNowPricing } from './pricing/BuyItNowPricing';
import { LegacyPricing } from './pricing/LegacyPricing';
import { ShippingInfo } from './pricing/ShippingInfo';

interface ProductPricingProps {
  product: Product;
  hasMultipleListingTypes: boolean;
}

export const ProductPricing = ({ product, hasMultipleListingTypes }: ProductPricingProps) => {
  return (
    <div className="mt-2 pt-2">
      <AuctionPricing product={product} />
      <BuyItNowPricing product={product} />
      <LegacyPricing product={product} />
      
      {hasMultipleListingTypes && (
        <p className="text-xs text-primary font-medium mt-1">
          Multiple purchase options available
        </p>
      )}
      
      <ShippingInfo product={product} />
    </div>
  );
};
