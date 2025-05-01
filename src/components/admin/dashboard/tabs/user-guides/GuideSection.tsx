
import { UserGuideCard } from "./UserGuideCard";

interface GuideSectionProps {
  title: string;
  guides: Array<{
    title: string;
    description: string;
    type: "pdf" | "video" | "interactive";
    details: string;
  }>;
  onAction: (guideName: string) => void;
  onRead?: (guideName: string) => void;
}

export const GuideSection = ({ title, guides, onAction, onRead }: GuideSectionProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mt-8 mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <UserGuideCard
            key={guide.title}
            title={guide.title}
            description={guide.description}
            type={guide.type}
            details={guide.details}
            onAction={onAction}
            onRead={guide.type === "pdf" ? onRead : undefined}
          />
        ))}
      </div>
    </>
  );
};
