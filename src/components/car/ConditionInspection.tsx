
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { renderYesNo, renderScore } from './carUtils';

interface ConditionInspectionProps {
  condition: {
    accidentHistory: boolean;
    inspectionReport: boolean;
    engineScore: number;
    roadTestScore: number;
    electronicsScore: number;
    tiresAndBrakesScore: number;
    bodyConditionScore: number;
  };
}

export const ConditionInspection = ({ condition }: ConditionInspectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-1/2">Accident History</TableCell>
                <TableCell>{renderYesNo(condition.accidentHistory)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Inspection Report</TableCell>
                <TableCell>{renderYesNo(condition.inspectionReport)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      
      <h4 className="text-base font-medium mt-4 mb-3">Inspection Scores</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Engine & Transmission</span>
            </div>
            {renderScore(condition.engineScore)}
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Road Test</span>
            </div>
            {renderScore(condition.roadTestScore)}
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Electronics</span>
            </div>
            {renderScore(condition.electronicsScore)}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Tires & Brakes</span>
            </div>
            {renderScore(condition.tiresAndBrakesScore)}
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Body Condition</span>
            </div>
            {renderScore(condition.bodyConditionScore)}
          </div>
        </div>
      </div>
    </div>
  );
};
