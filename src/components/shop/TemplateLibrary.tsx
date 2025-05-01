
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Template } from '@/lib/types';
import { Filter, Search, Tags, CheckCircle, Clock, PlusCircle, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Sample template data (in a real app, this would come from an API)
const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'Smartphone Template',
    category: 'Electronics',
    type: 'standard',
    fields: [
      { id: 'brand', name: 'Brand', type: 'text', required: true },
      { id: 'model', name: 'Model', type: 'text', required: true },
      { id: 'storage', name: 'Storage Capacity (GB)', type: 'number', required: true },
      { id: 'color', name: 'Color', type: 'text', required: true },
      { id: 'condition', name: 'Condition', type: 'select', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] },
      { id: 'network', name: 'Network', type: 'select', required: false, options: ['Unlocked', 'AT&T', 'Verizon', 'T-Mobile', 'Sprint', 'Other'] },
      { id: 'warranty', name: 'Warranty Information', type: 'text', required: false },
      { id: 'box', name: 'Original Box & Accessories', type: 'boolean', required: false },
    ],
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Laptop Template',
    category: 'Electronics',
    type: 'standard',
    fields: [
      { id: 'brand', name: 'Brand', type: 'text', required: true },
      { id: 'model', name: 'Model', type: 'text', required: true },
      { id: 'processor', name: 'Processor', type: 'text', required: true },
      { id: 'ram', name: 'RAM (GB)', type: 'number', required: true },
      { id: 'storage', name: 'Storage Capacity (GB)', type: 'number', required: true },
      { id: 'storageType', name: 'Storage Type', type: 'select', required: true, options: ['SSD', 'HDD', 'Hybrid'] },
      { id: 'screenSize', name: 'Screen Size (inches)', type: 'number', required: true },
      { id: 'operatingSystem', name: 'Operating System', type: 'text', required: true },
      { id: 'condition', name: 'Condition', type: 'select', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] },
      { id: 'warranty', name: 'Warranty Information', type: 'text', required: false },
    ],
    createdAt: '2023-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Luxury Watch Template',
    category: 'Watches',
    type: 'standard',
    fields: [
      { id: 'brand', name: 'Brand', type: 'text', required: true },
      { id: 'model', name: 'Model', type: 'text', required: true },
      { id: 'referenceNumber', name: 'Reference Number', type: 'text', required: true },
      { id: 'movement', name: 'Movement Type', type: 'select', required: true, options: ['Automatic', 'Manual', 'Quartz', 'Other'] },
      { id: 'caseMaterial', name: 'Case Material', type: 'text', required: true },
      { id: 'caseDiameter', name: 'Case Diameter (mm)', type: 'number', required: true },
      { id: 'braceletMaterial', name: 'Bracelet Material', type: 'text', required: true },
      { id: 'dialColor', name: 'Dial Color', type: 'text', required: true },
      { id: 'yearOfManufacture', name: 'Year of Manufacture', type: 'number', required: false },
      { id: 'box', name: 'Original Box', type: 'boolean', required: false },
      { id: 'papers', name: 'Original Papers', type: 'boolean', required: false },
      { id: 'serviceHistory', name: 'Service History', type: 'text', required: false },
    ],
    createdAt: '2023-02-10T09:15:00Z',
  },
  {
    id: '4',
    name: 'Sedan Vehicle Template',
    category: 'Vehicles',
    type: 'standard',
    fields: [
      { id: 'make', name: 'Make', type: 'text', required: true },
      { id: 'model', name: 'Model', type: 'text', required: true },
      { id: 'year', name: 'Year', type: 'number', required: true },
      { id: 'mileage', name: 'Mileage', type: 'number', required: true },
      { id: 'engineSize', name: 'Engine Size', type: 'text', required: true },
      { id: 'transmission', name: 'Transmission', type: 'select', required: true, options: ['Automatic', 'Manual', 'Semi-Automatic'] },
      { id: 'fuel', name: 'Fuel Type', type: 'select', required: true, options: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'] },
      { id: 'color', name: 'Exterior Color', type: 'text', required: true },
      { id: 'interiorColor', name: 'Interior Color', type: 'text', required: true },
      { id: 'doors', name: 'Number of Doors', type: 'number', required: true },
      { id: 'owners', name: 'Number of Previous Owners', type: 'number', required: true },
      { id: 'accident', name: 'Accident History', type: 'text', required: true },
      { id: 'serviceHistory', name: 'Service History', type: 'text', required: true },
      { id: 'features', name: 'Key Features', type: 'text', required: false },
      { id: 'warranty', name: 'Warranty Information', type: 'text', required: false },
    ],
    createdAt: '2023-02-15T11:45:00Z',
  },
  {
    id: '5',
    name: 'Designer Handbag Template',
    category: 'Fashion',
    type: 'standard',
    fields: [
      { id: 'brand', name: 'Brand', type: 'text', required: true },
      { id: 'model', name: 'Model/Style Name', type: 'text', required: true },
      { id: 'material', name: 'Material', type: 'text', required: true },
      { id: 'color', name: 'Color', type: 'text', required: true },
      { id: 'size', name: 'Size', type: 'text', required: true },
      { id: 'condition', name: 'Condition', type: 'select', required: true, options: ['New with Tags', 'New without Tags', 'Like New', 'Good', 'Fair'] },
      { id: 'authenticity', name: 'Authenticity', type: 'text', required: true },
      { id: 'dustBag', name: 'Dust Bag Included', type: 'boolean', required: false },
      { id: 'box', name: 'Original Box Included', type: 'boolean', required: false },
      { id: 'receipt', name: 'Receipt Included', type: 'boolean', required: false },
      { id: 'purchaseYear', name: 'Year of Purchase', type: 'number', required: false },
    ],
    createdAt: '2023-03-05T16:20:00Z',
  },
  {
    id: '6',
    name: 'Custom Jewelry Template',
    category: 'Jewelry',
    type: 'custom',
    createdBy: 'user123',
    approvalStatus: 'approved',
    fields: [
      { id: 'type', name: 'Jewelry Type', type: 'select', required: true, options: ['Necklace', 'Bracelet', 'Earrings', 'Ring', 'Other'] },
      { id: 'material', name: 'Primary Material', type: 'text', required: true },
      { id: 'stones', name: 'Gemstones/Diamonds', type: 'text', required: false },
      { id: 'caratWeight', name: 'Total Carat Weight', type: 'number', required: false },
      { id: 'metalPurity', name: 'Metal Purity', type: 'text', required: true },
      { id: 'certification', name: 'Certification', type: 'text', required: false },
      { id: 'dimensions', name: 'Dimensions', type: 'text', required: true },
      { id: 'condition', name: 'Condition', type: 'select', required: true, options: ['New', 'Like New', 'Good', 'Fair'] },
      { id: 'appraisalValue', name: 'Appraisal Value', type: 'number', required: false },
      { id: 'age', name: 'Age/Period', type: 'text', required: false },
    ],
    createdAt: '2023-03-20T13:10:00Z',
    updatedAt: '2023-03-25T09:30:00Z',
  },
  {
    id: '7',
    name: 'Custom Artwork Template',
    category: 'Art',
    type: 'custom',
    createdBy: 'user456',
    approvalStatus: 'pending',
    fields: [
      { id: 'artist', name: 'Artist Name', type: 'text', required: true },
      { id: 'title', name: 'Artwork Title', type: 'text', required: true },
      { id: 'medium', name: 'Medium', type: 'text', required: true },
      { id: 'year', name: 'Year Created', type: 'number', required: true },
      { id: 'dimensions', name: 'Dimensions (cm)', type: 'text', required: true },
      { id: 'framed', name: 'Framed', type: 'boolean', required: true },
      { id: 'frameDimensions', name: 'Frame Dimensions (cm)', type: 'text', required: false },
      { id: 'signed', name: 'Signed by Artist', type: 'boolean', required: true },
      { id: 'authenticity', name: 'Certificate of Authenticity', type: 'boolean', required: true },
      { id: 'provenance', name: 'Provenance', type: 'text', required: false },
      { id: 'exhibitions', name: 'Exhibition History', type: 'text', required: false },
    ],
    createdAt: '2023-04-10T10:45:00Z',
  },
  {
    id: '8',
    name: 'E-Bike Local Template',
    category: 'Vehicles',
    type: 'local',
    fields: [
      { id: 'brand', name: 'Brand', type: 'text', required: true },
      { id: 'model', name: 'Model', type: 'text', required: true },
      { id: 'year', name: 'Year', type: 'number', required: true },
      { id: 'motorType', name: 'Motor Type', type: 'text', required: true },
      { id: 'motorPower', name: 'Motor Power (Watts)', type: 'number', required: true },
      { id: 'batteryCapacity', name: 'Battery Capacity (Ah)', type: 'number', required: true },
      { id: 'range', name: 'Range per Charge (km)', type: 'number', required: true },
      { id: 'maxSpeed', name: 'Maximum Speed (km/h)', type: 'number', required: true },
      { id: 'frameSize', name: 'Frame Size', type: 'text', required: true },
      { id: 'suspension', name: 'Suspension Type', type: 'text', required: false },
      { id: 'brakes', name: 'Brake Type', type: 'text', required: true },
      { id: 'condition', name: 'Condition', type: 'select', required: true, options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] },
      { id: 'mileage', name: 'Mileage (km)', type: 'number', required: true },
      { id: 'accessories', name: 'Included Accessories', type: 'text', required: false },
    ],
    createdAt: '2023-04-15T14:30:00Z',
  },
];

