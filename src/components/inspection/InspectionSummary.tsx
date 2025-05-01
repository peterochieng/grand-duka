
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { getScoreColor } from './inspectionUtils';
import { InspectionSection } from './types';

interface InspectionSummaryProps {
  inspectionData: InspectionSection[];
  overallScore: number;
  getSectionIcon: (sectionName: string) => JSX.Element;
}

export const InspectionSummary = ({
  inspectionData,
  overallScore,
  getSectionIcon
}: InspectionSummaryProps) => {
  // Filter sections that have scores
  const scoredSections = inspectionData.filter(
    section => typeof section.overallScore === 'number'
  );

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
      hasFailed: failedCount > 0,
      hasFair: fairCount > 0,
      totalItems
    };
  };

  const ratingPercentages = calculateRatingPercentages();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium mb-4 flex items-center text-left">
        <FileText className="mr-2 h-5 w-5" /> Inspection Summary
      </h3>
      
      {/* Overall Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-36 h-36">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-bold text-amber-500`}>{overallScore}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f59e0b" 
              strokeWidth="3"
              strokeDasharray={`${overallScore}, 100`}
            />
          </svg>
        </div>
      </div>
      
      {/* Rating Distribution */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium mb-2 text-left">Rating Distribution</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" /> Good
            </span>
            <span className="text-sm">{ratingPercentages.good}%</span>
          </div>
          <Progress 
            value={ratingPercentages.good} 
            className="h-2" 
          />
        </div>
        
        {ratingPercentages.hasFair && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" /> Fair
              </span>
              <span className="text-sm">{ratingPercentages.fair}%</span>
            </div>
            <Progress 
              value={ratingPercentages.fair} 
              className="h-2" 
            />
          </div>
        )}
      </div>
      
      {/* Section Scores */}
      <div>
        <h4 className="text-sm font-medium mb-4 text-left">Section Scores</h4>
        
        <div className="grid grid-cols-2 gap-4">
          {scoredSections.map((section) => (
            <div key={section.name} className="space-y-1">
              <div className="flex items-start mb-1">
                <div className="flex-grow truncate">
                  <span className="text-sm font-medium flex items-center">
                    {getSectionIcon(section.name)}
                    <span className="ml-1 truncate">{section.name}</span>
                  </span>
                </div>
                <span className={`text-sm font-medium ${getScoreColor(section.overallScore || 0)}`}>
                  {section.overallScore}
                </span>
              </div>
              <Progress 
                value={section.overallScore} 
                className="h-2" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
