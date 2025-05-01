
import { supabase } from '@/integrations/supabase/client';

export type LogCallback = (message: string) => void;
export type ProgressCallback = (progress: number) => void;

// Type to define what tables are available in Supabase
export const TABLES = {
  categories: 'categories',
  subcategories: 'subcategories'
} as const;

export type TableName = typeof TABLES[keyof typeof TABLES];

// Helper function to safely log errors
export const handleMigrationError = (error: unknown, message: string, addLog: LogCallback): string => {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  const fullMessage = `${message}: ${errorMessage}`;
  addLog(fullMessage);
  return fullMessage;
};
