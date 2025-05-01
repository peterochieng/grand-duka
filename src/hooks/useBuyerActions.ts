
import { useState } from 'react';
import { useToast } from './use-toast';
import { placeBid } from '@/services/bidService';
import { makeOffer } from '@/services/offerService';
import { addToCart } from '@/services/cartService';

export const useBuyerActions = () => {
  const [isLoading, setIsLoading] = useState({
    bid: false,
    offer: false,
    buyNow: false,
  });
  const { toast } = useToast();

  const handlePlaceBid = async (
    productId: string,
    amount: number,
    userId: string,
    sellerId: string
  ) => {
    setIsLoading(prev => ({ ...prev, bid: true }));
    try {
      const bid = await placeBid(productId, userId, sellerId, amount);
      
      if (bid) {
        toast({
          title: "Bid Placed",
          description: "Your bid has been placed successfully.",
        });
        return bid;
      } else {
        toast({
          title: "Bid Failed",
          description: "There was an error placing your bid. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      toast({
        title: "Bid Failed",
        description: "There was an error placing your bid. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, bid: false }));
    }
  };

  const handleMakeOffer = async (
    productId: string,
    amount: number,
    userId: string,
    sellerId: string,
    message?: string
  ) => {
    setIsLoading(prev => ({ ...prev, offer: true }));
    try {
      const offer = await makeOffer(productId, userId, sellerId, amount, 'USD', message);
      
      if (offer) {
        toast({
          title: "Offer Sent",
          description: "Your offer has been sent to the seller.",
        });
        return offer;
      } else {
        toast({
          title: "Offer Failed",
          description: "There was an error sending your offer. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error making offer:', error);
      toast({
        title: "Offer Failed",
        description: "There was an error sending your offer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, offer: false }));
    }
  };

  const handleBuyNow = async (
    productId: string,
    price: number,
    userId: string,
  ) => {
    setIsLoading(prev => ({ ...prev, buyNow: true }));
    try {
      const cartItem = await addToCart(userId, productId, price, 1, 'buyNow');
      
      if (cartItem) {
        toast({
          title: "Added to Cart",
          description: "Item has been added to your cart.",
        });
        return cartItem;
      } else {
        toast({
          title: "Error",
          description: "There was an error adding the item to cart. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "There was an error adding the item to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, buyNow: false }));
    }
  };

  return {
    handlePlaceBid,
    handleMakeOffer,
    handleBuyNow,
    isLoading
  };
};
