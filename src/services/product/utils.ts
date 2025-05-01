
import { Product } from '@/lib/types';
import { ProductRow } from '@/lib/types/supabaseTypes';

export const handleSellerData = (row: any): Product => {
  const productRow = row as ProductRow;
  
  if (row.seller && 'error' in row.seller) {
    row.seller = {
      id: row.seller_id,
      name: 'Unknown Seller',
      rating: 0,
      verified: false
    };
  } else if (row.seller) {
    row.seller = {
      id: row.seller_id,
      name: row.seller.business_name,
      rating: row.seller.rating,
      verified: row.seller.verified
    };
  }
  
  return productRow as unknown as Product;
};
