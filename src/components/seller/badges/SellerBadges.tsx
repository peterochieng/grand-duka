
import { Shield, Award, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SellerBadgesProps {
  verified?: boolean;
  topRated?: boolean;
  className?: string;
}

export const SellerBadges = ({ verified, topRated, className }: SellerBadgesProps) => {
  if (!verified && !topRated) return null;
  
  return (
    <div className={cn("flex gap-1", className)}>
      {verified && (
        <div className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
          <Shield className="w-3 h-3" />
          <span>Verified</span>
        </div>
      )}
      {topRated && (
        <div className="flex items-center gap-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3" />
          <span>Top Rated</span>
        </div>
      )}
    </div>
  );
};
