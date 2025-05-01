import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Product, Template } from "@/lib/types";
import { AlertCircle, Clock } from "lucide-react";
import TemplateManager from './TemplateManager';
import ListingImportModal from './listing/ListingImportModal';
import BasicInformationForm from './listing/BasicInformationForm';
import ListingOptionsForm from './listing/ListingOptionsForm';
import ListingHeader from './listing/ListingHeader';
import ListingTemplateBanner from './listing/ListingTemplateBanner';

interface CreateListingProps {
  existingProduct?: Product;
  isRelisting?: boolean;
}

const CreateListing: React.FC<CreateListingProps> = ({ existingProduct, isRelisting }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(existingProduct || null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [listingType, setListingType] = useState<string>(existingProduct?.listingTypes?.auction?.enabled ? 'auction' : 'fixed');
  
  const [auctionEnabled, setAuctionEnabled] = useState<boolean>(!!existingProduct?.listingTypes?.auction?.enabled);
  const [startingBid, setStartingBid] = useState<number>(existingProduct?.listingTypes?.auction?.startingBid || 0);
  const [reservePrice, setReservePrice] = useState<number>(existingProduct?.listingTypes?.auction?.reservePrice || 0);
  const [auctionDuration, setAuctionDuration] = useState<string>("7");
  
  const [fixedPriceEnabled, setFixedPriceEnabled] = useState<boolean>(!!existingProduct?.listingTypes?.buyItNow?.enabled);
  const [fixedPrice, setFixedPrice] = useState<number>(existingProduct?.listingTypes?.buyItNow?.price || 0);
  
  const [bestOfferEnabled, setBestOfferEnabled] = useState<boolean>(!!existingProduct?.listingTypes?.bestOffer?.enabled);
  const [minimumOffer, setMinimumOffer] = useState<number>(existingProduct?.listingTypes?.bestOffer?.minOffer || 0);
  
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showTemplateManager, setShowTemplateManager] = useState<boolean>(false);
  
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
    
    alert('Listing created successfully!');
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
          <Clock className="h-4 w-4" />
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
