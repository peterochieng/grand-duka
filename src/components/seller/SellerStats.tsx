
import React from 'react';
import { Package, Star, User, ShoppingBag } from 'lucide-react';
import { Seller } from '@/data/sellers';

interface SellerStatsProps {
  seller: Seller;
}

const SellerStats = ({ seller }: SellerStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-background border rounded-lg p-4 text-center">
        <Package className="h-5 w-5 mx-auto mb-2 text-primary" />
        <div className="font-bold text-xl">{seller.productsCount}</div>
        <div className="text-sm text-muted-foreground">Products</div>
      </div>
      
      <div className="bg-background border rounded-lg p-4 text-center">
        <Star className="h-5 w-5 mx-auto mb-2 text-amber-500" />
        <div className="font-bold text-xl">{seller.rating}</div>
        <div className="text-sm text-muted-foreground">Rating</div>
      </div>
      
      <div className="bg-background border rounded-lg p-4 text-center">
        <User className="h-5 w-5 mx-auto mb-2 text-indigo-500" />
        <div className="font-bold text-xl">{seller.ownerName}</div>
        <div className="text-sm text-muted-foreground">Owner</div>
      </div>
      
      <div className="bg-background border rounded-lg p-4 text-center">
        <ShoppingBag className="h-5 w-5 mx-auto mb-2 text-emerald-500" />
        <div className="font-bold text-xl">{(seller.revenue / 1000).toFixed(1)}k</div>
        <div className="text-sm text-muted-foreground">Revenue (AED)</div>
      </div>
    </div>
  );
};

export default SellerStats;
