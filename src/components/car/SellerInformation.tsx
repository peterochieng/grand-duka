
import { Info, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SellerInformationProps {
  sellerInfo: {
    type: string;
    responseTime: string;
    preferredContact: string[];
  };
}

export const SellerInformation = ({ sellerInfo }: SellerInformationProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="space-y-4 flex-1">
        <div>
          <h4 className="font-medium">Type</h4>
          <p className="text-sm mt-1">
            {sellerInfo.type}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium">Response Time</h4>
          <p className="text-sm mt-1">
            {sellerInfo.responseTime}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium">Preferred Contact Methods</h4>
          <div className="flex gap-2 mt-2">
            {sellerInfo.preferredContact.map(method => (
              <Badge key={method} variant="outline">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <h4 className="font-medium flex items-center">
            <Info className="h-4 w-4 text-blue-500 mr-2" />
            Premium Dealer
          </h4>
          <p className="text-sm mt-2">
            This seller is a verified Premium Auto Gallery dealer with excellent customer satisfaction ratings.
          </p>
          <div className="flex items-center mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="h-4 w-4 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span className="text-sm ml-2">5.0 (132 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
