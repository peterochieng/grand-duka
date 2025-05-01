
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addToCart } from '@/services/cartService';
import { placeBid } from '@/services/bidService';
import { makeOffer } from '@/services/offerService';

export const useProductActions = () => {
  const [isLoading, setIsLoading] = useState({
    bid: false,
    buy: false,
    offer: false
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
      const result = await placeBid(
        productId,
        userId,
        sellerId,
        amount
      );
      
      if (result) {
        toast({
          title: "Bid Placed",
          description: "Your bid has been placed successfully.",
        });
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
  
  const handleBuyNow = async (
    productId: string,
    price: number,
    userId: string
  ) => {
    setIsLoading(prev => ({ ...prev, buy: true }));
    try {
      const result = await addToCart(
        userId,
        productId,
        price,
        1,
        'buyNow'
      );
      
      if (result) {
        toast({
          title: "Item Added to Cart",
          description: "The item has been added to your cart.",
        });
      } else {
        toast({
          title: "Error",
          description: "There was an error adding to cart. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "There was an error adding to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, buy: false }));
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
      const result = await makeOffer(
        productId,
        userId,
        sellerId,
        amount,
        'USD',
        message
      );
      
      if (result) {
        toast({
          title: "Offer Sent",
          description: "Your offer has been sent to the seller.",
        });
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

  return {
    handlePlaceBid,
    handleBuyNow,
    handleMakeOffer,
    isLoading
  };
};
