import { Filter, Info } from 'lucide-react';
import { InspectionSection, InspectionStatus } from './types';

interface InspectionPointsSummaryProps {
  inspectionData: InspectionSection[];
}

export const InspectionPointsSummary = ({ inspectionData }: InspectionPointsSummaryProps) => {
  // Calculate rating percentages across all items
  const calculateRatingPercentages = () => {
    let goodCount = 0;
    let fairCount = 0;
    let poorCount = 0;
    let failedCount = 0;
    let totalItems = 0;

    inspectionData.forEach(section => {
      section.items.forEach(item => {
        if (item.status) {
          totalItems++;
          switch (item.status) {
            case 'GOOD':
              goodCount++;
              break;
            case 'FAIR':
              fairCount++;
              break;
            case 'POOR':
              poorCount++;
              break;
            case 'FAILED':
              failedCount++;
              break;
          }
        }
      });
    });

    return {
      good: totalItems > 0 ? Math.round((goodCount / totalItems) * 100) : 0,
      fair: totalItems > 0 ? Math.round((fairCount / totalItems) * 100) : 0,
      poor: totalItems > 0 ? Math.round((poorCount / totalItems) * 100) : 0,
      failed: totalItems > 0 ? Math.round((failedCount / totalItems) * 100) : 0,
      hasPoor: poorCount > 0,
      hasFair: fairCount > 0,
      hasFailed: failedCount > 0,
      totalItems
    };
  };

  const ratingPercentages = calculateRatingPercentages();

  const renderProgressBar = (percentage: number, color: string) => {
    return (
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6 text-left">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Inspection Points Summary</h3>
      
      {ratingPercentages.good > 0 && (
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="font-medium text-gray-700 w-16">Good</div>
          <div className="flex-grow">
            {renderProgressBar(ratingPercentages.good, 'bg-blue-600')}
          </div>
          <div className="text-gray-500 w-16 text-right">({ratingPercentages.good}%)</div>
        </div>
      )}
      
      {ratingPercentages.hasFair && (
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-amber-500" />
          </div>
          <div className="font-medium text-gray-700 w-16">Fair</div>
          <div className="flex-grow">
            {renderProgressBar(ratingPercentages.fair, 'bg-amber-500')}
          </div>
          <div className="text-gray-500 w-16 text-right">({ratingPercentages.fair}%)</div>
        </div>
      )}
      
      {ratingPercentages.hasPoor && (
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-orange-500" />
          </div>
          <div className="font-medium text-gray-700 w-16">Poor</div>
          <div className="flex-grow">
            {renderProgressBar(ratingPercentages.poor, 'bg-orange-500')}
          </div>
          <div className="text-gray-500 w-16 text-right">({ratingPercentages.poor}%)</div>
        </div>
      )}
      
      {ratingPercentages.hasFailed && (
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-red-600" />
          </div>
          <div className="font-medium text-gray-700 w-16">Failed</div>
          <div className="flex-grow">
            {renderProgressBar(ratingPercentages.failed, 'bg-red-600')}
          </div>
          <div className="text-gray-500 w-16 text-right">({ratingPercentages.failed}%)</div>
        </div>
      )}
    </div>
  );
};
