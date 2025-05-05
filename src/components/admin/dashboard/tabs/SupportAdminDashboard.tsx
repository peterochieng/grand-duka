import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, LifeBuoy, CheckSquare, ShieldCheck } from 'lucide-react';
import { useSupportAdmin } from '@/hooks/admin/useSupportAdmin';
import { SupportAdminView } from '@/types/supportAdminTypes';
import { ProductApprovalManager } from './products/ProductApprovalManager';
import { KycManagerTab } from './support-admin/KycManagerTab';
import { useAuth } from '@/hooks/useAuth';
import { SupportAdminPermissions } from './support/SupportAdminPermissions';
import { SupportFilters } from './support-admin/SupportFilters';
import { SupportViewTabs } from './support-admin/SupportViewTabs';
import { SupportBacklogTab } from '@/hooks/support/SupportBacklogTab';
import Layout from '@/components/Layout';
import { Footer } from '@/components/Footer';
import { SupportAdminStats } from './support/SupportAdminStats';

type SupportAdminTab = 'tickets' | 'product-approvals' | 'kyc-management';

export const SupportAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<SupportAdminTab>('tickets');

  const {
    view,
    setView,
    tickets,
    loading,
    error,
    assignTicketToSelf,
    addResponseToTicket
  } = useSupportAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ticket.userName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (statusFilter !== "all" && ticket.status !== statusFilter) {
      return false;
    }
    if (priorityFilter !== "all" && ticket.priority !== priorityFilter) {
      return false;
    }
    return true;
  });

  // Ticket counts by status
  const openCount = tickets.filter(t => t.status === 'open').length;
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  const handleViewChange = (newView: SupportAdminView) => {
    setView(newView);
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super-admin';

  // Loading and error for tickets tab only (preserved grouping)
  if (activeTab === 'tickets' && loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold text-center mb-4">Support Admin Dashboard</h1>
          <div className="border rounded-md p-4 space-y-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading support tickets...</p>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }

  if (activeTab === 'tickets' && error) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold text-center mb-4">Support Admin Dashboard</h1>
          <div className="border rounded-md p-4 space-y-6">
            <div className="text-center py-8 text-red-500">
              <p>Error: {error.message}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold">Support Admin Dashboard</h1>
          <div className="flex flex-wrap gap-2 justify-center mt-4 md:mt-0">
            <Button 
              variant={activeTab === 'tickets' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('tickets')}
            >
              <LifeBuoy className="mr-2 h-4 w-4" />
              Support Tickets
            </Button>
            <Button 
              variant={activeTab === 'product-approvals' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('product-approvals')}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Product Approvals
            </Button>
            <Button 
              variant={activeTab === 'kyc-management' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('kyc-management')}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              KYC Management
            </Button>
          </div>
          {activeTab === 'tickets' && <SupportBacklogTab />}
        </div>

        {/* Super Admin Additional Controls */}
        {isSuperAdmin && (
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <div className="bg-white shadow rounded-lg p-6">
              <SupportAdminPermissions />
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <SupportAdminStats />
            </div>
          </div>
        )}

        {/* Inner Content Area */}
        {activeTab === 'tickets' && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <SupportViewTabs
              view={view}
              handleViewChange={handleViewChange}
              filteredTickets={filteredTickets}
              tickets={tickets}
              assignTicketToSelf={assignTicketToSelf}
              addResponseToTicket={addResponseToTicket}
            />
            <div className="mt-6">
              <SupportFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
              />
            </div>
          </div>
        )}

        {activeTab === 'product-approvals' && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <ProductApprovalManager />
          </div>
        )}

        {activeTab === 'kyc-management' && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <KycManagerTab />
          </div>
        )}

        <Footer />
      </div>
    </Layout>
  );
};