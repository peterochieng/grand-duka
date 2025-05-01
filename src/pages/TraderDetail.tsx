
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getTraderById, getCommoditiesByTrader } from '@/lib/utils/traderUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TraderHeader from '@/components/trader/TraderHeader';
import TraderDetailTabs from '@/components/trader/TraderDetailTabs';
import TraderSidebar from '@/components/trader/TraderSidebar';

const TraderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const trader = getTraderById(id || '');
  const traderCommodities = getCommoditiesByTrader(id || '');
  
  if (!trader) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Trader Not Found</h1>
        <p className="text-muted-foreground mb-6">The trader you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/traders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Traders
          </Link>
        </Button>
      </div>
    );
  }
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following!",
      description: isFollowing 
        ? `You will no longer receive updates from ${trader.name}`
        : `You will now receive updates from ${trader.name}`,
    });
  };
  
  return (
    <div className="container py-6">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/traders">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Traders
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TraderHeader 
            trader={trader} 
            isFollowing={isFollowing} 
            onFollowToggle={handleFollowToggle} 
          />
          
          <div className="mt-8">
            <TraderDetailTabs trader={trader} traderCommodities={traderCommodities} />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <TraderSidebar 
            trader={trader} 
            isFollowing={isFollowing} 
            onFollowToggle={handleFollowToggle} 
          />
        </div>
      </div>
    </div>
  );
};

export default TraderDetail;
