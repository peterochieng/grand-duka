
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Product, Template } from '@/lib/types';
import BasicInformationForm from '@/components/shop/listing/BasicInformationForm';
import ListingOptionsForm from '@/components/shop/listing/ListingOptionsForm';
import ListingHeader from '@/components/shop/listing/ListingHeader';
import ListingImportModal from '@/components/shop/listing/ListingImportModal';
import TemplateManager from '@/components/shop/TemplateManager';
import ListingTemplateBanner from '@/components/shop/listing/ListingTemplateBanner';

interface CreateListingProps {
  existingProduct?: Product;
  isRelisting?: boolean;
}

const CreateListing = ({ existingProduct, isRelisting }: CreateListingProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(existingProduct || null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showTemplateManager, setShowTemplateManager] = useState<boolean>(false);
  
  // Listing type states
  const [listingType, setListingType] = useState<string>(existingProduct?.listingTypes?.auction?.enabled ? 'auction' : 'fixed');
  
  // Auction settings
  const [auctionEnabled, setAuctionEnabled] = useState<boolean>(!!existingProduct?.listingTypes?.auction?.enabled);
  const [startingBid, setStartingBid] = useState<number>(existingProduct?.listingTypes?.auction?.startingBid || 0);
  const [reservePrice, setReservePrice] = useState<number>(existingProduct?.listingTypes?.auction?.reservePrice || 0);
  const [auctionDuration, setAuctionDuration] = useState<string>("7");
  
  // Fixed price settings
  const [fixedPriceEnabled, setFixedPriceEnabled] = useState<boolean>(!!existingProduct?.listingTypes?.buyItNow?.enabled);
  const [fixedPrice, setFixedPrice] = useState<number>(existingProduct?.listingTypes?.buyItNow?.price || 0);
  
  // Best offer settings
  const [bestOfferEnabled, setBestOfferEnabled] = useState<boolean>(!!existingProduct?.listingTypes?.bestOffer?.enabled);
  const [minimumOffer, setMinimumOffer] = useState<number>(existingProduct?.listingTypes?.bestOffer?.minOffer || 0);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setShowTemplateManager(false);
  };
  
  const handleExistingProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setListingType(product.listingTypes?.auction?.enabled ? 'auction' : 'fixed');
    setAuctionEnabled(!!product.listingTypes?.auction?.enabled);
    setStartingBid(product.listingTypes?.auction?.startingBid || 0);
    setReservePrice(product.listingTypes?.auction?.reservePrice || 0);
    setFixedPriceEnabled(!!product.listingTypes?.buyItNow?.enabled);
    setFixedPrice(product.listingTypes?.buyItNow?.price || 0);
    setBestOfferEnabled(!!product.listingTypes?.bestOffer?.enabled);
    setMinimumOffer(product.listingTypes?.bestOffer?.minOffer || 0);
    setShowImportModal(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newListing = {
      ...selectedProduct,
      listingTypes: {
        auction: {
          enabled: auctionEnabled,
          startingBid: startingBid,
          reservePrice: reservePrice,
          timeLeft: auctionDuration === '3' ? '3d 0h' : auctionDuration === '5' ? '5d 0h' : '7d 0h',
        },
        buyItNow: {
          enabled: fixedPriceEnabled,
          price: fixedPrice,
        },
        bestOffer: {
          enabled: bestOfferEnabled,
          minOffer: minimumOffer,
        }
      },
      relisted: isRelisting ? true : false,
    };
    
    console.log('New listing created:', newListing);
    
    toast.success('Listing created successfully!');
  };
  
  const showListingForm = !showTemplateManager && !showImportModal;
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <ListingHeader 
        isRelisting={isRelisting} 
        selectedProduct={selectedProduct}
        setShowImportModal={setShowImportModal}
        setShowTemplateManager={setShowTemplateManager}
      />
      
      {isRelisting && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Relisting previous auction</AlertTitle>
          <AlertDescription>
            You're creating a new listing based on your previous auction that ended without meeting the reserve price or receiving bids.
          </AlertDescription>
        </Alert>
      )}
      
      {selectedTemplate && (
        <ListingTemplateBanner template={selectedTemplate} />
      )}
      
      {showTemplateManager ? (
        <Card>
          <TemplateManager onSelectTemplate={handleTemplateSelect} />
        </Card>
      ) : showImportModal ? (
        <ListingImportModal 
          onSelectProduct={handleExistingProductSelect} 
          onCancel={() => setShowImportModal(false)} 
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInformationForm selectedProduct={selectedProduct} />
          
          <ListingOptionsForm 
            listingType={listingType}
            setListingType={setListingType}
            startingBid={startingBid}
            setStartingBid={setStartingBid}
            reservePrice={reservePrice}
            setReservePrice={setReservePrice}
            auctionDuration={auctionDuration}
            setAuctionDuration={setAuctionDuration}
            fixedPrice={fixedPrice}
            setFixedPrice={setFixedPrice}
            bestOfferEnabled={bestOfferEnabled}
            setBestOfferEnabled={setBestOfferEnabled}
            minimumOffer={minimumOffer}
            setMinimumOffer={setMinimumOffer}
          />
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              {isRelisting ? 'Relist Item' : 'Create Listing'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateListing;
