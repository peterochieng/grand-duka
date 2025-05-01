
import { Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

interface AuctionListingProps {
  product: Product;
  onPlaceBid: () => void;
  isLoading?: boolean;
}

export const AuctionListing = ({ 
  product, 
  onPlaceBid,
  isLoading = false
}: AuctionListingProps) => {
  if (!product.listingTypes?.auction?.enabled) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-muted-foreground">Current bid:</span>
        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
          {product.listingTypes.auction.timeLeft} left
        </span>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">
          {product.currency} {product.listingTypes.auction.currentBid?.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground ml-2">
          + {product.shipping === 0 ? 'Free shipping' : `${product.currency} ${product.shipping} shipping`}
        </span>
      </div>
      <Button 
        variant="auction" 
        className="w-full mt-4"
        onClick={onPlaceBid}
        disabled={isLoading}
      >
        <Gavel className="mr-2 h-4 w-4" />
        {isLoading ? 'Placing Bid...' : 'Place Bid'}
      </Button>
    </div>
  );
};
