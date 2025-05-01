
import { Clock, ShoppingCart, MessageSquareQuote, Gavel } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/data';

interface ListingTypeBadgesProps {
  product: Product;
}

export const ListingTypeBadges = ({ product }: ListingTypeBadgesProps) => {
  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
      {!product.listingTypes && product.listingType === 'auction' && (
        <Badge className="bg-amber-500 hover:bg-amber-600">
          <Clock className="w-3 h-3 mr-1" />
          Auction
        </Badge>
      )}
      
      {!product.listingTypes && product.listingType === 'offer' && (
        <Badge className="bg-emerald-500 hover:bg-emerald-600">
          Offer
        </Badge>
      )}
      
      {product.listingTypes?.auction?.enabled && (
        <Badge className="bg-amber-500 hover:bg-amber-600">
          <Gavel className="w-3 h-3 mr-1" />
          Auction
        </Badge>
      )}
      
      {product.listingTypes?.buyItNow?.enabled && (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <ShoppingCart className="w-3 h-3 mr-1" />
          Buy Now
        </Badge>
      )}
      
      {product.listingTypes?.bestOffer?.enabled && (
        <Badge className="bg-emerald-500 hover:bg-emerald-600">
          <MessageSquareQuote className="w-3 h-3 mr-1" />
          Offer
        </Badge>
      )}
    </div>
  );
};
