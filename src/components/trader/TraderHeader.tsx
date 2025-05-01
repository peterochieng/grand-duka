
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trader } from '@/lib/types';
import { Star, Users, Package, CheckCircle } from 'lucide-react';

interface TraderHeaderProps {
  trader: Trader;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

const TraderHeader = ({ trader, isFollowing, onFollowToggle }: TraderHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="w-full md:w-auto">
          <div className="h-32 md:h-40 md:w-64 overflow-hidden rounded-lg">
            <img 
              src={trader.image} 
              alt={trader.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold">{trader.name}</h1>
            {trader.verified && (
              <CheckCircle className="h-5 w-5 text-blue-500" />
            )}
            <Badge variant={trader.type === 'trader' ? 'default' : 'secondary'} className="ml-1">
              {trader.type === 'trader' ? 'Trader' : 'Broker'}
            </Badge>
          </div>
          
          <p className="text-muted-foreground">{trader.description}</p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="font-medium">{trader.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>{trader.commodities} listings</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{trader.followers} followers</span>
            </div>
            <div className="text-muted-foreground">
              {trader.location}
            </div>
          </div>
        </div>
        
        <div className="md:self-start">
          <Button 
            variant={isFollowing ? "outline" : "default"}
            onClick={onFollowToggle}
            className="w-full md:w-auto"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TraderHeader;
