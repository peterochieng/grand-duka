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

interface AdminDashboardProps {
  currentRole: AdminRole | null;
  onLogout: () => void;
}

export const AdminDashboard = ({
  currentRole,
  onLogout,
}: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { getRoleIcon, getRoleTitle } = useRoleUtils(currentRole);
  const [activeTab, setActiveTab] = useState("");
  const [navCollapsed, setNavCollapsed] = useState(false);

  // Determine accessible tabs based on role
  const accessibleTabs = getRoleTabs(currentRole);
  // Set default tab – for super-admin, show categories by default; for support-admin, default to 'support'; otherwise use the first tab or 'dashboard'
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

  const handleTabChange = (tab: string) => {
    console.log("Clicked tab:", tab);
    console.log(activeTab);
    setActiveTab(tab);
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
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin Header Bar (existing navigation header) */}
      <AdminHeaderBar
        currentRole={currentRole}
        getRoleIcon={getRoleIcon}
        getRoleTitle={getRoleTitle}
        onLogout={onLogout}
      />

      {/* Main Content Section */}
      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">{getRoleTitle()} Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            {currentRole === "super-admin"
              ? "Manage all aspects of your GrandDuka marketplace"
              : `Manage ${currentRole?.replace(
                  "-",
                  " "
                )} functions of your GrandDuka marketplace`}
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
