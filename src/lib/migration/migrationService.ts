
// This is the main entry point for all migration services
// It exports all the migration functions

import { migrateSellers } from './sellersMigration';
import { migrateShops } from './shopsMigration';
import { migrateProducts } from './productsMigration';
import { migrateCategories } from './categoriesMigration';
import { migrateFeedback } from './feedbackMigration';

export {
  migrateSellers,
  migrateShops,
  migrateProducts,
  migrateCategories,
  migrateFeedback
};
