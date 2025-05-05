import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ListingHeader from '@/components/shop/listing/ListingHeader';
import ListingImportModal from '@/components/shop/listing/ListingImportModal';
import TemplateManager from '@/components/shop/TemplateManager';
import ListingTemplateBanner from '@/components/shop/listing/ListingTemplateBanner';
import BasicInformationForm from '@/components/shop/listing/BasicInformationForm';
import ListingOptionsForm from '@/components/shop/listing/ListingOptionsForm';
import { useCategories } from '@/hooks/useCategories';
import { useSubcategories } from '@/hooks/useSubcategories';
import { useActiveTemplates } from '@/hooks/auth/useActiveTemplates';
import { supabase } from '@/integrations/supabase/client';
import { Product, Template } from '@/lib/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface CreateListingProps {
  existingProduct?: Product;
  isRelisting?: boolean;
}

const CreateListing = ({ existingProduct, isRelisting }: CreateListingProps) => {
  // Get current user for a real seller id
  const { user } = useCurrentUser();
  
  // State for category and subcategory selection
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | undefined>(undefined);

  // Fetch categories (only published ones)
  const { categories, loading: categoriesLoading } = useCategories();

  // Fetch subcategories based on selected category
  const { subcategories, loading: subcategoriesLoading } = useSubcategories(selectedCategoryId);

  // Template & product selection states
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const { templates: activeTemplates, loading: templatesLoading } = useActiveTemplates(selectedSubcategoryId);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(existingProduct || null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showTemplateManager, setShowTemplateManager] = useState<boolean>(false);

  // Basic info state from BasicInformationForm – initialize with empty values
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'new',
    location: '',
    currency: 'USD',
    subcategory: ''
  });

  // Dummy state for listing options
  const [listingType, setListingType] = useState<string>('fixed');
  const [auctionEnabled, setAuctionEnabled] = useState<boolean>(false);
  const [startingBid, setStartingBid] = useState<number>(0);
  const [reservePrice, setReservePrice] = useState<number>(0);
  const [auctionDuration, setAuctionDuration] = useState<string>('7');
  const [fixedPriceEnabled, setFixedPriceEnabled] = useState<boolean>(false);
  const [fixedPrice, setFixedPrice] = useState<number>(0);
  const [bestOfferEnabled, setBestOfferEnabled] = useState<boolean>(false);
  const [minimumOffer, setMinimumOffer] = useState<number>(0);

  const navigate = useNavigate();

  // Handle template selection from Template Manager pop-up
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setSelectedTemplateId(template.id);
    setShowTemplateManager(false);
  };

  // Handler for selecting an existing product via Import Modal
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

  // Handler to get basic info changes from BasicInformationForm
  const handleBasicInfoChange = (info: {
    title: string;
    description: string;
    price: string;
    condition: string;
    location: string;
    currency: string;
    subcategory: string;
  }) => {
    setBasicInfo(info);
  };

  // Submit handler – builds new listing with allowed columns
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast.error('User not authenticated.');
      return;
    }

    const newListing = {
      title: basicInfo.title,
      description: basicInfo.description,
      price: Number(basicInfo.price),
      currency: basicInfo.currency,
      seller_id: user.id,
      condition: basicInfo.condition,
      location: basicInfo.location,
      // Category and subcategory come from the outer selectors.
      category: selectedCategoryId || "",
      subcategory: selectedSubcategoryId || basicInfo.subcategory || "",
      tags: selectedProduct?.tags || [],
      shipping: selectedProduct?.shipping || 0,
      featured: selectedProduct?.featured || false,
      approval_status: "pending",
      created_at: new Date(),
      updated_at: new Date()
    };

    const { data, error } = await supabase
      .from('products')
      .insert([newListing]);

    if (error) {
      console.error('Error inserting listing:', error);
      toast.error('Failed to create listing');
    } else {
      toast.success('Listing created successfully!');
      console.log('New listing created:', data);
      navigate('/retail/seller-dashboard/inventory');
    }
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

      {/* Category & Subcategory selection */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Category</label>
          {categoriesLoading ? (
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
          ) : (
            <select
              value={selectedCategoryId || ''}
              onChange={(e) => {
                const catId = e.target.value || undefined;
                setSelectedCategoryId(catId);
                // Reset subcategory and template when category changes
                setSelectedSubcategoryId(undefined);
                setSelectedTemplate(null);
                setSelectedTemplateId(null);
              }}
              className="border rounded p-2 w-full"
            >
              <option value="">-- Select a category --</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Subcategory Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Subcategory</label>
          {subcategoriesLoading ? (
            <div className="h-10 bg-gray-200 animate-pulse rounded" />
          ) : (
            <select
              value={selectedSubcategoryId || ''}
              onChange={(e) => {
                setSelectedSubcategoryId(e.target.value || undefined);
                // Reset template selection when subcategory changes
                setSelectedTemplate(null);
                setSelectedTemplateId(null);
              }}
              className="border rounded p-2 w-full"
            >
              <option value="">-- Select a subcategory --</option>
              {subcategories.map((sc: any) => (
                <option key={sc.id} value={sc.id}>
                  {sc.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Template Selection */}
        {selectedSubcategoryId && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Template</label>
            {templatesLoading ? (
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
            ) : activeTemplates.length > 0 ? (
              <select
                value={selectedTemplateId || ''}
                onChange={(e) => {
                  const templateId = e.target.value;
                  setSelectedTemplateId(templateId);
                  const found = activeTemplates.find((t: any) => t.id === templateId);
                  setSelectedTemplate(found || null);
                }}
                className="border rounded p-2 w-full"
              >
                <option value="">-- Choose a template --</option>
                {activeTemplates.map((template: any) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-muted-foreground">
                No active templates available for this subcategory.
              </p>
            )}
          </div>
        )}

        {/* If a template is selected, display its banner */}
        {selectedTemplate && (
          <div className="mb-4">
            <ListingTemplateBanner template={selectedTemplate} />
          </div>
        )}

        {/* Pass the outer selected category (as its name) into BasicInformationForm */}
        <BasicInformationForm 
          selectedProduct={selectedProduct} 
          presetCategory={
            selectedCategoryId 
              ? categories.find((cat: any) => cat.id === selectedCategoryId)?.name || ''
              : ''
          }
          onBasicInfoChange={handleBasicInfoChange}
        />

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

      {showTemplateManager && (
        <Card>
          <TemplateManager onSelectTemplate={handleTemplateSelect} />
        </Card>
      )}
      {showImportModal && (
        <ListingImportModal 
          onSelectProduct={handleExistingProductSelect} 
          onCancel={() => setShowImportModal(false)} 
        />
      )}
    </div>
  );
};

export default CreateListing;