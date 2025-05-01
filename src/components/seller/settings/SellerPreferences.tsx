
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { 
  CreditCard, 
  DollarSign, 
  Truck, 
  Package, 
  CircleDollarSign,
  Banknote,
  CreditCardIcon,
  Building2,
  PackageCheck,
  TimerReset
} from 'lucide-react';

export const SellerPreferences = () => {
  // Payment methods state
  const [acceptCreditCards, setAcceptCreditCards] = useState(true);
  const [acceptBankTransfer, setAcceptBankTransfer] = useState(true);
  const [acceptCashOnDelivery, setAcceptCashOnDelivery] = useState(false);
  const [acceptDigitalWallets, setAcceptDigitalWallets] = useState(true);
  const [acceptCryptocurrency, setAcceptCryptocurrency] = useState(false);

  // Logistics preferences state
  const [offerLocalPickup, setOfferLocalPickup] = useState(true);
  const [offerLocalDelivery, setOfferLocalDelivery] = useState(true);
  const [offerShipping, setOfferShipping] = useState(true);
  const [offerExpressShipping, setOfferExpressShipping] = useState(false);
  const [localDeliveryRadius, setLocalDeliveryRadius] = useState(10);
  const [localDeliveryFee, setLocalDeliveryFee] = useState(5);
  const [shippingFlatRate, setShippingFlatRate] = useState(8.99);
  const [expressShippingFlatRate, setExpressShippingFlatRate] = useState(14.99);
  const [processingTime, setProcessingTime] = useState('1-2');

  // Default preferences for new listings
  const [autoApplyPreferences, setAutoApplyPreferences] = useState(true);

  const handleSavePaymentMethods = () => {
    // Here you would save the payment methods to the database
    toast.success('Payment methods updated successfully');
  };

  const handleSaveLogistics = () => {
    // Here you would save the logistics preferences to the database
    toast.success('Logistics preferences updated successfully');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="logistics">
        <TabsList>
          <TabsTrigger value="logistics">
            <Truck className="h-4 w-4 mr-2" />
            Logistics Preferences
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logistics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Logistics Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <h3 className="text-lg font-semibold">Delivery Options</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose which delivery methods you want to offer to buyers
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-primary" />
                      <Label htmlFor="local-pickup">Local Pickup</Label>
                    </div>
                    <Switch
                      id="local-pickup"
                      checked={offerLocalPickup}
                      onCheckedChange={setOfferLocalPickup}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <Label htmlFor="local-delivery">Local Delivery</Label>
                    </div>
                    <Switch
                      id="local-delivery"
                      checked={offerLocalDelivery}
                      onCheckedChange={setOfferLocalDelivery}
                    />
                  </div>

                  {offerLocalDelivery && (
                    <div className="ml-6 border-l-2 pl-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                          <Input
                            id="delivery-radius"
                            type="number"
                            value={localDeliveryRadius}
                            onChange={(e) => setLocalDeliveryRadius(Number(e.target.value))}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="delivery-fee">Delivery Fee ($)</Label>
                          <Input
                            id="delivery-fee"
                            type="number"
                            step="0.01"
                            value={localDeliveryFee}
                            onChange={(e) => setLocalDeliveryFee(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PackageCheck className="h-4 w-4 text-primary" />
                      <Label htmlFor="shipping">Standard Shipping</Label>
                    </div>
                    <Switch
                      id="shipping"
                      checked={offerShipping}
                      onCheckedChange={setOfferShipping}
                    />
                  </div>

                  {offerShipping && (
                    <div className="ml-6 border-l-2 pl-4 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="shipping-rate">Standard Shipping Flat Rate ($)</Label>
                        <Input
                          id="shipping-rate"
                          type="number"
                          step="0.01"
                          value={shippingFlatRate}
                          onChange={(e) => setShippingFlatRate(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TimerReset className="h-4 w-4 text-primary" />
                      <Label htmlFor="express-shipping">Express Shipping</Label>
                    </div>
                    <Switch
                      id="express-shipping"
                      checked={offerExpressShipping}
                      onCheckedChange={setOfferExpressShipping}
                    />
                  </div>

                  {offerExpressShipping && (
                    <div className="ml-6 border-l-2 pl-4 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="express-shipping-rate">Express Shipping Flat Rate ($)</Label>
                        <Input
                          id="express-shipping-rate"
                          type="number"
                          step="0.01"
                          value={expressShippingFlatRate}
                          onChange={(e) => setExpressShippingFlatRate(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-lg font-semibold">Processing Time</h3>
                    <p className="text-sm text-muted-foreground">
                      How long it typically takes you to prepare an item for shipping after receiving an order
                    </p>
                  </div>

                  <Select value={processingTime} onValueChange={setProcessingTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select processing time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="1">1 Business Day</SelectItem>
                      <SelectItem value="1-2">1-2 Business Days</SelectItem>
                      <SelectItem value="2-3">2-3 Business Days</SelectItem>
                      <SelectItem value="3-5">3-5 Business Days</SelectItem>
                      <SelectItem value="1-2-weeks">1-2 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="auto-apply" 
                    checked={autoApplyPreferences} 
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        setAutoApplyPreferences(checked);
                      }
                    }}
                  />
                  <label
                    htmlFor="auto-apply"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Automatically apply these preferences to new listings
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveLogistics}>Save Logistics Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <h3 className="text-lg font-semibold">Accepted Payment Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose which payment methods you accept from buyers
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCardIcon className="h-4 w-4 text-primary" />
                      <Label htmlFor="credit-cards">Credit/Debit Cards</Label>
                    </div>
                    <Switch
                      id="credit-cards"
                      checked={acceptCreditCards}
                      onCheckedChange={setAcceptCreditCards}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <Label htmlFor="bank-transfer">Bank Transfer</Label>
                    </div>
                    <Switch
                      id="bank-transfer"
                      checked={acceptBankTransfer}
                      onCheckedChange={setAcceptBankTransfer}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Banknote className="h-4 w-4 text-primary" />
                      <Label htmlFor="cash-delivery">Cash on Delivery</Label>
                    </div>
                    <Switch
                      id="cash-delivery"
                      checked={acceptCashOnDelivery}
                      onCheckedChange={setAcceptCashOnDelivery}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <Label htmlFor="digital-wallets">Digital Wallets (PayPal, Apple Pay, etc.)</Label>
                    </div>
                    <Switch
                      id="digital-wallets"
                      checked={acceptDigitalWallets}
                      onCheckedChange={setAcceptDigitalWallets}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CircleDollarSign className="h-4 w-4 text-primary" />
                      <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
                    </div>
                    <Switch
                      id="cryptocurrency"
                      checked={acceptCryptocurrency}
                      onCheckedChange={setAcceptCryptocurrency}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="auto-apply-payment" 
                    checked={autoApplyPreferences} 
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        setAutoApplyPreferences(checked);
                      }
                    }}
                  />
                  <label
                    htmlFor="auto-apply-payment"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Automatically apply these preferences to new listings
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSavePaymentMethods}>Save Payment Methods</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerPreferences;
