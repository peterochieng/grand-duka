
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { ProductHeader } from './sidebar/ProductHeader';
import { AuctionListing } from './sidebar/AuctionListing';
import { BuyNowListing } from './sidebar/BuyNowListing';
import { BestOfferListing } from './sidebar/BestOfferListing';
import { LegacyListings } from './sidebar/LegacyListings';
import { ProductDetails } from './sidebar/ProductDetails';
import { useProductActions } from './sidebar/useProductActions';
import { useState } from 'react';

interface ProductSidebarProps {
  product: Product;
}

export const ProductSidebar = ({ product }: ProductSidebarProps) => {
  const { handlePlaceBid, handleBuyNow, handleMakeOffer, isLoading } = useProductActions();
  const [userId] = useState("user123"); // Mock user ID for demonstration
  
  // Check if auction exists to determine if separator is needed for Buy Now
  const hasAuction = product.listingTypes?.auction?.enabled;
  
  // Check if any listing exists to determine spacing for Best Offer
  const hasPreviousListings = 
    (product.listingTypes?.auction?.enabled || 
     product.listingTypes?.buyItNow?.enabled);

  // Create wrapper functions that pass the required arguments
  const onPlaceBid = () => {
    handlePlaceBid(
      product.id,
      product.listingTypes?.auction?.currentBid || product.price,
      userId,
      product.seller.id
    );
  };
  
  const onBuyNow = () => {
    handleBuyNow(
      product.id,
      product.price,
      userId
    );
  };
  
  const onMakeOffer = () => {
    handleMakeOffer(
      product.id,
      product.price * 0.9, // Example: offer 90% of listing price
      userId,
      product.seller.id
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
        {/* Product Header */}
        <ProductHeader product={product} />
        
        {/* Purchase Options Section */}
        <div className="mb-6">
          {/* New format listings */}
          <AuctionListing 
            product={product} 
            onPlaceBid={onPlaceBid}
            isLoading={isLoading.bid}
          />
          
          <BuyNowListing 
            product={product} 
            onBuyNow={onBuyNow} 
            showSeparator={hasAuction}
            isLoading={isLoading.buy}
          />
          
          <BestOfferListing 
            product={product} 
            onMakeOffer={onMakeOffer} 
            previousListingsExist={hasPreviousListings}
          />
          
          {/* Legacy format listings */}
          <LegacyListings 
            product={product}
            onPlaceBid={onPlaceBid}
            onBuyNow={onBuyNow}
            onMakeOffer={onMakeOffer}
          />
          
          {/* Shipping information */}
          {product.listingTypes && (
            <p className="text-sm text-muted-foreground mt-4">
              {product.shipping === 0 ? 'Free shipping' : `+${product.currency} ${product.shipping} shipping`}
            </p>
          )}
        </div>
        
        {/* Product Details */}
        <ProductDetails product={product} />
      </div>
    </motion.div>
  );
};
