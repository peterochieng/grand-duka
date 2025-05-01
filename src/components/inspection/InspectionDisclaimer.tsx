
import { AlertTriangle } from 'lucide-react';

export const InspectionDisclaimer = () => {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800 dark:text-amber-300">Inspection Disclaimer</h4>
          <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
            This inspection report is provided for informational purposes only. While we strive for accuracy, 
            we recommend an independent inspection before purchase. The seller is not liable for any discrepancies 
            found after sale.
          </p>
        </div>
      </div>
    </div>
  );
};
