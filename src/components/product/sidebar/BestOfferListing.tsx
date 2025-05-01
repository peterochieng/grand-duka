
import { MessageSquareQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

interface BestOfferListingProps {
  product: Product;
  onMakeOffer: () => void;
  previousListingsExist: boolean;
}

export const BestOfferListing = ({ 
  product, 
  onMakeOffer, 
  previousListingsExist 
}: BestOfferListingProps) => {
  if (!product.listingTypes?.bestOffer?.enabled) return null;
  
  return (
    <div className={previousListingsExist ? "mt-4" : ""}>
      <div className="flex items-baseline mb-3">
        <span className="text-lg font-semibold">Make an Offer</span>
        {product.listingTypes.bestOffer.minOffer && (
          <span className="text-sm text-muted-foreground ml-2">
            (Min: {product.currency} {product.listingTypes.bestOffer.minOffer.toLocaleString()})
          </span>
        )}
      </div>
      <Button 
        variant="offer" 
        className="w-full"
        onClick={onMakeOffer}
      >
        <MessageSquareQuote className="mr-2 h-4 w-4" />
        Make Offer
      </Button>
    </div>
  );
};
