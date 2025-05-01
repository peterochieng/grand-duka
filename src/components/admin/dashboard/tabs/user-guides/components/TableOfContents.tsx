
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableOfContentsProps {
  headings: Array<{id: string; text: string; level: number}>;
  activeHeading: string | null;
  onHeadingClick: (id: string) => void;
}

export const TableOfContents = ({ 
  headings, 
  activeHeading, 
  onHeadingClick 
}: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleToc = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <Button 
        variant="ghost" 
        onClick={toggleToc} 
        className="flex items-center justify-between py-2 font-medium"
      >
        <span className="text-lg">Table of Contents</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        )}
      </Button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ScrollArea className="h-[calc(85vh-240px)]">
              <motion.ul 
                className="space-y-1.5 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
              >
                {headings.map((heading) => (
                  <motion.li 
                    key={heading.id}
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      flex items-center cursor-pointer hover:text-primary transition-all rounded px-2 py-0.5
                      ${activeHeading === heading.id ? 'bg-primary/10 text-primary font-medium' : ''}
                      ${heading.level === 2 ? 'font-medium text-base' : ''}
                      ${heading.level === 3 ? 'pl-3' : ''}
                      ${heading.level === 4 ? 'text-xs pl-6 text-muted-foreground' : ''}
                    `}
                    onClick={() => onHeadingClick(heading.id)}
                  >
                    {activeHeading === heading.id && (
                      <CircleDot className="h-3 w-3 mr-1.5 text-primary shrink-0" />
                    )}
                    {activeHeading !== heading.id && heading.level > 2 && (
                      <div className="w-3 mr-1.5" />
                    )}
                    <span className={activeHeading === heading.id ? "underline-offset-4 underline" : ""}>
                      {heading.text}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
