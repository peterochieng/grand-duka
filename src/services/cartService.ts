
import { supabase } from '@/integrations/supabase/client';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  price: number;
  listing_type: 'buyNow' | 'auction' | 'offer';
  created_at: string;
  updated_at: string;
  product?: {
    title: string;
    image: string;
    seller_id: string;
    seller_name?: string;
  };
}

export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:product_id (
          title,
          image,
          seller_id
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Handle potential relation errors
    return data.map((item: any) => {
      if (item.product && 'error' in item.product) {
        item.product = { 
          title: 'Unknown Product', 
          image: '/placeholder.svg',
          seller_id: 'unknown',
          seller_name: 'Unknown Seller'
        };
      }
      return item as CartItem;
    });
  } catch (e) {
    console.error('Exception in getCartItems:', e);
    return [];
  }
};

export const addToCart = async (
  userId: string,
  productId: string,
  price: number,
  quantity: number = 1,
  listingType: 'buyNow' | 'auction' | 'offer' = 'buyNow'
): Promise<CartItem | null> => {
  try {
    // Check if item already exists in cart
    const { data: existingItems, error: queryError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('listing_type', listingType);
    
    if (queryError) {
      console.error('Error checking existing cart items:', queryError);
      return null;
    }
    
    if (existingItems && existingItems.length > 0) {
      // Update quantity if item exists
      const item = existingItems[0];
      const newQuantity = item.quantity + quantity;
      
      const { data, error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq('id', item.id)
        .select();
      
      if (updateError) {
        console.error('Error updating cart item:', updateError);
        return null;
      }
      
      return data[0] as CartItem;
    } else {
      // Insert new item
      const { data, error: insertError } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          quantity,
          price,
          listing_type: listingType
        })
        .select();
      
      if (insertError) {
        console.error('Error adding item to cart:', insertError);
        return null;
      }
      
      return data[0] as CartItem;
    }
  } catch (e) {
    console.error('Exception in addToCart:', e);
    return null;
  }
};

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<CartItem | null> => {
  try {
    if (quantity < 1) {
      return removeFromCart(itemId);
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('id', itemId)
      .select();
    
    if (error) {
      console.error('Error updating cart item quantity:', error);
      return null;
    }
    
    return data[0] as CartItem;
  } catch (e) {
    console.error('Exception in updateCartItemQuantity:', e);
    return null;
  }
};

export const removeFromCart = async (itemId: string): Promise<CartItem | null> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .select();
    
    if (error) {
      console.error('Error removing item from cart:', error);
      return null;
    }
    
    return data[0] as CartItem;
  } catch (e) {
    console.error('Exception in removeFromCart:', e);
    return null;
  }
};

export const clearCart = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Exception in clearCart:', e);
    return false;
  }
};
