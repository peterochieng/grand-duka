
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AdminGuidesContent } from "./AdminGuidesContent";
import { SupportGuidesContent } from "./SupportGuidesContent";
import { WorkflowGuidesContent } from "./WorkflowGuidesContent";
import { useToast } from "@/hooks/use-toast";

export const UserGuidesTabContent = () => {
  const [tabValue, setTabValue] = useState("admin");
  const { toast } = useToast();
  
  const handleDownloadGuide = (guideName: string) => {
    toast({
      title: "Download Started",
      description: `${guideName} is being downloaded.`,
    });
    // In a real app, this would trigger an actual download
  };

  const handleWatchVideo = (videoTitle: string) => {
    toast({
      title: "Opening Video",
      description: `${videoTitle} tutorial is opening in a new window.`,
    });
    // In a real app, this would open a video in a modal or new window
  };

  const handleOpenGuide = (guideName: string) => {
    toast({
      title: "Opening Guide",
      description: `${guideName} is now open for viewing.`,
    });
    // In a real app, this would open the interactive guide
  };
  
  return (
    <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="admin">Admin Guides</TabsTrigger>
        <TabsTrigger value="support">Support Team</TabsTrigger>
        <TabsTrigger value="workflows">Common Workflows</TabsTrigger>
      </TabsList>
      
      <TabsContent value="admin" className="space-y-4">
        <AdminGuidesContent 
          handleDownloadGuide={handleDownloadGuide}
          handleWatchVideo={handleWatchVideo}
          handleOpenGuide={handleOpenGuide}
        />
      </TabsContent>
      
      <TabsContent value="support" className="space-y-4">
        <SupportGuidesContent 
          handleDownloadGuide={handleDownloadGuide}
          handleWatchVideo={handleWatchVideo}
          handleOpenGuide={handleOpenGuide}
        />
      </TabsContent>
      
      <TabsContent value="workflows" className="space-y-4">
        <WorkflowGuidesContent 
          handleDownloadGuide={handleDownloadGuide}
          handleWatchVideo={handleWatchVideo}
          handleOpenGuide={handleOpenGuide}
        />
      </TabsContent>
    </Tabs>
  );
};
