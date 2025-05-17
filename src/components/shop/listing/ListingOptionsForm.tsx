import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ListingOptionsFormProps {
  listingType: string;
  setListingType: (type: string) => void;
  startingBid: number;
  setStartingBid: (bid: number) => void;
  reservePrice: number;
  setReservePrice: (price: number) => void;
  auctionDuration: string;
  setAuctionDuration: (duration: string) => void;
  fixedPrice: number;
  setFixedPrice: (price: number) => void;
  bestOfferEnabled: boolean;
  setBestOfferEnabled: (enabled: boolean) => void;
  minimumOffer: number;
  setMinimumOffer: (offer: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

// Helper to render a label with an asterisk for required fields.
const renderLabel = (label: string, required?: boolean) => (
  <span>
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
  </span>
);

const ListingOptionsForm: React.FC<ListingOptionsFormProps> = ({
  listingType,
  setListingType,
  startingBid,
  setStartingBid,
  reservePrice,
  setReservePrice,
  auctionDuration,
  setAuctionDuration,
  fixedPrice,
  setFixedPrice,
  bestOfferEnabled,
  setBestOfferEnabled,
  minimumOffer,
  setMinimumOffer,
  currency,
  setCurrency,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listing Options</CardTitle>
        <CardDescription>Choose how you want to sell your item</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue={listingType} onValueChange={setListingType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="auction">Auction</TabsTrigger>
            <TabsTrigger value="fixed">Fixed Price</TabsTrigger>
            <TabsTrigger value="both">Auction + Fixed Price + Best Offer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auction" className="space-y-4 mt-4">
            <AuctionSettings 
              startingBid={startingBid}
              setStartingBid={setStartingBid}
              reservePrice={reservePrice}
              setReservePrice={setReservePrice}
              auctionDuration={auctionDuration}
              setAuctionDuration={setAuctionDuration}
            />
          </TabsContent>
          
          <TabsContent value="fixed" className="space-y-4 mt-4">
            <FixedPriceSettings 
              fixedPrice={fixedPrice}
              setFixedPrice={setFixedPrice}
              bestOfferEnabled={bestOfferEnabled}
              setBestOfferEnabled={setBestOfferEnabled}
              minimumOffer={minimumOffer}
              setMinimumOffer={setMinimumOffer}
              currency={currency}
              setCurrency={setCurrency}
            />
          </TabsContent>
          
          <TabsContent value="both" className="space-y-4 mt-4">
            <CombinedListingSettings 
              startingBid={startingBid}
              setStartingBid={setStartingBid}
              reservePrice={reservePrice}
              setReservePrice={setReservePrice}
              auctionDuration={auctionDuration}
              setAuctionDuration={setAuctionDuration}
              fixedPrice={fixedPrice}
              setFixedPrice={setFixedPrice}
              currency={currency}
              setCurrency={setCurrency}
              bestOfferEnabled={bestOfferEnabled}
              setBestOfferEnabled={setBestOfferEnabled}
              minimumOffer={minimumOffer}
              setMinimumOffer={setMinimumOffer}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface AuctionSettingsProps {
  startingBid: number;
  setStartingBid: (bid: number) => void;
  reservePrice: number;
  setReservePrice: (price: number) => void;
  auctionDuration: string;
  setAuctionDuration: (duration: string) => void;
}

const AuctionSettings: React.FC<AuctionSettingsProps> = ({
  startingBid,
  setStartingBid,
  reservePrice,
  setReservePrice,
  auctionDuration,
  setAuctionDuration,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="starting-bid">
            {renderLabel("Starting Bid", true)}
          </Label>
          <Input 
            id="starting-bid" 
            type="number" 
            value={startingBid}
            onChange={(e) => setStartingBid(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="reserve-price">Reserve Price</Label>
            <span className="text-xs text-muted-foreground">Optional</span>
          </div>
          <Input 
            id="reserve-price" 
            type="number" 
            value={reservePrice}
            onChange={(e) => setReservePrice(Number(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            A reserve price is the minimum amount you're willing to sell for. If bidding doesn't reach this price, you aren't obligated to sell.
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="auction-duration">
          {renderLabel("Auction Duration", true)}
        </Label>
        <Select defaultValue={auctionDuration} onValueChange={setAuctionDuration}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 days</SelectItem>
            <SelectItem value="5">5 days</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

interface FixedPriceSettingsProps {
  fixedPrice: number;
  setFixedPrice: (price: number) => void;
  bestOfferEnabled: boolean;
  setBestOfferEnabled: (enabled: boolean) => void;
  minimumOffer: number;
  setMinimumOffer: (offer: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

const FixedPriceSettings: React.FC<FixedPriceSettingsProps> = ({
  fixedPrice,
  setFixedPrice,
  bestOfferEnabled,
  setBestOfferEnabled,
  minimumOffer,
  setMinimumOffer,
  currency,
  setCurrency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="currency-fixed">
          {renderLabel("Currency", true)}
        </Label>
        <Input 
          id="currency-fixed" 
          type="text" 
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fixed-price">
          {renderLabel("Price", true)}
        </Label>
        <Input 
          id="fixed-price" 
          type="number" 
          value={fixedPrice}
          onChange={(e) => setFixedPrice(Number(e.target.value))}
        />
      </div>
      
      <div className="col-span-2 space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="best-offer-fixed" 
            checked={bestOfferEnabled}
            onCheckedChange={setBestOfferEnabled}
          />
          <Label htmlFor="best-offer-fixed">Accept Best Offers</Label>
        </div>
        
        {bestOfferEnabled && (
          <div className="space-y-2">
            <Label htmlFor="min-offer-fixed">
              {renderLabel("Minimum Acceptable Offer", true)}
            </Label>
            <Input 
              id="min-offer-fixed" 
              type="number" 
              value={minimumOffer}
              onChange={(e) => setMinimumOffer(Number(e.target.value))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface CombinedListingSettingsProps {
  startingBid: number;
  setStartingBid: (bid: number) => void;
  reservePrice: number;
  setReservePrice: (price: number) => void;
  auctionDuration: string;
  setAuctionDuration: (duration: string) => void;
  fixedPrice: number;
  setFixedPrice: (price: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  bestOfferEnabled: boolean;
  setBestOfferEnabled: (enabled: boolean) => void;
  minimumOffer: number;
  setMinimumOffer: (offer: number) => void;
}

const CombinedListingSettings: React.FC<CombinedListingSettingsProps> = ({
  startingBid,
  setStartingBid,
  reservePrice,
  setReservePrice,
  auctionDuration,
  setAuctionDuration,
  fixedPrice,
  setFixedPrice,
  currency,
  setCurrency,
  bestOfferEnabled,
  setBestOfferEnabled,
  minimumOffer,
  setMinimumOffer,
}) => {
  return (
    <>
      <Alert className="bg-amber-50 border-amber-200 mb-4">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle>Combined Listing</AlertTitle>
        <AlertDescription>
          You're setting up both auction and fixed price options. Buyers can either bid in the auction or purchase immediately at your fixed price.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-2">
          <Label htmlFor="starting-bid-combo">
            {renderLabel("Starting Bid", true)}
          </Label>
          <Input 
            id="starting-bid-combo" 
            type="number" 
            value={startingBid}
            onChange={(e) => setStartingBid(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buy-now-price">
            {renderLabel("Buy It Now Price", true)}
          </Label>
          <Input 
            id="buy-now-price" 
            type="number" 
            value={fixedPrice}
            onChange={(e) => setFixedPrice(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="currency-combo">
            {renderLabel("Currency", true)}
          </Label>
          <Input 
            id="currency-combo" 
            type="text" 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="reserve-price-combo">Reserve Price</Label>
            <span className="text-xs text-muted-foreground">Optional</span>
          </div>
          <Input 
            id="reserve-price-combo" 
            type="number" 
            value={reservePrice}
            onChange={(e) => setReservePrice(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="auction-duration-combo">
            {renderLabel("Auction Duration", true)}
          </Label>
          <Select defaultValue={auctionDuration} onValueChange={setAuctionDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 days</SelectItem>
              <SelectItem value="5">5 days</SelectItem>
              <SelectItem value="7">7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4 mt-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="best-offer-combo" 
            checked={bestOfferEnabled}
            onCheckedChange={setBestOfferEnabled}
          />
          <Label htmlFor="best-offer-combo">Accept Best Offers</Label>
        </div>
        
        {bestOfferEnabled && (
          <div className="space-y-2">
            <Label htmlFor="min-offer-combo">
              {renderLabel("Minimum Acceptable Offer", true)}
            </Label>
            <Input 
              id="min-offer-combo" 
              type="number" 
              value={minimumOffer}
              onChange={(e) => setMinimumOffer(Number(e.target.value))}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ListingOptionsForm;