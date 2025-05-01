
import React, { useState } from 'react';
import { UsersTable } from './UsersTable';
import { User } from '@/lib/types/userTypes';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityLogTab } from './activity/ActivityLogTab';
import { History, Users as UsersIcon, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface UserListContentProps {
  users: User[];
  loading: boolean;
  error?: string | null;
}

export const UserListContent: React.FC<UserListContentProps> = ({ users, loading, error }) => {
  const [activeTab, setActiveTab] = useState<string>("users");
  
  return (
    <div>
      <Tabs 
        defaultValue="users" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="users">
            <UsersIcon className="mr-2 h-4 w-4" />
            Users List
          </TabsTrigger>
          <TabsTrigger value="activity">
            <History className="mr-2 h-4 w-4" />
            Activity Log
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">No users found</p>
            </div>
          ) : (
            <UsersTable users={users} />
          )}
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <ActivityLogTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
