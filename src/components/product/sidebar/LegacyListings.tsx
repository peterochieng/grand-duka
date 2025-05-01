
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

interface LegacyListingsProps {
  product: Product;
  onPlaceBid: () => void;
  onBuyNow: () => void;
  onMakeOffer: () => void;
}

export const LegacyListings = ({ 
  product, 
  onPlaceBid, 
  onBuyNow, 
  onMakeOffer 
}: LegacyListingsProps) => {
  if (product.listingTypes) return null;
  
  if (product.listingType === 'auction') {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-muted-foreground">Current bid:</span>
          <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
            {product.timeLeft} left
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{product.currency} {product.currentBid?.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground ml-2">
            + {product.shipping === 0 ? 'Free shipping' : `${product.currency} ${product.shipping} shipping`}
          </span>
        </div>
        <Button variant="auction" className="w-full mt-4" onClick={onPlaceBid}>Place Bid</Button>
      </div>
    );
  }
  
  return (
    <div className="mb-6">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{product.currency} {product.price.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground ml-2">
          + {product.shipping === 0 ? 'Free shipping' : `${product.currency} ${product.shipping} shipping`}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <Button variant="buynow" className="w-full" onClick={onBuyNow}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </Button>
        {product.listingType === 'offer' && (
          <Button variant="offer" className="w-full" onClick={onMakeOffer}>Make Offer</Button>
        )}
      </div>
    </div>
  );
};
