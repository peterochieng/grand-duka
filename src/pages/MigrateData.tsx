
import React, { useState } from 'react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import MigrationCard from '@/components/migrate/MigrationCard';
import WarningSection from '@/components/migrate/WarningSection';
import MigrationProgress from '@/components/migrate/MigrationProgress';
import MigrationLog from '@/components/migrate/MigrationLog';
import { 
  migrateSellers, 
  migrateShops, 
  migrateProducts, 
  migrateCategories, 
  migrateFeedback 
} from '@/lib/migration/migrationService';
import { products } from '@/lib/products';
import { sellers } from '@/data/sellers';
import { enhancedShops } from '@/data/enhancedShops';
import { categories } from '@/lib/categories';

const MigrateData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog(prev => [...prev, message]);
  };

  const migrateData = async () => {
    setIsLoading(true);
    setProgress(0);
    setLog([]);

    try {
      // Migrate data in sequence
      const sellersMigrated = await migrateSellers(addLog, setProgress);
      if (!sellersMigrated) throw new Error("Sellers migration failed");
      
      const shopsMigrated = await migrateShops(addLog, setProgress);
      if (!shopsMigrated) throw new Error("Shops migration failed");
      
      const productsMigrated = await migrateProducts(addLog, setProgress);
      if (!productsMigrated) throw new Error("Products migration failed");
      
      const categoriesMigrated = await migrateCategories(addLog, setProgress);
      if (!categoriesMigrated) throw new Error("Categories migration failed");
      
      const feedbackMigrated = await migrateFeedback(addLog, setProgress);
      if (!feedbackMigrated) throw new Error("Feedback migration failed");
      
      addLog('Migration completed successfully!');
      toast.success('Data migration completed successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      addLog(`Migration failed: ${errorMessage}`);
      toast.error(`Migration failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <MigrationCard
          title="Data Migration Utility"
          description="This utility will migrate your mock data to Supabase for production use. Only use this once to initialize your database."
          isLoading={isLoading}
          onMigrate={migrateData}
        >
          <WarningSection 
            products={products.length}
            sellers={sellers.length}
            shops={enhancedShops.length}
            categories={categories.length}
          />
          
          <MigrationProgress progress={progress} />
          <MigrationLog log={log} />
        </MigrationCard>
      </div>
    </Layout>
  );
};

export default MigrateData;