interface TemplateLibraryProps {
  onSelect: (template: Template) => void;
  onCreateNew: () => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelect, onCreateNew }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter templates based on active tab, category filter, and search term
  const filteredTemplates = sampleTemplates.filter(template => {
    // Filter by tab
    if (activeTab === 'standard' && template.type !== 'standard') return false;
    if (activeTab === 'custom' && template.type !== 'custom') return false;
    if (activeTab === 'local' && template.type !== 'local') return false;
    
    // Filter by category
    if (categoryFilter && template.category !== categoryFilter) return false;
    
    // Filter by search term
    if (searchTerm && !template.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });
  
  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(sampleTemplates.map(t => t.category)));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Template Library</h2>
        <Button onClick={onCreateNew} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-shrink-0 w-full sm:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="local">Local</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map(template => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onSelect={onSelect} 
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">No templates found matching your criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="standard" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map(template => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onSelect={onSelect} 
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">No standard templates found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map(template => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onSelect={onSelect} 
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">No custom templates found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="local" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map(template => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onSelect={onSelect} 
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">No local templates found.</p>
                    
                    <Button variant="outline" className="mt-4" onClick={onCreateNew}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Local Template
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  // Helper function to get type badge
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'standard':
        return <Badge className="bg-blue-500"><CheckCircle className="mr-1 h-3 w-3" /> Standard</Badge>;
      case 'custom':
        return <Badge className="bg-purple-500"><Tags className="mr-1 h-3 w-3" /> Custom</Badge>;
      case 'local':
        return <Badge variant="outline" className="border-amber-500 text-amber-500"><AlertTriangle className="mr-1 h-3 w-3" /> Local</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer" onClick={() => onSelect(template)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{template.name}</CardTitle>
            <CardDescription>{template.category}</CardDescription>
          </div>
          {getTypeBadge(template.type)}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mt-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-3 w-3" />
            Created {new Date(template.createdAt).toLocaleDateString()}
          </div>
          <p className="mt-2 text-muted-foreground">
            {template.fields.length} fields ({template.fields.filter(f => f.required).length} required)
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-muted/50 flex justify-end">
        <Button size="sm" variant="default" onClick={() => onSelect(template)}>
          Select Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateLibrary;
