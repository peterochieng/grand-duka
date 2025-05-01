
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

interface BuyNowListingProps {
  product: Product;
  onBuyNow: () => void;
  showSeparator?: boolean;
  isLoading?: boolean;
}

export const BuyNowListing = ({ 
  product, 
  onBuyNow, 
  showSeparator = false,
  isLoading = false
}: BuyNowListingProps) => {
  if (!product.listingTypes?.buyItNow?.enabled) return null;
  
  return (
    <div className={showSeparator ? "mt-6 pt-6 border-t border-gray-200 dark:border-gray-800" : "mb-4"}>
      <div className="flex items-baseline mb-3">
        <span className="text-lg font-semibold">Buy It Now Price:</span>
        <span className="text-2xl font-bold ml-2">
          {product.currency} {product.listingTypes.buyItNow.price.toLocaleString()}
        </span>
      </div>
      <Button 
        variant="buynow" 
        className="w-full"
        onClick={onBuyNow}
        disabled={isLoading}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isLoading ? 'Adding to Cart...' : 'Buy Now'}
      </Button>
    </div>
  );
};
