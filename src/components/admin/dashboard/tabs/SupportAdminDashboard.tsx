
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, LifeBuoy, CheckSquare, ShieldCheck } from 'lucide-react';
import { useSupportAdmin } from '@/hooks/admin/useSupportAdmin';
import { SupportAdminView } from '@/types/supportAdminTypes';
import { ProductApprovalManager } from './products/ProductApprovalManager';
import { KycManagerTab } from './support-admin/KycManagerTab';
import { useAuth } from '@/hooks/useAuth';
import { SupportAdminPermissions } from './support/SupportAdminPermissions';
import { SupportAdminStats } from './support/SupportAdminStats';
import { SupportStats } from './support-admin/SupportStats';
import { SupportFilters } from './support-admin/SupportFilters';
import { SupportViewTabs } from './support-admin/SupportViewTabs';
import { SupportBacklogTab } from '@/hooks/support/SupportBacklogTab';

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
  
  // Apply filters to tickets
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
  
  // Count tickets by status
  const openCount = tickets.filter(t => t.status === 'open').length;
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
  
  const handleViewChange = (view: SupportAdminView) => {
    setView(view);
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super-admin';

  if (loading && activeTab === 'tickets') {
    return (
      <div className="border rounded-md p-4 space-y-6">
        <h3 className="text-lg font-semibold mb-2">Support Admin Dashboard</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading support tickets...</p>
        </div>
      </div>
    );
  }
  
  if (error && activeTab === 'tickets') {
    return (
      <div className="border rounded-md p-4 space-y-6">
        <h3 className="text-lg font-semibold mb-2">Support Admin Dashboard</h3>
        <div className="text-center py-8 text-red-500">
          <p>Error: {error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Support Admin Dashboard</h3>
        
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'tickets' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('tickets')}
          >
            <LifeBuoy className="h-4 w-4 mr-2" />
            Support Tickets
          </Button>
          <Button 
            variant={activeTab === 'product-approvals' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('product-approvals')}
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            Product Approvals
          </Button>
          <Button 
            variant={activeTab === 'kyc-management' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('kyc-management')}
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            KYC Management
          </Button>
        </div>

        {activeTab === 'tickets' && <SupportBacklogTab />}
      {activeTab === 'product-approvals' && <ProductApprovalManager />}
      {activeTab === 'kyc-management' && <KycManagerTab />}
      </div>
      
      {isSuperAdmin && (
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <SupportAdminPermissions />
          <SupportAdminStats />
        </div>
      )}
      
      {activeTab === 'tickets' && (
        <>
          <SupportStats
            openCount={openCount}
            inProgressCount={inProgressCount}
            resolvedCount={resolvedCount}
          />
          
          <SupportViewTabs
            view={view}
            handleViewChange={handleViewChange}
            filteredTickets={filteredTickets}
            tickets={tickets}
            assignTicketToSelf={assignTicketToSelf}
            addResponseToTicket={addResponseToTicket}
          />
          
          <SupportFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        </>
      )}
      
      {activeTab === 'product-approvals' && (
        <ProductApprovalManager />
      )}
      
      {activeTab === 'kyc-management' && (
        <KycManagerTab />
      )}
    </div>
  );
};
