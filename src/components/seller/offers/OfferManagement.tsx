import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'accepted':
      return <Badge className="bg-green-500">Accepted</Badge>;
    case 'declined':
      return <Badge variant="destructive">Declined</Badge>;
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    case 'countered':
      return <Badge variant="secondary">Countered</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const OfferManagement = () => {
  const [activeTab, setActiveTab] = React.useState('received');
  
  // Sample data - would be fetched from API in a real app
  const receivedOffers = [
    { id: 'off-1', product: 'Vintage Watch', buyer: 'John Doe', amount: 120, originalPrice: 150, status: 'pending', date: '2023-05-15' },
    { id: 'off-2', product: 'Leather Jacket', buyer: 'Jane Smith', amount: 85, originalPrice: 100, status: 'accepted', date: '2023-05-14' },
    { id: 'off-3', product: 'Antique Vase', buyer: 'Mike Johnson', amount: 200, originalPrice: 250, status: 'declined', date: '2023-05-12' },
    { id: 'off-4', product: 'Gaming Console', buyer: 'Sarah Williams', amount: 280, originalPrice: 300, status: 'countered', date: '2023-05-10' },
  ];
  
  const sentOffers = [
    { id: 'sent-1', product: 'Bulk Order Discount', buyer: 'Retail Store A', amount: 450, originalPrice: 500, status: 'pending', date: '2023-05-16' },
    { id: 'sent-2', product: 'Special Promotion', buyer: 'Loyal Customer', amount: 180, originalPrice: 200, status: 'accepted', date: '2023-05-13' },
  ];
  
  const handleAcceptOffer = (offerId: string) => {
    console.log(`Accepting offer ${offerId}`);
    // API call to accept offer would go here
  };
  
  const handleDeclineOffer = (offerId: string) => {
    console.log(`Declining offer ${offerId}`);
    // API call to decline offer would go here
  };
  
  const handleCounterOffer = (offerId: string) => {
    console.log(`Counter offer for ${offerId}`);
    // Open counter offer dialog or navigate to counter offer page
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Offer Management</CardTitle>
          <CardDescription>
            View and respond to offers on your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="received">
                <MessageSquare className="w-4 h-4 mr-2" />
                Received Offers
              </TabsTrigger>
              <TabsTrigger value="sent">
                <MessageSquare className="w-4 h-4 mr-2" />
                Sent Offers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="received">
              <div className="flex justify-between mb-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
              
              <div className="space-y-4">
                {receivedOffers.map((offer) => (
                  <Card key={offer.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{offer.product}</h3>
                          <p className="text-sm text-muted-foreground">From: {offer.buyer}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-bold">${offer.amount}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              (Original: ${offer.originalPrice})
                            </span>
                          </div>
                          <div className="mt-2">
                            {getStatusBadge(offer.status)}
                          </div>
                        </div>
                        
                        {offer.status === 'pending' && (
                          <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleAcceptOffer(offer.id)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCounterOffer(offer.id)}
                            >
                              Counter
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeclineOffer(offer.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sent">
              <div className="space-y-4">
                {sentOffers.map((offer) => (
                  <Card key={offer.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{offer.product}</h3>
                          <p className="text-sm text-muted-foreground">To: {offer.buyer}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-bold">${offer.amount}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              (Original: ${offer.originalPrice})
                            </span>
                          </div>
                          <div className="mt-2">
                            {getStatusBadge(offer.status)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfferManagement;
