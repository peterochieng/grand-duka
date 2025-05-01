
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Product } from "@/lib/types";
import { categories } from "@/lib/categories";
import { useToast } from "@/hooks/use-toast";
import CategoryFieldsMapper from './category-fields/CategoryFieldsMapper';

interface BasicInformationFormProps {
  selectedProduct: Product | null;
}

const BasicInformationForm: React.FC<BasicInformationFormProps> = ({ 
  selectedProduct
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(selectedProduct?.title || '');
  const [description, setDescription] = useState(selectedProduct?.description || '');
  const [price, setPrice] = useState(selectedProduct?.price?.toString() || '');
  const [condition, setCondition] = useState(selectedProduct?.condition || 'New');
  const [category, setCategory] = useState(selectedProduct?.category || '');
  const [subcategory, setSubcategory] = useState(selectedProduct?.subcategory || '');
  const [location, setLocation] = useState(selectedProduct?.location || 'Dubai, UAE');
  const [currency, setCurrency] = useState(selectedProduct?.currency || 'AED');
  
  // Get available subcategories based on selected category
  const getAvailableSubcategories = () => {
    const selectedCategoryObj = categories.find(c => c.name === category);
    return selectedCategoryObj?.subcategories || [];
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Product Title</Label>
          <Input 
            type="text" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={category} 
            onValueChange={(value) => {
              setCategory(value);
              setSubcategory(''); // Reset subcategory when category changes
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {getAvailableSubcategories().length > 0 && (
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select value={subcategory} onValueChange={setSubcategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableSubcategories().map((subcat, index) => (
                  <SelectItem key={index} value={subcat}>
                    {subcat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div>
          <Label htmlFor="condition">Condition</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Like New">Like New</SelectItem>
              <SelectItem value="Excellent">Excellent</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Fair">Fair</SelectItem>
              <SelectItem value="Poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input 
              type="number" 
              id="price" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AED">AED</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input 
            type="text" 
            id="location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item in detail"
            rows={5}
          />
        </div>
      </div>
      
      {/* Category-specific fields section */}
      {category && (
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">{category} Details</h3>
          <CategoryFieldsMapper category={category} />
        </div>
      )}
    </div>
  );
};

export default BasicInformationForm;
