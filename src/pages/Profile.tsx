
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { supabase } from '@/integrations/supabase/client';

// Import refactored components
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileOverview } from '@/components/profile/ProfileOverview';
import { FavoritesTab } from '@/components/profile/FavoritesTab';
import { InspectionsTab } from '@/components/profile/InspectionsTab';
import { SavedSearchesTab } from '@/components/profile/SavedSearchesTab';
import { TransactionsTab } from '@/components/profile/TransactionsTab';
import { PurchasesTab } from '@/components/profile/PurchasesTab';
import { SettingsTab } from '@/components/profile/SettingsTab';

const Profile = () => {
  const { toast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { user, loading, updateProfile } = useCurrentUser();
  
  const [savedSearches, setSavedSearches] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [inspectionRequests, setInspectionRequests] = useState([]);
  
  useEffect(() => {
    if (!user?.id) return;
    
    // Fetch user's watchlist
    const fetchWatchlist = async () => {
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        setWatchlist(data || []);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    
    // Fetch user's inspection requests
    const fetchInspections = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, title, approval_status, created_at, approved_at')
          .eq('seller_id', user.id);
          
        if (error) throw error;
        
        const formattedInspections = data?.map(item => ({
          id: item.id,
          vehicleId: item.id,
          vehicleName: item.title,
          status: item.approval_status === 'approved' ? 'completed' : 'pending',
          requestDate: item.created_at,
          completionDate: item.approved_at || null
        })) || [];
        
        setInspectionRequests(formattedInspections);
      } catch (error) {
        console.error('Error fetching inspections:', error);
      }
    };
    
    fetchWatchlist();
    fetchInspections();
  }, [user?.id]);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
  };
  
  const handleDeleteSavedSearch = (searchId: string) => {
    setSavedSearches(prev => prev.filter(search => search.id !== searchId));
    
    toast({
      title: "Search deleted",
      description: "Your saved search has been removed."
    });
  };
  
  const handleRemoveFromWatchlist = (itemId: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== itemId));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your watchlist."
    });
  };
  
  return (
    <Layout>
      <div className="container py-10">
        <div className="space-y-8">
          {/* Profile Header */}
          <ProfileHeader 
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
          />

          {/* Tabs Navigation */}
          <Tabs defaultValue="overview">
            <TabsList className="w-full border-b rounded-none justify-start h-auto p-0 bg-transparent mb-4">
              <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
                Overview
              </TabsTrigger>
              <TabsTrigger value="favorites" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
                Favorites
              </TabsTrigger>
              <TabsTrigger value="inspections" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
                Inspections
              </TabsTrigger>
              <TabsTrigger value="searches" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
                Saved Searches
              </TabsTrigger>
              <TabsTrigger value="transactions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
                Transactions
              </TabsTrigger>
              <TabsTrigger value="purchases" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
                Purchases
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium">
                Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Tab Contents */}
            <TabsContent value="overview">
              <ProfileOverview 
                isEditingProfile={isEditingProfile}
                setIsEditingProfile={setIsEditingProfile}
                handleSaveProfile={handleSaveProfile}
              />
            </TabsContent>
            
            <TabsContent value="favorites">
              <FavoritesTab 
                watchlist={watchlist} 
                handleRemoveFromWatchlist={handleRemoveFromWatchlist} 
              />
            </TabsContent>
            
            <TabsContent value="inspections">
              <InspectionsTab inspectionRequests={inspectionRequests} />
            </TabsContent>
            
            <TabsContent value="searches">
              <SavedSearchesTab 
                savedSearches={savedSearches} 
                handleDeleteSavedSearch={handleDeleteSavedSearch} 
              />
            </TabsContent>
            
            <TabsContent value="transactions">
              <TransactionsTab />
            </TabsContent>
            
            <TabsContent value="purchases">
              <PurchasesTab />
            </TabsContent>
            
            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
