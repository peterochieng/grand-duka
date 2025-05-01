
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, CheckCircle } from "lucide-react";
import { Commodity } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface CommodityCardProps {
  commodity: Commodity;
}

const CommodityCard = ({ commodity }: CommodityCardProps) => {
  const handleSubscribe = () => {
    toast({
      title: "Price Alert Set!",
      description: `You'll be notified of price changes for ${commodity.title}`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const availabilityDate = formatDate(commodity.availabilityDate);

  return (
    <Card className="h-full overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={commodity.image}
          alt={commodity.title}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg line-clamp-1">
            {commodity.title}
          </CardTitle>
          <Badge>{commodity.category}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-bold text-lg">
            {commodity.currency} {commodity.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">
            {commodity.priceUnit}
          </span>
        </div>
        <CardDescription className="line-clamp-2">
          {commodity.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Available: {availabilityDate}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{commodity.location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
            <img 
              src={commodity.trader.image} 
              alt={commodity.trader.name}
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium flex items-center">
              {commodity.trader.name}
              {commodity.trader.verified && (
                <CheckCircle className="ml-1 h-3 w-3 text-blue-500" />
              )}
            </span>
            <span className="text-xs text-muted-foreground">
              {commodity.trader.type === 'trader' ? 'Trader' : 'Broker'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Button 
            variant="subscribe"
            className="flex-1" 
            onClick={handleSubscribe}
          >
            Set Alert
          </Button>
          <Button 
            variant={commodity.trader.type === 'trader' ? 'trader' : 'broker'}
            className="flex-1"
            asChild
          >
            <Link to={`/commodity/${commodity.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommodityCard;
