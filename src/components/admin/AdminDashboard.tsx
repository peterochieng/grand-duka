import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "@/components/ui/tabs";
import { AdminRole } from "@/lib/types/userTypes";
import { AdminHeaderBar } from "./dashboard/AdminHeaderBar";
import { AdminStats } from "./dashboard/AdminStats";
import { AdminNavigation } from "./dashboard/AdminNavigation";
import { AdminTabContent } from "./dashboard/AdminTabManager";
import { useRoleUtils } from "./dashboard/hooks/useRoleUtils";
import { getRoleTabs } from "./helpers/roleHelpers";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminDashboardProps {
  currentRole: AdminRole;
  onLogout: () => void;
}

const AdminDashboard = ({ currentRole }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { getRoleIcon, getRoleTitle } = useRoleUtils(currentRole);
  const [activeTab, setActiveTab] = useState("");
  const [navCollapsed, setNavCollapsed] = useState(false);

  // Determine accessible tabs based on role
  const accessibleTabs = getRoleTabs(currentRole);
  const defaultTab =
    currentRole === "super-admin"
      ? "categories"
      : currentRole === "support-admin"
      ? "support"
      : accessibleTabs[0] || "dashboard";

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    // Verify admin authentication from localStorage
    const adminAuth = localStorage.getItem("adminAuthenticated");
    const storedRole = localStorage.getItem("adminRole");
    if (adminAuth !== "true" || !storedRole) {
      navigate("/admin");
      return;
    }
    setIsAdmin(true);
  }, [navigate]);

  // Implement the logout function here
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminRole");
      toast.success("Logged out successfully");
      navigate("/admin/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed");
    }
  };

  if (!isAdmin) {
    return null; // Avoid rendering while checking authentication
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">GrandDuka Admin</h1>
          <button
            className="text-sm text-red-500 hover:text-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin Header Bar */}
      <AdminHeaderBar
        currentRole={currentRole}
        getRoleIcon={getRoleIcon}
        getRoleTitle={getRoleTitle}
        onLogout={handleLogout}
      />

      {/* Main Content Section */}
      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">{getRoleTitle()} Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            {currentRole === "super-admin"
              ? "Manage all aspects of your GrandDuka marketplace"
              : `Manage ${currentRole?.replace("-", " ")} functions of your GrandDuka marketplace`}
          </p>
        </div>

        <AdminStats currentRole={currentRole} />

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)}>
            <AdminNavigation
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
              collapsed={navCollapsed}
              currentRole={currentRole}
            />
            <AdminTabContent
              accessibleTabs={accessibleTabs}
              currentRole={currentRole}
            />
          </Tabs>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-white shadow py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GrandDuka. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;