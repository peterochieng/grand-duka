
import { UserGuideCard } from "./UserGuideCard";

interface SupportGuidesContentProps {
  handleDownloadGuide: (guideName: string) => void;
  handleWatchVideo: (videoTitle: string) => void;
  handleOpenGuide: (guideName: string) => void;
}

export const SupportGuidesContent = ({
  handleDownloadGuide,
  handleWatchVideo,
  handleOpenGuide
}: SupportGuidesContentProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <UserGuideCard
        title="Support Ticket Management"
        description="How to process and resolve support tickets"
        type="pdf"
        details="PDF Guide • 10 pages"
        onAction={handleDownloadGuide}
      />
      
      <UserGuideCard
        title="Communication Guidelines"
        description="Best practices for customer communication"
        type="video"
        details="Video Tutorial • 15 min"
        onAction={handleWatchVideo}
      />
      
      <UserGuideCard
        title="Escalation Procedures"
        description="When and how to escalate support issues"
        type="interactive"
        details="Interactive Guide • 6 sections"
        onAction={handleOpenGuide}
      />
    </div>
  );
};
