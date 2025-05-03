import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  isMobile?: boolean;
  placeholder?: string;
  onSearch?: (term: string) => void;
  className?: string;
  initialValue?: string;
}

export const SearchBar = ({
  isMobile,
  placeholder = "Search products, brands, categories...",
  onSearch,
  className = "",
  initialValue = ""
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      if (searchTerm.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${isMobile ? "w-full" : "w-[400px]"} ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-14 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-primary"
        />
        <Button type="submit" size="icon" className="absolute right-0 top-0 rounded-l-none" disabled={!searchTerm.trim()}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};