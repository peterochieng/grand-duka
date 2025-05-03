import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const AdminSubcategoryTemplateManager = () => {
  // State for template form fields
  const [templateName, setTemplateName] = useState('');
  const [templateFields, setTemplateFields] = useState(''); // for simplicity, you can type JSON here
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);

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
      fetchTemplates(); // refresh list
    }
    setLoading(false);
  };

  // Fetch existing templates from Supabase
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim() || !templateFields.trim()) {
      toast.error('Please provide both template name and fields JSON');
      return;
    }
    setLoading(true);
    try {
      const fieldsJson = JSON.parse(templateFields); // ensure valid JSON
      const { data, error } = await supabase
        .from('subcategory_templates' as any)
        .insert([{
          name: templateName,
          fields: fieldsJson,
          is_active: false  // default inactive, can be toggled later
        }]);
      if (error) {
        console.error('Error creating template:', error);
        toast.error('Failed to create template');
      } else {
        toast.success('Template created successfully');
        setTemplateName('');
        setTemplateFields('');
        fetchTemplates();
      }
    } catch (err) {
      console.error('Invalid JSON:', err);
      toast.error('Please check the JSON format of template fields');
    }
    setLoading(false);
  };

  

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Define Subcategory Template</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
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
          <div>
            <label htmlFor="templateFields" className="block text-sm font-medium mb-1">
              Template Fields (in JSON)
            </label>
            <Textarea
              id="templateFields"
              value={templateFields}
              onChange={(e) => setTemplateFields(e.target.value)}
              placeholder='e.g. [{"label": "Model", "type": "text"}, {"label": "Warranty", "type": "number"}]'
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Template'}
          </Button>
        </CardFooter>
      </form>
      <CardContent>
        <h3 className="font-semibold mb-2">Existing Templates</h3>
        {loading ? (
  <p>Loading...</p>
) : templates.length === 0 ? (
  <p>No templates defined yet.</p>
) : (
  <ul className="list-disc ml-6">
    {templates.map(template => (
      <li key={template.id} className="flex items-center justify-between">
        <div>
          <span className="font-medium">{template.name}</span> – Active: {template.is_active ? 'Yes' : 'No'}
        </div>
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleToggleActive(template.id, template.is_active)}
          >
            {template.is_active ? 'Unpublish' : 'Publish'}
          </Button>
        </div>
      </li>
    ))}
  </ul>
)}
      </CardContent>
    </Card>
  );
};

