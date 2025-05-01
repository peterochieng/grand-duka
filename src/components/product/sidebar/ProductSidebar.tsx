
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/lib/types';
import { ProductHeader } from './ProductHeader';
import { AuctionListing } from './AuctionListing';
import { BuyNowListing } from './BuyNowListing';
import { BestOfferListing } from './BestOfferListing';
import { LegacyListings } from './LegacyListings';
import { ProductDetails } from './ProductDetails';
import { PlaceBidDialog } from '../bids/PlaceBidDialog';
import { MakeOfferDialog } from '../offers/MakeOfferDialog';
import { useBuyerActions } from '@/hooks/useBuyerActions';
import { useToast } from '@/hooks/use-toast';

interface ProductSidebarProps {
  product: Product;
}

export const ProductSidebar = ({ product }: ProductSidebarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { handlePlaceBid, handleMakeOffer, handleBuyNow, isLoading } = useBuyerActions();
  
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  
  const hasAuction = product.listingTypes?.auction?.enabled;
  const hasPreviousListings = (
    product.listingTypes?.auction?.enabled || 
    product.listingTypes?.buyItNow?.enabled
  );

  const handleBidClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place a bid.",
        variant: "destructive"
      });
      return;
    }
    setShowBidDialog(true);
  };

  const handleOfferClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make an offer.",
        variant: "destructive"
      });
      return;
    }
    setShowOfferDialog(true);
  };

  const handleBuyNowClick = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to buy this item.",
        variant: "destructive"
      });
      return;
    }

    await handleBuyNow(
      product.id,
      product.listingTypes?.buyItNow?.price || product.price,
      user.id
    );
  };

  const onPlaceBid = async (amount: number) => {
    if (!user) return;
    
    await handlePlaceBid(
      product.id,
      amount,
      user.id,
      product.seller.id
    );
  };

  const onMakeOffer = async (amount: number, message?: string) => {
    if (!user) return;
    
    await handleMakeOffer(
      product.id,
      amount,
      user.id,
      product.seller.id,
      message
    );
  };
  
  return (
    <motion.div 
      className="w-full md:w-1/3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="sticky top-24">
        <ProductHeader product={product} />
        
        <div className="mb-6">
          <AuctionListing 
            product={product} 
            onPlaceBid={handleBidClick} 
          />
          
          <BuyNowListing 
            product={product} 
            onBuyNow={handleBuyNowClick} 
            showSeparator={hasAuction}
          />
          
          <BestOfferListing 
            product={product} 
            onMakeOffer={handleOfferClick}
            previousListingsExist={hasPreviousListings}
          />
          
          <LegacyListings 
            product={product}
            onPlaceBid={handleBidClick}
            onBuyNow={handleBuyNowClick}
            onMakeOffer={handleOfferClick}
          />
          
          {product.listingTypes && (
            <p className="text-sm text-muted-foreground mt-4">
              {product.shipping === 0 ? 'Free shipping' : `+${product.currency} ${product.shipping} shipping`}
            </p>
          )}
        </div>
        
        <ProductDetails product={product} />
      </div>

      <PlaceBidDialog 
        product={product}
        onPlaceBid={onPlaceBid}
        isOpen={showBidDialog}
        onClose={() => setShowBidDialog(false)}
      />

      <MakeOfferDialog
        product={product}
        onMakeOffer={onMakeOffer}
        isOpen={showOfferDialog}
        onClose={() => setShowOfferDialog(false)}
      />
    </motion.div>
  );
};
