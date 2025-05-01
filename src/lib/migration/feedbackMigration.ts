
import { sellers } from '@/data/sellers';
import { LogCallback, ProgressCallback, handleMigrationError } from './utils/migrationUtils';

export const migrateFeedback = async (addLog: LogCallback, setProgress: ProgressCallback): Promise<boolean> => {
  addLog('Creating sample feedback...');
  
  try {
    const sellerIds = sellers.map(seller => seller.id);
    
    // Simulate creating feedback entries
    addLog(`Simulating feedback for seller ${sellerIds[0]}`);
    addLog(`Simulating feedback for seller ${sellerIds[0]}`);
    addLog(`Simulating feedback for seller ${sellerIds[1]}`);
    
    addLog('Sample feedback creation simulated.');
    setProgress(100);
    return true;
  } catch (error) {
    handleMigrationError(error, 'Feedback migration failed', addLog);
    return false;
  }
};
