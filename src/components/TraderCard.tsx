
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Package } from "lucide-react";
import { Trader } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

interface TraderCardProps {
  trader: Trader;
  compact?: boolean;
}

const TraderCard = ({ trader, compact = false }: TraderCardProps) => {
  const handleSubscribe = () => {
    toast({
      title: "Subscribed!",
      description: `You are now following ${trader.name}`,
    });
  };

  return (
    <Card className="h-full overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={trader.image}
          alt={trader.name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg line-clamp-1">
            {trader.name}
            {trader.verified && (
              <CheckCircle className="ml-1 inline-block h-4 w-4 text-blue-500" />
            )}
          </CardTitle>
          <Badge variant={trader.type === 'trader' ? 'default' : 'secondary'}>
            {trader.type === 'trader' ? 'Trader' : 'Broker'}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {trader.description}
        </CardDescription>
      </CardHeader>
      
      {!compact && (
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-1 mb-2">
            {trader.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/50">
                {specialty}
              </Badge>
            ))}
            {trader.specialties.length > 3 && (
              <Badge variant="outline" className="bg-secondary/50">
                +{trader.specialties.length - 3} more
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{trader.followers} followers</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3.5 w-3.5" />
              <span>{trader.commodities} listings</span>
            </div>
          </div>
        </CardContent>
      )}
      
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Button 
            variant="secondary"
            className="flex-1" 
            onClick={handleSubscribe}
          >
            Follow
          </Button>
          <Button 
            variant={trader.type === 'trader' ? 'default' : 'secondary'}
            className="flex-1"
            asChild
          >
            <Link to={`/trader/${trader.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TraderCard;
