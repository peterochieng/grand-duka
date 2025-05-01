
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, PlusCircle } from "lucide-react";
import { UserSearch } from "./UserSearch";
import { UserSearchValues } from "./forms/userFormSchema";

interface UserActionsBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAdvancedSearch: (filters: UserSearchValues) => void;
  onShowKycManagement: () => void;
  onAddUser: () => void;
  showKycManagement: boolean;
  activeFilters?: UserSearchValues;
}

export const UserActionsBar: React.FC<UserActionsBarProps> = ({
  searchQuery,
  onSearchChange,
  onAdvancedSearch,
  onShowKycManagement,
  onAddUser,
  showKycManagement,
  activeFilters
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <UserSearch 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange}
          onAdvancedSearch={onAdvancedSearch}
          activeFilters={activeFilters}
        />
        
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onShowKycManagement}
        >
          <Shield className="h-4 w-4" />
          {showKycManagement ? "Hide KYC Management" : "KYC Management"}
        </Button>
      </div>
      
      <Button onClick={onAddUser}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  );
};
