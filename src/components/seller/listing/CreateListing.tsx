import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ListingHeader from "@/components/shop/listing/ListingHeader";
import ListingImportModal from "@/components/shop/listing/ListingImportModal";
import TemplateManager from "@/components/shop/TemplateManager";
import ListingTemplateBanner from "@/components/shop/listing/ListingTemplateBanner";
import BasicInformationForm from "@/components/shop/listing/BasicInformationForm";
import ListingOptionsForm from "@/components/shop/listing/ListingOptionsForm";
import { useCategories } from "@/hooks/useCategories";
import { useSubcategories } from "@/hooks/useSubcategories";
import { useActiveTemplates } from "@/hooks/auth/useActiveTemplates";
import { supabase } from "@/integrations/supabase/client";
import { Product, Template } from "@/lib/types";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useBasicInfoTemplate } from "@/services/useBasicInfoTemplate";

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

  const { categories, loading: categoriesLoading } = useCategories();
  const { subcategories, loading: subcategoriesLoading } = useSubcategories(selectedCategoryId);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const { templates: activeTemplates, loading: templatesLoading } = useActiveTemplates(selectedSubcategoryId);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(existingProduct || null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showTemplateManager, setShowTemplateManager] = useState<boolean>(false);
  const [templateFieldValues, setTemplateFieldValues] = useState<Record<string, any>>({});

  console.log(selectedTemplate);

  // Basic Information state – now controlled.
  const [basicInfo, setBasicInfo] = useState({
    title: existingProduct?.title || "",
    description: existingProduct?.description || "",
    condition: existingProduct?.condition || "new",
    location: existingProduct?.location || "",
    subcategory: "",
  });

  // Listing Options states.
  const [listingType, setListingType] = useState<string>("fixed");
  const [auctionEnabled, setAuctionEnabled] = useState<boolean>(false);
  const [startingBid, setStartingBid] = useState<number>(0);
  const [reservePrice, setReservePrice] = useState<number>(0);
  const [auctionDuration, setAuctionDuration] = useState<string>("7");
  const [fixedPriceEnabled, setFixedPriceEnabled] = useState<boolean>(false);
  const [fixedPrice, setFixedPrice] = useState<number>(0);
  const [bestOfferEnabled, setBestOfferEnabled] = useState<boolean>(false);
  const [minimumOffer, setMinimumOffer] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("USD");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Update a single basic info field.
  const handleBasicInfoChange = (fieldKey: string, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setSelectedTemplateId(template.id);
    setShowTemplateManager(false);
  };

  const handleExistingProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setListingType(product.listingTypes?.auction?.enabled ? "auction" : "fixed");
    setAuctionEnabled(!!product.listingTypes?.auction?.enabled);
    setStartingBid(product.listingTypes?.auction?.startingBid || 0);
    setReservePrice(product.listingTypes?.auction?.reservePrice || 0);
    setFixedPriceEnabled(!!product.listingTypes?.buyItNow?.enabled);
    setFixedPrice(product.listingTypes?.buyItNow?.price || 0);
    setBestOfferEnabled(!!product.listingTypes?.bestOffer?.enabled);
    setMinimumOffer(product.listingTypes?.bestOffer?.minOffer || 0);
    setCurrency(product.currency || "USD");
    setShowImportModal(false);
  };

  const selectedCategoryObject = categories.find((cat: any) => cat.id === selectedCategoryId);
  const selectedSubcategoryObject = subcategories.find((sc: any) => sc.id === selectedSubcategoryId);

  // Determine if the listing is in a restricted category/subcategory.
  const isUnderReview =
    selectedCategoryObject?.restricted ||
    selectedCategoryObject?.requires_review ||
    selectedSubcategoryObject?.restricted;

  const handleTemplateFieldChange = (label: string, value: string) => {
    setTemplateFieldValues((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  // Handle file input for image upload.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const validFiles: File[] = [];
    const previews: string[] = [];
    for (const file of filesArray) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File Too Large", description: "Each image must be 5MB or less." });
        continue;
      }
      if (validFiles.length < 5) {
        validFiles.push(file);
        previews.push(URL.createObjectURL(file));
      } else {
        toast({ title: "Image Limit Exceeded", description: "You can upload up to 5 images." });
        break;
      }
    }
    // Revoke old URLs.
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImageFiles(validFiles);
    setImagePreviews(previews);
  };

  const resetForm = () => {
    setBasicInfo({
      title: "",
      description: "",
      condition: "new",
      location: "",
      subcategory: "",
    });
    setSelectedCategoryId(undefined);
    setSelectedSubcategoryId(undefined);
    setSelectedTemplate(null);
    setSelectedTemplateId(null);
    setTemplateFieldValues({});
    setImageFiles([]);
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviews([]);
    setListingType("fixed");
    setAuctionEnabled(false);
    setStartingBid(0);
    setReservePrice(0);
    setAuctionDuration("7");
    setFixedPriceEnabled(false);
    setFixedPrice(0);
    setBestOfferEnabled(false);
    setMinimumOffer(0);
    setCurrency("USD");
  };

  // Determine final price.
  const finalPrice = listingType === "auction" ? startingBid : fixedPrice;

  // Load basic info template from admin.
  const { basicInfoTemplate, loading: basicInfoLoading } = useBasicInfoTemplate(
    selectedCategoryId,
    selectedSubcategoryId
  );

  // Validate basic info fields.
  const validateBasicInfo = (): string[] => {
    const missing: string[] = [];
    if (basicInfoTemplate && basicInfoTemplate.length > 0) {
      basicInfoTemplate.forEach((field) => {
        const key = field.id || field.label;
        if (field.required && (!basicInfo[key] || basicInfo[key].trim() === "")) {
          missing.push(field.label);
        }
      });
    } else {
      if (!basicInfo.title || basicInfo.title.trim() === "") missing.push("Title");
      if (!basicInfo.description || basicInfo.description.trim() === "") missing.push("Description");
    }
    return missing;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitType = (e.nativeEvent as any).submitter.name;
    const missingFields = validateBasicInfo();
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `The following required fields are missing: ${missingFields.join(", ")}`
      });
      return;
    }
    if (!user || !user.id) {
      toast({ title: "Authentication Error", description: "User not authenticated." });
      return;
    }

    setSubmitting(true);
    // For listings in a restricted category/subcategory, force approval_status to "pending_review".
    const approvalStatus = isUnderReview ? "pending_review" : "pending";

    const listingTypes = {
      auction: { enabled: auctionEnabled, startingBid, reservePrice },
      buyItNow: { enabled: fixedPriceEnabled, price: fixedPrice },
      bestOffer: { enabled: bestOfferEnabled, minOffer: minimumOffer },
    };

    const newListing: any = {
      title: basicInfo.title,
      description: basicInfo.description,
      price: finalPrice,
      currency: currency,
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
      template_fields: templateFieldValues,
    };

    console.log(newListing);

    if (imageFiles.length > 0) {
      const imageUrls: string[] = [];
      for (const imageFile of imageFiles) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${imageFile.name}`;
        const filePath = `products/${user.id}/${fileName}`;

        const { error: uploadError } = await supabase
          .storage
          .from("product-images")
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          toast({ title: "Image Upload Error", description: "Failed to upload one or more images." });
          setSubmitting(false);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);
        if (publicUrl) {
          imageUrls.push(publicUrl);
        }
      }
      newListing.images = imageUrls;
      if (!newListing.image && imageUrls.length > 0) {
        newListing.image = imageUrls[0];
      }
    }

    let result;
    if (existingProduct) {
      result = await supabase.from("products").update(newListing).eq("id", existingProduct.id);
    } else {
      result = await supabase.from("products").insert([newListing]);
      console.log(result);
    }

    setSubmitting(false);
    if (result.error) {
      console.error("Error submitting listing:", result.error);
      toast({ title: "Submission Error", description: "Failed to save listing." });
    } else {
      toast({
        title: "Success",
        description: existingProduct ? "Listing updated successfully!" : "Listing created successfully!",
      });
      console.log("Listing response:", result.data);
      if (submitType === "redirect") {
        navigate("/retail/seller-inventory");
      } else if (submitType === "addAnother") {
        resetForm();
      }
    }
  };

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
              value={selectedCategoryId || ""}
              onChange={(e) => {
                const catId = e.target.value || undefined;
                setSelectedCategoryId(catId);
                setSelectedSubcategoryId(undefined);
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
              value={selectedSubcategoryId || ""}
              onChange={(e) => setSelectedSubcategoryId(e.target.value || undefined)}
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

        {/* File Input for Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Product Images (Max 5, 5MB each)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Image Preview Grid */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative border rounded overflow-hidden">
                <img src={src} alt={`Preview ${i + 1}`} className="w-full h-24 object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const updatedFiles = [...imageFiles];
                    const updatedPreviews = [...imagePreviews];
                    URL.revokeObjectURL(updatedPreviews[i]);
                    updatedFiles.splice(i, 1);
                    updatedPreviews.splice(i, 1);
                    setImageFiles(updatedFiles);
                    setImagePreviews(updatedPreviews);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Basic Information Section Header */}
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>

        {/* Basic Information Form */}
        <BasicInformationForm
          selectedProduct={selectedProduct}
          presetCategory={
            selectedCategoryId
              ? categories.find((cat: any) => cat.id === selectedCategoryId)?.name || ""
              : ""
          }
          basicInfo={basicInfo}
          onBasicInfoChange={handleBasicInfoChange}
          basicInfoTemplate={basicInfoTemplate}
        />

        {/* Notice for restricted categories/subcategories */}
        {isUnderReview && (
          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700 mb-4">
            Your listing is in a restricted category/subcategory and will be subject to admin review before publication.
          </div>
        )}

        {/* Template Selection */}
        {selectedSubcategoryId && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Template</label>
            {templatesLoading ? (
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
            ) : activeTemplates && activeTemplates.length > 0 ? (
              <select
                value={selectedTemplateId || ""}
                onChange={(e) => {
                  const templateId = e.target.value;
                  setSelectedTemplateId(templateId);
                  const found = activeTemplates.find((t: any) => t.id === templateId);
                  setSelectedTemplate(found || null);
                }}
                className="border rounded p-2 w-full"
              >
                <option value="">-- Choose a template tailored to this subcategory --</option>
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
            <label className="block text-sm font-medium mb-1">Template Fields</label>
            {/* Flex container with negative horizontal margin to align half-width items side by side */}
            <div className="flex flex-wrap -mx-2">
              {selectedTemplate.fields.map((field: any, index: number) => {
                const currentValue =
                  templateFieldValues[field.label] !== undefined
                    ? templateFieldValues[field.label]
                    : field.defaultValue || "";
                const fieldWidth = field.width ? field.width.toLowerCase() : "full";
                let inputWidthClass = "";
                let inputElement = null;

                if (fieldWidth === "half" || fieldWidth === "full") {
                  inputWidthClass = fieldWidth === "half" ? "w-1/2" : "w-full";
                  if (field.type === "dropdown" && field.options) {
                    inputElement = (
                      <select
                        value={currentValue}
                        onChange={(e) => handleTemplateFieldChange(field.label, e.target.value)}
                        className="border rounded p-2 w-full"
                      >
                        <option value="">-- Select --</option>
                        {field.options.split(",").map((option: string) => (
                          <option key={option.trim()} value={option.trim()}>
                            {option.trim()}
                          </option>
                        ))}
                      </select>
                    );
                  } else {
                    inputElement = (
                      <input
                        type={field.type}
                        value={currentValue}
                        placeholder={field.defaultValue || ""}
                        onChange={(e) => handleTemplateFieldChange(field.label, e.target.value)}
                        className="border rounded p-2 w-full"
                      />
                    );
                  }
                } else if (fieldWidth === "dynamichalf" || fieldWidth === "dynamicfull") {
                  inputWidthClass = fieldWidth === "dynamichalf" ? "w-1/2" : "w-full";
                  inputElement = (
                    <textarea
                      rows={3}
                      value={currentValue}
                      placeholder={field.defaultValue || ""}
                      onChange={(e) => handleTemplateFieldChange(field.label, e.target.value)}
                      className="border rounded p-2 w-full"
                    />
                  );
                } else {
                  inputWidthClass = "w-full";
                  inputElement = (
                    <input
                      type={field.type}
                      value={currentValue}
                      placeholder={field.defaultValue || ""}
                      onChange={(e) => handleTemplateFieldChange(field.label, e.target.value)}
                      className="border rounded p-2 w-full"
                    />
                  );
                }
                return (
                  <div key={index} className={`px-2 ${inputWidthClass} mb-2`}>
                    <label className="block text-xs font-medium mb-1">
                      {field.label}
                    </label>
                    {field.instruction && (
                      <p className="text-xs text-gray-500 mb-1">{field.instruction}</p>
                    )}
                    {inputElement}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Listing Options Form */}
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
          currency={currency}
          setCurrency={setCurrency}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" name="redirect" disabled={submitting}>
            {isRelisting ? "Relist Item" : submitting ? "Submitting..." : "Create Listing"}
          </Button>
          <Button type="submit" name="addAnother" disabled={submitting}>
            {submitting ? "Submitting..." : "Create & Add Another"}
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