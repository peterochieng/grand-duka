
import { useState } from "react";
import { GuideSection } from "./GuideSection";
import { GuideReader } from "./GuideReader";

// Guide data organized by sections
const adminGuides = [
  {
    title: "Getting Started",
    description: "Comprehensive introduction to the GrandDuka admin dashboard",
    type: "pdf" as const,
    details: "PDF Guide • 12 pages"
  },
  {
    title: "Admin Roles & Permissions",
    description: "In-depth guide to access control and user capabilities",
    type: "video" as const,
    details: "Video Tutorial • 15 min"
  },
  {
    title: "User Management",
    description: "Complete guide to managing user accounts and KYC verification",
    type: "interactive" as const,
    details: "Interactive Guide • 10 sections"
  }
];

const advancedAdminGuides = [
  {
    title: "Category Management",
    description: "How to organize marketplace categories and subcategories",
    type: "pdf" as const,
    details: "PDF Guide • 8 pages"
  },
  {
    title: "Product Moderation",
    description: "Best practices for reviewing and approving products",
    type: "video" as const,
    details: "Video Tutorial • 18 min"
  },
  {
    title: "Marketplace Analytics",
    description: "Understanding marketplace metrics and performance data",
    type: "interactive" as const,
    details: "Interactive Guide • 6 sections"
  }
];

const securityComplianceGuides = [
  {
    title: "Security Best Practices",
    description: "Maintaining a secure marketplace environment",
    type: "pdf" as const,
    details: "PDF Guide • 15 pages"
  },
  {
    title: "Compliance Checklist",
    description: "Ensuring legal and regulatory compliance",
    type: "interactive" as const,
    details: "Interactive Guide • 7 sections"
  },
  {
    title: "Fraud Prevention",
    description: "Identifying and preventing marketplace fraud",
    type: "video" as const,
    details: "Video Tutorial • 22 min"
  }
];

interface AdminGuidesContentProps {
  handleDownloadGuide: (guideName: string) => void;
  handleWatchVideo: (videoTitle: string) => void;
  handleOpenGuide: (guideName: string) => void;
}

export const AdminGuidesContent = ({
  handleDownloadGuide,
  handleWatchVideo,
  handleOpenGuide
}: AdminGuidesContentProps) => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [readingGuide, setReadingGuide] = useState(false);
  
  const handleReadGuide = (guideName: string) => {
    setSelectedGuide(guideName);
    setReadingGuide(true);
  };

  const handleAction = (guideName: string, type: "pdf" | "video" | "interactive") => {
    switch (type) {
      case "pdf":
        handleDownloadGuide(guideName);
        break;
      case "video":
        handleWatchVideo(guideName);
        break;
      case "interactive":
        handleOpenGuide(guideName);
        break;
    }
  };
  
  const getGuideTypeByTitle = (title: string): "pdf" | "video" | "interactive" => {
    const allGuides = [...adminGuides, ...advancedAdminGuides, ...securityComplianceGuides];
    const guide = allGuides.find(g => g.title === title);
    return guide?.type || "pdf";
  };
  
  return (
    <div className="space-y-6">
      <GuideSection 
        title="Getting Started" 
        guides={adminGuides}
        onAction={(guideName) => handleAction(guideName, getGuideTypeByTitle(guideName))}
        onRead={handleReadGuide}
      />
      
      <GuideSection 
        title="Advanced Administration" 
        guides={advancedAdminGuides}
        onAction={(guideName) => handleAction(guideName, getGuideTypeByTitle(guideName))}
        onRead={handleReadGuide}
      />
      
      <GuideSection 
        title="Security & Compliance" 
        guides={securityComplianceGuides}
        onAction={(guideName) => handleAction(guideName, getGuideTypeByTitle(guideName))}
        onRead={handleReadGuide}
      />
      
      <GuideReader
        isOpen={readingGuide}
        onClose={() => setReadingGuide(false)}
        guideName={selectedGuide}
        onDownload={handleDownloadGuide}
      />
    </div>
  );
};
