
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { AddFeedbackDialog } from '@/components/seller/AddFeedbackDialog';

interface SellerInfoSectionProps {
  product: Product;
}

export const SellerInfoSection = ({ product }: SellerInfoSectionProps) => {
  return (
    <div className="mt-8 border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">About the Seller</h3>
          <div className="flex items-center gap-2 mt-1">
            <Link to={`/seller/${product.seller.id}`} className="text-primary hover:underline">
              Visit {product.seller.name}'s profile
            </Link>
          </div>
        </div>
        <AddFeedbackDialog 
          sellerId={product.seller.id}
          sellerName={product.seller.name}
          productId={product.id}
          productName={product.title}
        />
      </div>
    </div>
  );
};
