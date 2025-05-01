
import { Button } from "@/components/ui/button";
import { useShopSubscription } from "@/hooks/useShopSubscription";
import { Bell, BellOff } from "lucide-react";

interface ShopSubscribeButtonProps {
  shopId: string;
  className?: string;
}

export const ShopSubscribeButton = ({ shopId, className }: ShopSubscribeButtonProps) => {
  const { isSubscribed, loading, subscribe, unsubscribe } = useShopSubscription(shopId);

  if (loading) {
    return <Button variant="outline" className={className} disabled>Loading...</Button>;
  }

  if (isSubscribed) {
    return (
      <Button 
        variant="outline" 
        className={className}
        onClick={unsubscribe}
      >
        <BellOff className="h-4 w-4 mr-2" />
        Unsubscribe
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      className={className}
      onClick={subscribe}
    >
      <Bell className="h-4 w-4 mr-2" />
      Subscribe
    </Button>
  );
};
