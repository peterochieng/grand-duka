
import { Check, X } from 'lucide-react';

export const renderYesNo = (value: boolean) => (
  value ? 
    <span className="inline-flex items-center text-green-600 dark:text-green-500">
      <Check className="w-4 h-4 mr-1" /> Yes
    </span> : 
    <span className="inline-flex items-center text-red-600 dark:text-red-500">
      <X className="w-4 h-4 mr-1" /> No
    </span>
);

export const renderScore = (score: number) => {
  let color = "bg-red-500";
  if (score >= 7 && score < 9) color = "bg-amber-500";
  if (score >= 9) color = "bg-green-500";
  
  return (
    <div className="flex items-center">
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full mr-2">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${score * 10}%` }}></div>
      </div>
      <span className="text-sm font-medium">{score}/10</span>
    </div>
  );
};
