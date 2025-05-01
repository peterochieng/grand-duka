
import { GettingStartedGuide, CategoryManagementGuide, SecurityBestPracticesGuide, PlaceholderGuide, guideContentStyles } from './content';
import { motion, AnimatePresence } from 'framer-motion';

interface GuideContentProps {
  guideName: string | null;
  onHeadingsExtracted?: (headings: Array<{id: string; text: string; level: number}>) => void;
}

export const GuideContent = ({ guideName, onHeadingsExtracted }: GuideContentProps) => {
  return (
    <>
      <style>{guideContentStyles}</style>
      <AnimatePresence mode="wait">
        <motion.div
          key={guideName || 'empty'}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="guide-content"
          id="guide-content-container"
        >
          {renderGuideContent(guideName)}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const renderGuideContent = (guideName: string | null) => {
  switch (guideName) {
    case "Getting Started":
      return <GettingStartedGuide />;
    case "Category Management":
      return <CategoryManagementGuide />;
    case "Security Best Practices":
      return <SecurityBestPracticesGuide />;
    default:
      return <PlaceholderGuide />;
  }
};
