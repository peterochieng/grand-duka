
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UserSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch?: () => Promise<void>;
  isSearching?: boolean;
  searchResults?: Array<{id: string; first_name: string; last_name: string}>;
  onSelectUser?: (id: string, email: string) => void;
}

export const UserSearch = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  isSearching,
  searchResults,
  onSelectUser
}: UserSearchProps) => {
  // Simple search for PendingKycList
  if (!onSearch) {
    return (
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 w-[250px]"
        />
      </div>
    );
  }
  
  // Advanced search with results for KycManagement
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <button 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={onSearch}
          disabled={isSearching || searchTerm.length < 3}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {searchResults && searchResults.length > 0 && (
        <div className="border rounded-md overflow-hidden">
          <div className="p-2 bg-muted text-sm font-medium">
            Search Results
          </div>
          <div className="divide-y">
            {searchResults.map(user => (
              <div 
                key={user.id} 
                className="p-3 hover:bg-muted/50 cursor-pointer"
                onClick={() => onSelectUser && onSelectUser(
                  user.id, 
                  `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.id
                )}
              >
                <p className="font-medium">{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User'}</p>
                <p className="text-xs text-muted-foreground">ID: {user.id}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
