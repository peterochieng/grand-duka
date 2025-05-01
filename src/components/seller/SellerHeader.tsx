
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';
import { AddFeedbackDialog } from '@/components/seller/AddFeedbackDialog';
import { Shop } from '@/data/shopsData';
import { Seller } from '@/data/sellers';

interface SellerHeaderProps {
  seller: Seller;
  shop: Shop | null;
}

const SellerHeader = ({ seller, shop }: SellerHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-20 w-20 border">
          <AvatarImage src={shop?.image} alt={seller.businessName} />
          <AvatarFallback>{seller.businessName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{seller.businessName}</h1>
            {seller.verified && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                Verified
              </Badge>
            )}
            <Badge variant={seller.status === 'active' ? 'secondary' : 'outline'} className={seller.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' : ''}>
              {seller.status}
            </Badge>
          </div>
          
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
              <span className="font-medium">{seller.rating}</span>
            </div>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span className="text-muted-foreground text-sm">{seller.location}</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span className="text-muted-foreground text-sm">Member since {new Date(seller.createdAt).toLocaleDateString()}</span>
          </div>
          
          <p className="mt-2 text-muted-foreground">
            {shop ? `${shop.description}` : `${seller.businessType} seller offering ${seller.productsCount} products`}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 min-w-48">
          <AddFeedbackDialog sellerId={seller.id} sellerName={seller.businessName} />
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Seller
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerHeader;
