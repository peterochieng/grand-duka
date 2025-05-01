
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Package, Star, ExternalLink } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { FeedbackList } from '@/components/seller/FeedbackList';
import { Product } from '@/lib/types';
import { Seller } from '@/data/sellers';
import { Shop } from '@/data/shopsData';

interface SellerTabsProps {
  seller: Seller;
  shop: Shop | null;
  sellerProducts: Product[];
}

const SellerTabs = ({ seller, shop, sellerProducts }: SellerTabsProps) => {
  return (
    <Tabs defaultValue="products" className="mt-6">
      <TabsList className="w-full border-b rounded-none justify-start h-auto p-0 bg-transparent mb-4">
        <TabsTrigger value="products" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
          Products
        </TabsTrigger>
        <TabsTrigger value="feedback" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
          Feedback
        </TabsTrigger>
        <TabsTrigger value="about" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
          About
        </TabsTrigger>
      </TabsList>
      
      {/* Products Tab */}
      <TabsContent value="products" className="pt-4">
        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sellerProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md">
            <Package className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium">No products available</h3>
            <p className="text-muted-foreground">This seller doesn't have any active listings at the moment.</p>
          </div>
        )}
      </TabsContent>
      
      {/* Feedback Tab */}
      <TabsContent value="feedback" className="pt-4">
        <FeedbackList sellerId={seller.id} />
      </TabsContent>
      
      {/* About Tab */}
      <TabsContent value="about" className="pt-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Contact Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Email:</span> {seller.email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {seller.phone}</p>
                  <p><span className="text-muted-foreground">Location:</span> {seller.location}</p>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Business Type</h4>
                <p className="text-sm capitalize">{seller.businessType.replace('-', ' ')}</p>
                
                {shop && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Shop Information</h4>
                    <div className="flex items-center gap-2">
                      <Link to={`/shop/${shop.id}`} className="text-primary hover:underline flex items-center">
                        Visit {shop.name}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Policies</h3>
            <div className="border rounded-md p-4">
              <p className="text-sm">
                This seller adheres to GrandDuka's marketplace policies, ensuring safe and secure transactions.
                All purchases are covered by our buyer protection program.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SellerTabs;
