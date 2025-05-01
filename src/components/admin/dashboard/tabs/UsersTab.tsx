
import { useState } from "react";
import { UsersTable } from "./users/UsersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Boxes, User, Users } from "lucide-react";
import { KycManagement } from "./users/KycManagement";
import { useUsersData } from './users/hooks/useUsersData';
import { AddUserDialog } from "./users/AddUserDialog";
import { UserActionsBar } from "./users/UserActionsBar";
import { UserListContent } from "./users/UserListContent";
import { UserTabControls } from "./users/UserTabControls";

export const UsersTab = () => {
  const {
    filteredUsers,
    loading,
    searchQuery,
    setSearchQuery,
    activeTab,
    handleTabChange,
    handleUserCreated,
    handleAdvancedSearch,
    activeFilters,
    error
  } = useUsersData();
  
  const [showKycManagement, setShowKycManagement] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">User Management</h3>
      <p className="text-muted-foreground mb-4">Manage users, verify KYC applications, and handle user roles.</p>
      
      <UserActionsBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdvancedSearch={handleAdvancedSearch}
        onShowKycManagement={() => setShowKycManagement(!showKycManagement)}
        onAddUser={() => setShowAddUserDialog(true)}
        showKycManagement={showKycManagement}
        activeFilters={activeFilters}
      />
      
      {showKycManagement && (
        <div className="mb-6">
          <KycManagement />
        </div>
      )}
      
      <UserTabControls 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      <UserListContent 
        users={filteredUsers} 
        loading={loading}
        error={error}
      />

      <AddUserDialog 
        open={showAddUserDialog} 
        onOpenChange={setShowAddUserDialog}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};
