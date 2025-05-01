
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/lib/types";
import { products } from "@/lib/products";

interface ListingImportModalProps {
  onSelectProduct: (product: Product) => void;
  onCancel: () => void;
}

const ListingImportModal: React.FC<ListingImportModalProps> = ({ onSelectProduct, onCancel }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import from Existing Listing</CardTitle>
        <CardDescription>
          Select one of your existing listings or search for other sellers' listings to use as a template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="my-listings">
          <TabsList className="mb-4">
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
            <TabsTrigger value="all-listings">All Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-listings" className="space-y-4">
            <Input placeholder="Search your listings..." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={onSelectProduct} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all-listings" className="space-y-4">
            <Input placeholder="Search all listings..." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {products.slice(4, 8).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={onSelectProduct} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t p-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <Card 
      className="cursor-pointer hover:border-primary/50 transition-colors" 
      onClick={() => onSelect(product)}
    >
      <div className="flex p-4">
        <img src={product.image} alt={product.title} className="h-20 w-20 rounded-md object-cover" />
        <div className="ml-4">
          <h3 className="font-medium line-clamp-2">{product.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {product.currency} {product.price}
          </p>
          <div className="flex mt-2">
            {product.listingTypes?.auction?.enabled && <Badge className="mr-1 bg-blue-500">Auction</Badge>}
            {product.listingTypes?.buyItNow?.enabled && <Badge className="mr-1">Buy It Now</Badge>}
            {product.listingTypes?.bestOffer?.enabled && <Badge variant="outline">Best Offer</Badge>}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListingImportModal;
