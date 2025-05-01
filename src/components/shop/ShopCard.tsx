
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    image: string;
    description: string;
    rating: number;
    verified: boolean;
    type: 'retail' | 'wholesale';
    categories: string[];
    itemCount: number;
    location: string;
  };
}

const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={shop.image} alt={shop.name} />
            <AvatarFallback>{shop.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{shop.name}</CardTitle>
              {shop.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
              <span>{shop.rating}</span>
              <span className="mx-2">•</span>
              <span>{shop.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-2 flex-grow">
        <p className="text-sm text-muted-foreground mb-3">
          {shop.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant={shop.type === 'retail' ? 'default' : 'secondary'}>
            {shop.type === 'retail' ? 'Retail' : 'Wholesale'}
          </Badge>
          
          {shop.categories.slice(0, 2).map((category, index) => (
            <Badge key={index} variant="outline" className="bg-secondary/20">
              {category}
            </Badge>
          ))}
          
          {shop.categories.length > 2 && (
            <Badge variant="outline" className="bg-secondary/20">
              +{shop.categories.length - 2} more
            </Badge>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground">
          <Store className="h-3 w-3 inline mr-1" />
          {shop.itemCount} {shop.type === 'retail' ? 'products' : 'listings'}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-2">
        <Button 
          className="w-full" 
          variant={shop.type === 'retail' ? 'default' : 'secondary'}
          asChild
        >
          <Link to={`/shop/${shop.id}`}>
            Visit Shop
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopCard;
