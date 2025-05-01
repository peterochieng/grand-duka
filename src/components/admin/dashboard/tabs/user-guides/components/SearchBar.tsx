
import { useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onClear 
}: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-2 overflow-hidden"
    >
      <div className="relative">
        <Input
          ref={searchInputRef}
          placeholder="Search in guide..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full transition-all focus:ring-2 focus:ring-primary/50 pr-8"
        />
        {searchTerm && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 h-full"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};
