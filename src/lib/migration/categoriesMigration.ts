
import { supabase } from '@/integrations/supabase/client';
import { categories } from '@/lib/categories';
import { LogCallback, ProgressCallback, TABLES, handleMigrationError } from './utils/migrationUtils';

export const migrateCategories = async (addLog: LogCallback, setProgress: ProgressCallback): Promise<boolean> => {
  addLog('Starting migration of categories...');
  
  try {
    for (const category of categories) {
      const { error: categoryError } = await supabase.from(TABLES.categories).upsert({
        id: category.id,
        name: category.name,
        icon: category.icon,
        description: null,
        parent_id: null,
        is_published: true,
        restricted: false,
        trading_type: 'both',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      if (categoryError) {
        addLog(`Error migrating category ${category.name}: ${categoryError.message}`);
      } else {
        addLog(`Migrated category: ${category.name}`);
      }

      // Migrate subcategories if they exist
      if (category.subcategories && category.subcategories.length > 0) {
        for (const subcategoryName of category.subcategories) {
          const { error: subcategoryError } = await supabase.from(TABLES.subcategories).insert({
            name: subcategoryName,
            category_id: category.id,
            is_published: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
          if (subcategoryError) {
            addLog(`Error migrating subcategory ${subcategoryName}: ${subcategoryError.message}`);
          } else {
            addLog(`Migrated subcategory: ${subcategoryName}`);
          }
        }
      }
    }
    
    addLog('Categories migration completed.');
    setProgress(85);
    return true;
  } catch (error) {
    handleMigrationError(error, 'Categories migration failed', addLog);
    return false;
  }
};
