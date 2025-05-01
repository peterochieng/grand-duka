
import { Badge } from "@/components/ui/badge";
import { Shop } from "@/types/shopTypes";
import { BadgeCheck, Star, Shield, Award } from "lucide-react";

interface ShopBadgesProps {
  shop: Shop;
}

export const ShopBadges = ({ shop }: ShopBadgesProps) => {
  return (
    <div className="flex gap-1">
      {shop.verified && (
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          <BadgeCheck className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      )}
      {shop.featured && (
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          <Star className="w-3 h-3 mr-1" />
          Featured
        </Badge>
      )}
      {shop.recommended && (
        <Badge variant="outline" className="border-green-500 text-green-500">
          <Shield className="w-3 h-3 mr-1" />
          Recommended
        </Badge>
      )}
      {shop.hasPerks && (
        <Badge variant="outline" className="border-purple-500 text-purple-500">
          <Award className="w-3 h-3 mr-1" />
          Special Perks
        </Badge>
      )}
    </div>
  );
};
