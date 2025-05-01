
import { UserGuideCard } from "./UserGuideCard";

interface WorkflowGuidesContentProps {
  handleDownloadGuide: (guideName: string) => void;
  handleWatchVideo: (videoTitle: string) => void;
  handleOpenGuide: (guideName: string) => void;
}

export const WorkflowGuidesContent = ({
  handleDownloadGuide,
  handleWatchVideo,
  handleOpenGuide
}: WorkflowGuidesContentProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <UserGuideCard
        title="KYC Verification Process"
        description="Step-by-step guide to verifying user identity"
        type="interactive"
        details="Workflow Guide • 7 steps"
        onAction={handleOpenGuide}
      />
      
      <UserGuideCard
        title="Shop Approval Workflow"
        description="Process for reviewing and approving new shops"
        type="video"
        details="Interactive Walkthrough • 10 min"
        onAction={handleWatchVideo}
      />
      
      <UserGuideCard
        title="Bulk User Management"
        description="How to efficiently manage multiple users"
        type="pdf"
        details="PDF Guide • 8 pages"
        onAction={handleDownloadGuide}
      />
    </div>
  );
};
