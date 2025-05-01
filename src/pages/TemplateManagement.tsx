
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateLibrary from '@/components/shop/TemplateLibrary';
import CreateTemplate from '@/components/shop/CreateTemplate';
import { Template } from '@/lib/types';

const TemplateManagement = () => {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setActiveTab('edit');
  };
  
  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setActiveTab('create');
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Template Management</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="library">Template Library</TabsTrigger>
            <TabsTrigger value="create">Create Template</TabsTrigger>
            {selectedTemplate && <TabsTrigger value="edit">Edit Template</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="library">
            <TemplateLibrary 
              onSelect={handleSelectTemplate} 
              onCreateNew={handleCreateNew} 
            />
          </TabsContent>
          
          <TabsContent value="create">
            <CreateTemplate />
          </TabsContent>
          
          <TabsContent value="edit">
            {selectedTemplate && <CreateTemplate existingTemplate={selectedTemplate} />}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default TemplateManagement;
