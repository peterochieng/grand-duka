import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
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
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | undefined>(undefined);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImageFiles(filesArray);
      setImagePreviews(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const { categories, loading: categoriesLoading } = useCategories();
  const { subcategories, loading: subcategoriesLoading } = useSubcategories(selectedCategoryId);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const { templates: activeTemplates, loading: templatesLoading } = useActiveTemplates(selectedSubcategoryId);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(existingProduct || null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showTemplateManager, setShowTemplateManager] = useState<boolean>(false);
  const [templateFieldValues, setTemplateFieldValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedTemplate && selectedTemplate.fields) {
      const initialValues: Record<string, any> = {};
      selectedTemplate.fields.forEach((field: any) => {
        initialValues[field.label] = '';
      });
      setTemplateFieldValues(initialValues);
    } else {
      setTemplateFieldValues({});
    }
  }, [selectedTemplate]);

  const [basicInfo, setBasicInfo] = useState({
    title: existingProduct?.title || '',
    description: existingProduct?.description || '',
    price: existingProduct ? String(existingProduct.price.parsedValue) : '',
    condition: existingProduct?.condition || 'new',
    location: existingProduct?.location || '',
    currency: existingProduct?.currency || 'USD',
    subcategory: ''
  });

  const [listingType, setListingType] = useState<string>('fixed');
  const [auctionEnabled, setAuctionEnabled] = useState<boolean>(false);
  const [startingBid, setStartingBid] = useState<number>(0);
  const [reservePrice, setReservePrice] = useState<number>(0);
  const [auctionDuration, setAuctionDuration] = useState<string>('7');
  const [fixedPriceEnabled, setFixedPriceEnabled] = useState<boolean>(false);
  const [fixedPrice, setFixedPrice] = useState<number>(0);
  const [bestOfferEnabled, setBestOfferEnabled] = useState<boolean>(false);
  const [minimumOffer, setMinimumOffer] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setSelectedTemplateId(template.id);
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

  const selectedCategoryObject = categories.find((cat: any) => cat.id === selectedCategoryId);
  const selectedSubcategoryObject = subcategories.find((sc: any) => sc.id === selectedSubcategoryId);
  const isUnderReview =
    selectedCategoryObject?.restricted ||
    selectedCategoryObject?.requires_review ||
    selectedSubcategoryObject?.restricted;

  // Handler to update a dynamic template field value
  const handleTemplateFieldChange = (label: string, value: string) => {
    setTemplateFieldValues(prev => ({
      ...prev,
      [label]: value
    }));
  };

  const resetForm = () => {
    // Clear all form state to defaults
    setBasicInfo({
      title: '',
      description: '',
      price: '',
      condition: 'new',
      location: '',
      currency: 'USD',
      subcategory: ''
    });
    setSelectedCategoryId(undefined);
    setSelectedSubcategoryId(undefined);
    setSelectedTemplate(null);
    setSelectedTemplateId(null);
    setTemplateFieldValues({});
    setImageFiles([]);
    setImagePreviews([]);
    setListingType('fixed');
    setAuctionEnabled(false);
    setStartingBid(0);
    setReservePrice(0);
    setAuctionDuration('7');
    setFixedPriceEnabled(false);
    setFixedPrice(0);
    setBestOfferEnabled(false);
    setMinimumOffer(0);
  };

  // Modified submit handler to update when editing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitType = (e.nativeEvent as any).submitter.name; // "redirect" or "addAnother"
    if (!basicInfo.title || !basicInfo.price) {
      toast({ title: "Validation Error", description: "Please fill out the required fields." });
      return;
    }
    if (!user || !user.id) {
      toast({ title: "Authentication Error", description: "User not authenticated." });
      return;
    }

    setSubmitting(true);
    const approvalStatus = isUnderReview ? "pending_review" : "pending";

    const listingTypes = {
      auction: { enabled: auctionEnabled, startingBid, reservePrice },
      buyItNow: { enabled: fixedPriceEnabled, price: fixedPrice },
      bestOffer: { enabled: bestOfferEnabled, minOffer: minimumOffer }
    };

    const newListing: any = {
      title: basicInfo.title,
      description: basicInfo.description,
      price: Number(basicInfo.price),
      currency: basicInfo.currency,
      seller_id: user.id,
      condition: basicInfo.condition,
      location: basicInfo.location,
      category: selectedCategoryId || "",
      subcategory: selectedSubcategoryId || basicInfo.subcategory || "",
      tags: selectedProduct?.tags || [],
      shipping: selectedProduct?.shipping || 0,
      featured: selectedProduct?.featured || false,
      approval_status: approvalStatus,
      updated_at: new Date(),
      listingtypes: listingTypes,
      template: selectedTemplate
        ? { id: selectedTemplate.id, name: selectedTemplate.name, type: selectedTemplate.type }
        : null,
      template_fields: templateFieldValues
    };

    // If new images were added, upload them
    if (imageFiles.length > 0) {
      const imageUrls: string[] = [];
      for (const imageFile of imageFiles) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${imageFile.name}`;
        const filePath = `products/${user.id}/${fileName}`;

        const { error: uploadError } = await supabase
          .storage
          .from('product-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          toast({ title: "Image Upload Error", description: "Failed to upload one or more images." });
          setSubmitting(false);
          return;
        }

        const { publicURL } = supabase
          .storage
          .from('product-images')
          .getPublicUrl(filePath);
        if (publicURL) {
          imageUrls.push(publicURL);
        }
      }
      newListing.images = imageUrls;
      if (!newListing.image && imageUrls.length > 0) {
        newListing.image = imageUrls[0];
      }
    }

    let result;
    if (existingProduct) {
      // Update existing product record
      result = await supabase
        .from("products")
        .update(newListing)
        .eq("id", existingProduct.id);
    } else {
      // Insert new record
      result = await supabase
        .from("products")
        .insert([newListing]);
    }

    setSubmitting(false);
    if (result.error) {
      console.error("Error submitting listing:", result.error);
      toast({ title: "Submission Error", description: "Failed to save listing." });
    } else {
      toast({ title: "Success", description: existingProduct ? "Listing updated successfully!" : "Listing created successfully!" });
      console.log("Listing response:", result.data);
      if (submitType === "redirect") {
        navigate("/retail/seller-inventory");
      } else if (submitType === "addAnother") {
        resetForm();
      }
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

        {/* Restricted Notice */}
        {isUnderReview && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md mb-4">
            <p className="text-sm text-blue-800">
              Note: This category/subcategory is restricted. Your listing will be subject to admin review before it goes live.
            </p>
          </div>
        )}

        {/* New Product Image Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Image Preview */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative border rounded overflow-hidden">
                <img src={src} alt={`Preview ${i + 1}`} className="w-full h-24 object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Basic Information Form */}
        <BasicInformationForm 
          selectedProduct={selectedProduct} 
          presetCategory={
            selectedCategoryId 
              ? categories.find((cat: any) => cat.id === selectedCategoryId)?.name || ''
              : ''
          }
          onBasicInfoChange={handleBasicInfoChange}
        />

        {/* Template Selection */}
        {selectedSubcategoryId && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Template</label>
            {templatesLoading ? (
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
            ) : activeTemplates && activeTemplates.length > 0 ? (
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
                <option value="">
                  -- Choose a template tailored to this subcategory --
                </option>
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

        {/* Template Banner */}
        {selectedTemplate && (
          <div className="mb-4">
            <ListingTemplateBanner template={selectedTemplate} />
          </div>
        )}

        {/* Dynamic Template Fields */}
        {selectedTemplate && selectedTemplate.fields && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Template Fields </label>
            {selectedTemplate.fields.map((field: any, index: number) => (
              <div key={index} className="mb-2">
                <label className="block text-xs font-medium mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={templateFieldValues[field.label] || ''}
                  onChange={(e) => handleTemplateFieldChange(field.label, e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            ))}
          </div>
        )}

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
          <Button type="button" variant="outline" disabled={submitting}>
            Save as Draft
          </Button>
          <Button type="submit" name="redirect" disabled={submitting}>
            {isRelisting ? 'Relist Item' : (submitting ? 'Submitting...' : 'Create Listing')}
          </Button>
          <Button type="submit" name="addAnother" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Create & Add Another'}
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