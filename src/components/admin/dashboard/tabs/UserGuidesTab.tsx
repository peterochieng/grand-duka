
import { UserGuidesTabContent } from "./user-guides/UserGuidesTabContent";

export const UserGuidesTab = () => {
  return (
    <div className="border rounded-md p-4 space-y-6">
      <h3 className="text-lg font-semibold mb-2">User Guides</h3>
      <p className="text-muted-foreground mb-4">Comprehensive guides to help you navigate and use the GrandDuka admin system effectively.</p>
      
      <UserGuidesTabContent />
    </div>
  );
};
