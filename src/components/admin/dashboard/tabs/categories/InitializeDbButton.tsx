import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatabaseIcon, Loader2 } from "lucide-react";
import { initializeDefaultCategories } from "@/services/category";
import { toast } from "sonner";

export const InitializeDbButton = () => {
  const [initializing, setInitializing] = useState(false);

  const handleInitialize = async () => {
    try {
      setInitializing(true);
      
      // Call the service to initialize categories
      const success = await initializeDefaultCategories();
      
      if (success) {
        toast.success("Database initialized with default categories");
        // Reload the page to show new categories
        window.location.reload();
      } else {
        toast.error("Failed to initialize database");
      }
    } catch (error) {
      console.error("Error initializing database:", error);
      toast.error("An error occurred while initializing the database");
    } finally {
      setInitializing(false);
    }
  };

  return (
    <Button 
      variant="default" 
      onClick={handleInitialize}
      disabled={initializing}
    >
      {initializing ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <DatabaseIcon className="mr-2 h-4 w-4" />
      )}
      Initialize Database
    </Button>
  );
};
