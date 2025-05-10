import { Link } from 'react-router-dom';
import { Star, Store } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListingTypeBadges } from '@/components/product/card/ListingTypeBadges';
import { ProductImage } from '@/components/product/card/ProductImage';
import { FavoriteButton } from '@/components/product/card/FavoriteButton';
import { ProductPricing } from '@/components/product/card/ProductPricing';
import { SellerBadges } from '@/components/seller/badges/SellerBadges';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // New data field is "listingtypes" (all lowercase)
  const listingTypes = product.listingTypes;
  
  const hasMultipleListingTypes = () => {
    if (!listingTypes) return false;
    
    let enabledCount = 0;
    if (listingTypes.auction?.enabled) enabledCount++;
    if (listingTypes.buyItNow?.enabled) enabledCount++;
    if (listingTypes.bestOffer?.enabled) enabledCount++;
    
    return enabledCount > 1;
  };

  console.log(product);

  // Fallback image if product.image is null
  const productImage = product.image || '/placeholder-image.png';

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] group h-full flex flex-col border-gray-200 dark:border-gray-800">
      <Link 
        to={`/product/${product.id}`} 
        className="relative block overflow-hidden aspect-[4/3]"
      >
        {/* Only display listing badges if listingTypes is available */}
        {listingTypes && <ListingTypeBadges product={product} />}
        <ProductImage src={productImage} alt={product.title} />
        <FavoriteButton productId={product.id} />
      </Link>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
            <span className="text-xs font-medium">
              {product.seller?.rating ?? '-'}
            </span>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            {product.condition}
          </Badge>
        </div>
        
        <Link to={`/product/${product.id}`} className="group-hover:text-primary">
          <h3 className="font-medium line-clamp-2 mb-2 text-sm md:text-base">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-1 mb-2">
          <Link 
            to={`/seller/${product.seller?.id}`} 
            className="text-xs text-muted-foreground hover:text-primary hover:underline flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Store className="h-3 w-3 mr-1" />
            {product.seller?.name || 'Unknown Seller'}
          </Link>
          
          {product.seller && (
            <SellerBadges 
              verified={product.seller.verified}
              topRated={product.seller.rating >= 4.5}
              className="mt-1"
            />
          )}
        </div>
        
        <ProductPricing 
          product={product}  
          hasMultipleListingTypes={hasMultipleListingTypes()}
        />
      </CardContent>
    </Card>
  );
};