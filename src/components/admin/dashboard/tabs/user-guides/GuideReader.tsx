import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Search, List } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { GuideContent } from "./GuideContent";
import { TableOfContents } from "./components/TableOfContents";
import { SearchBar } from "./components/SearchBar";

interface GuideReaderProps {
  isOpen: boolean;
  onClose: () => void;
  guideName: string | null;
  onDownload: (guideName: string) => void;
}

export const GuideReader = ({
  isOpen,
  onClose,
  guideName,
  onDownload
}: GuideReaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(true);
  const [headings, setHeadings] = useState<Array<{id: string; text: string; level: number}>>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setTimeout(() => {
        if (!contentRef.current) return;
        
        const headingElements = contentRef.current.querySelectorAll('h2, h3, h4');
        const extractedHeadings = Array.from(headingElements).map((el) => {
          return {
            id: el.id,
            text: el.textContent || '',
            level: parseInt(el.tagName.substring(1), 10)
          };
        });
        
        setHeadings(extractedHeadings);
      }, 200);
    }
  }, [isOpen, guideName]);
  
  useEffect(() => {
    if (!searchTerm || !contentRef.current) return;
    
    const content = contentRef.current;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const textNodes = getTextNodes(content);
    
    content.innerHTML = content.innerHTML.replace(/<mark class="highlight">(.+?)<\/mark>/g, '$1');
    
    if (searchTerm.length < 2) return;
    
    textNodes.forEach(node => {
      const parent = node.parentNode;
      if (!parent || parent.nodeName === 'MARK') return;
      
      const text = node.nodeValue || '';
      if (!regex.test(text)) return;
      
      const newHtml = text.replace(regex, '<mark class="highlight">$1</mark>');
      const span = document.createElement('span');
      span.innerHTML = newHtml;
      
      parent.replaceChild(span, node);
    });
    
    const firstHighlight = content.querySelector('mark.highlight');
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [searchTerm]);
  
  useEffect(() => {
    if (!isOpen || !contentRef.current || headings.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0
      }
    );
    
    headings.forEach(heading => {
      const element = contentRef.current?.querySelector(`#${heading.id}`);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [isOpen, headings]);
  
  const getTextNodes = (node: Node): Text[] => {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    
    let n: Node | null;
    while ((n = walker.nextNode()) !== null) {
      textNodes.push(n as Text);
    }
    
    return textNodes;
  };
  
  const scrollToSection = (id: string) => {
    if (contentRef.current) {
      const element = contentRef.current.querySelector(`#${id}`);
      if (element) {
        setActiveHeading(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    
    if (contentRef.current) {
      contentRef.current.innerHTML = contentRef.current.innerHTML.replace(/<mark class="highlight">(.+?)<\/mark>/g, '$1');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{guideName}</span>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSearching(!isSearching)}
                className={`transition-all ${isSearching ? 'bg-secondary' : 'hover:bg-secondary/80'}`}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsTocOpen(!isTocOpen)}
                className={`transition-all ${isTocOpen ? 'bg-secondary' : 'hover:bg-secondary/80'}`}
              >
                <List className="h-4 w-4 mr-2" />
                Contents
              </Button>
            </div>
          </DialogTitle>
          
          <AnimatePresence>
            {isSearching && (
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClear={clearSearch}
              />
            )}
          </AnimatePresence>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden mt-4">
          <Collapsible
            open={isTocOpen}
            onOpenChange={setIsTocOpen}
            className="w-64 mr-4 shrink-0 border rounded-md transition-all duration-300"
          >
            <CollapsibleContent className="px-3 py-2">
              <TableOfContents 
                headings={headings}
                activeHeading={activeHeading}
                onHeadingClick={scrollToSection}
              />
            </CollapsibleContent>
          </Collapsible>
          
          <div className="flex-1 border rounded-md bg-white overflow-hidden flex flex-col transition-all duration-300">
            <ScrollArea className="flex-1 p-6" id="guide-scroll-area">
              <div ref={contentRef} className="guide-content pr-2">
                <GuideContent guideName={guideName} />
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            onClick={onClose} 
            variant="outline"
            className="transition-transform hover:scale-105"
          >
            Close
          </Button>
          <Button 
            onClick={() => {
              if (guideName) {
                onDownload(guideName);
                onClose();
              }
            }}
            variant="outline"
            className="transition-transform hover:scale-105"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Guide
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
