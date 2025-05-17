import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useCategories } from '@/hooks/useCategories';
import { useSubcategories } from '@/hooks/useSubcategories';
import { useAllSubcategories } from '@/hooks/useAllSubcategories';

type TemplateField = {
  id?: string;
  label: string;
  type: string;
  options?: string;
  required?: boolean;
  // New properties:
  instruction?: string;
  defaultValue?: string;
  width?: "half" | "full" | "dynamicHalf" | "dynamicFull";
};

// Default basic information template fields (unchanged)
const defaultBasicInfoTemplate: TemplateField[] = [
  { id: 'title', label: 'Product Title', type: 'text', required: true },
  { id: 'description', label: 'Description', type: 'textarea', required: true },
  { id: 'condition', label: 'Condition', type: 'select', options: 'New,Like New,Excellent,Good,Fair,Poor', required: true },
  { id: 'location', label: 'Location', type: 'text', required: true }
];

export const AdminSubcategoryTemplateManager = () => {
  // State for the subcategory template form.
  const [templateName, setTemplateName] = useState('');
  const [fields, setFields] = useState<TemplateField[]>([]);
  // New state: basic information template
  const [basicInfoTemplate, setBasicInfoTemplate] = useState<TemplateField[]>(defaultBasicInfoTemplate);
  const [basicInfoEditMode, setBasicInfoEditMode] = useState<boolean>(false);

  // State for category and subcategory selection.
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  // New state for toggling layout
  const [layoutMode, setLayoutMode] = useState<'table' | 'card'>('table');

  // Fetch categories and subcategories for the dropdown.
  const { categories, loading: catLoading } = useCategories();
  const { subcategories, loading: subcatLoading } = useSubcategories(selectedCategoryId);
  // Use hook to retrieve all subcategories (for cross-referencing).
  const { subcategories: allSubcategories } = useAllSubcategories();

  // Helper: look up subcategory name.
  const getSubcategoryName = (id: string) => {
    const found = allSubcategories.find(sub => sub.id === id);
    return found ? found.name : id;
  };

  // Field types available.
  const fieldTypes = ['text', 'number', 'date', 'boolean', 'dropdown', 'image'];

  // Helper functions for dynamic fields in the subcategory template.
  const addField = () => {
    setFields(prev => [...prev, { label: '', type: 'text', instruction: '', defaultValue: '', width: "half" }]);
  };

  const removeField = (index: number) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: keyof TemplateField, value: string) => {
    setFields(prev =>
      prev.map((field, i) => (i === index ? { ...field, [key]: value } : field))
    );
  };

  // Functions for editing the Basic Information template.
  const updateBasicInfoField = (index: number, key: keyof TemplateField, value: string) => {
    setBasicInfoTemplate(prev =>
      prev.map((field, i) => (i === index ? { ...field, [key]: value } : field))
    );
  };

  // Delete a template.
  const handleDeleteTemplate = async (templateId: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('subcategory_templates' as any)
      .delete()
      .eq('id', templateId);
    if (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    } else {
      toast.success('Template deleted successfully');
      fetchTemplates();
    }
    setLoading(false);
  };

  // Toggle active status.
  const handleToggleActive = async (templateId: string, currentActive: boolean) => {
    setLoading(true);
    const { error } = await supabase
      .from('subcategory_templates' as any)
      .update({ is_active: !currentActive })
      .eq('id', templateId);
    if (error) {
      console.error('Error updating template status:', error);
      toast.error('Failed to update template status');
    } else {
      toast.success('Template status updated successfully');
      fetchTemplates();
    }
    setLoading(false);
  };

  // Fetch existing templates.
  const fetchTemplates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('subcategory_templates' as any)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching templates:', error);
      toast.error('Error loading templates');
    } else {
      setTemplates(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // When editing is triggered, populate the form.
  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setFields(template.fields || []);
    setSelectedCategoryId(template.category_id || '');
    setSelectedSubcategoryId(template.subcategory_id || '');
    // If the template includes a basic info part, load it; otherwise use default.
    setBasicInfoTemplate(template.basic_info_template || defaultBasicInfoTemplate);
  };

  // Cancel edit and reset form.
  const cancelEdit = () => {
    setEditingTemplate(null);
    setTemplateName('');
    setFields([]);
    setSelectedCategoryId('');
    setSelectedSubcategoryId('');
    setBasicInfoTemplate(defaultBasicInfoTemplate);
    setBasicInfoEditMode(false);
  };

  // Handle form submission to create or update a template.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim() || fields.length === 0) {
      toast.error('Please provide a template name and at least one field');
      return;
    }
    setLoading(true);
    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from('subcategory_templates' as any)
          .update({
            name: templateName,
            fields,
            basic_info_template: basicInfoTemplate,
            category_id: selectedCategoryId || null,
            subcategory_id: selectedSubcategoryId || null
          })
          .eq('id', editingTemplate.id);
        if (error) {
          console.error('Error updating template:', error);
          toast.error('Failed to update template');
        } else {
          toast.success('Template updated successfully');
          cancelEdit();
          fetchTemplates();
        }
      } else {
        const { error } = await supabase
          .from('subcategory_templates' as any)
          .insert([
            {
              name: templateName,
              fields,
              basic_info_template: basicInfoTemplate,
              is_active: false, // default inactive
              category_id: selectedCategoryId || null,
              subcategory_id: selectedSubcategoryId || null
            }
          ]);
        if (error) {
          console.error('Error creating template:', error);
          toast.error('Failed to create template');
        } else {
          toast.success('Template created successfully');
          setTemplateName('');
          setFields([]);
          setSelectedCategoryId('');
          setSelectedSubcategoryId('');
          setBasicInfoTemplate(defaultBasicInfoTemplate);
          setBasicInfoEditMode(false);
          fetchTemplates();
        }
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred while processing the template');
    }
    setLoading(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {editingTemplate ? 'Edit Template' : 'Define Template'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Template Name */}
          <div>
            <label htmlFor="templateName" className="block text-sm font-medium mb-1">
              Template Name
            </label>
            <Input
              id="templateName"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g. Electronics Listing Template"
            />
          </div>
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Category (Required)</label>
            {catLoading ? (
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
            ) : (
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setSelectedSubcategoryId('');
                }}
                className="border rounded p-2 w-full"
                required
              >
                <option value="">-- Select a category for the template --</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* Subcategory Selection */}
          {selectedCategoryId && (
            <div>
              <label className="block text-sm font-medium mb-1">Select Subcategory (Optional)</label>
              {subcatLoading ? (
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
              ) : (
                <select
                  value={selectedSubcategoryId}
                  onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                  className="border rounded p-2 w-full"
                >
                  <option value="">-- Applies to all subcategories in this category --</option>
                  {subcategories.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
          {/* BASIC INFORMATION TEMPLATE SECTION */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Basic Information Template</h3>
              <Button variant="outline" size="sm" onClick={() => setBasicInfoEditMode(!basicInfoEditMode)}>
                {basicInfoEditMode ? 'Done' : 'Edit'}
              </Button>
            </div>
            {basicInfoTemplate.map((field, index) => (
              <div key={field.id || index} className="mt-2 space-y-1">
                {basicInfoEditMode ? (
                  <>
                    <Input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateBasicInfoField(index, 'label', e.target.value)}
                      placeholder="Field Label"
                      className="w-full"
                    />
                    <Select
                      onValueChange={(value) => updateBasicInfoField(index, 'type', value)}
                      value={field.type}
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldTypes.map((ft) => (
                          <SelectItem key={ft} value={ft}>
                            {ft}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* New options */}
                    <Input
                      type="text"
                      value={field.instruction || ''}
                      onChange={(e) => updateBasicInfoField(index, 'instruction', e.target.value)}
                      placeholder="User Instruction (e.g., Enter a descriptive title)"
                      className="w-full"
                    />
                    <Input
                      type="text"
                      value={field.defaultValue || ''}
                      onChange={(e) => updateBasicInfoField(index, 'defaultValue', e.target.value)}
                      placeholder="Default Value (if any)"
                      className="w-full"
                    />
                    <Select
                      onValueChange={(value) => updateBasicInfoField(index, 'width', value)}
                      value={field.width || 'half'}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Field Width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="half">Half Width</SelectItem>
                        <SelectItem value="full">Full Width</SelectItem>
                        <SelectItem value="dynamicHalf">Dynamic Half Width</SelectItem>
                        <SelectItem value="dynamicFull">Dynamic Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                ) : (
                  <div className="text-sm">
                    <strong>{field.label}</strong> ({field.type}
                    {field.options ? `: ${field.options}` : ''})
                    {field.instruction && (
                      <div className="text-xs text-muted-foreground">
                        {field.instruction}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Template Fields (for subcategory-specific fields) */}
          <div>
            <label className="block text-sm font-medium mb-1">Template Fields</label>
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col space-y-2 mb-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <Input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(index, 'label', e.target.value)}
                    placeholder="Field Label"
                    className="w-1/2 min-w-[150px]"
                  />
                  <Select onValueChange={(value) => updateField(index, 'type', value)} value={field.type}>
                    <SelectTrigger className="w-1/3 min-w-[120px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((ft) => (
                        <SelectItem key={ft} value={ft}>
                          {ft}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeField(index)}>
                    Remove
                  </Button>
                </div>
                {/* New additional options per field */}
                <Input
                  type="text"
                  value={field.instruction || ''}
                  onChange={(e) => updateField(index, 'instruction', e.target.value)}
                  placeholder="User Instruction (e.g., Enter a descriptive title)"
                  className="w-full"
                />
                <Input
                  type="text"
                  value={field.defaultValue || ''}
                  onChange={(e) => updateField(index, 'defaultValue', e.target.value)}
                  placeholder="Default Value (if any)"
                  className="w-full"
                />
                <Select onValueChange={(value) => updateField(index, 'width', value)} value={field.width || 'half'}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Field Width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half">Half Width</SelectItem>
                    <SelectItem value="full">Full Width</SelectItem>
                    <SelectItem value="dynamicHalf">Dynamic Half Width</SelectItem>
                    <SelectItem value="dynamicFull">Dynamic Full Width</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addField}>
              Add Field
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex items-center space-x-2">
          <Button type="submit" disabled={loading}>
            {loading
              ? editingTemplate
                ? 'Updating...'
                : 'Saving...'
              : editingTemplate
              ? 'Update Template'
              : 'Save Template'}
          </Button>
          {editingTemplate && (
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Cancel Edit
            </Button>
          )}
        </CardFooter>
      </form>
      {/* Toggle Layout Option & Existing Templates Section */}
      <CardContent className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Existing Templates</h3>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={layoutMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayoutMode('table')}
            >
              Table
            </Button>
            <Button
              type="button"
              variant={layoutMode === 'card' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayoutMode('card')}
            >
              Card
            </Button>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : templates.length === 0 ? (
          <p>No templates defined yet.</p>
        ) : layoutMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subcategory</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fields</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.map((template) => {
                  const catName = template.category_id
                    ? categories.find((cat: any) => cat.id === template.category_id)?.name || template.category_id
                    : '';
                  const subcatName = template.subcategory_id ? getSubcategoryName(template.subcategory_id) : '';
                  return (
                    <tr key={template.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">{template.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{catName}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{subcatName}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{template.fields ? template.fields.length : 0}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            template.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {template.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleActive(template.id, template.is_active)}
                          >
                            {template.is_active ? 'Unpublish' : 'Publish'}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTemplate(template)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          // Card layout for Existing Templates
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template) => {
              const catName = template.category_id
                ? categories.find((cat: any) => cat.id === template.category_id)?.name || template.category_id
                : '';
              const subcatName = template.subcategory_id ? getSubcategoryName(template.subcategory_id) : '';
              return (
                <Card key={template.id} className="p-4">
                  <h4 className="font-semibold mb-2">{template.name}</h4>
                  <p className="text-sm">
                    <strong>Category: </strong>
                    {catName}
                  </p>
                  <p className="text-sm">
                    <strong>Subcategory: </strong>
                    {subcatName}
                  </p>
                  <p className="text-sm">
                    <strong>Fields: </strong>
                    {template.fields ? template.fields.length : 0}
                  </p>
                  <p className="text-sm">
                    <strong>Status: </strong>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        template.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {template.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(template.id, template.is_active)}
                    >
                      {template.is_active ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTemplate(template)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSubcategoryTemplateManager;