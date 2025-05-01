
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { renderYesNo } from './carUtils';

interface GeneralInfoProps {
  generalInfo: {
    make: string;
    model: string;
    trim: string;
    year: number;
    mileage: number;
    location: string;
    specs: string;
    firstOwner: boolean;
    serviceHistory: string;
    warranty: boolean;
    warrantyDuration: string;
    warrantyMileage: string;
  };
}

export const GeneralInformation = ({ generalInfo }: GeneralInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-1/2">Make & Model</TableCell>
              <TableCell>{generalInfo.make} {generalInfo.model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Trim/Variant</TableCell>
              <TableCell>{generalInfo.trim}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Model Year</TableCell>
              <TableCell>{generalInfo.year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mileage</TableCell>
              <TableCell>{generalInfo.mileage.toLocaleString()} KM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Location</TableCell>
              <TableCell>{generalInfo.location}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-1/2">Specifications</TableCell>
              <TableCell>{generalInfo.specs}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">First Owner</TableCell>
              <TableCell>{renderYesNo(generalInfo.firstOwner)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service History</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                  {generalInfo.serviceHistory}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Warranty</TableCell>
              <TableCell>{renderYesNo(generalInfo.warranty)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Warranty Coverage</TableCell>
              <TableCell>{generalInfo.warrantyDuration} / {generalInfo.warrantyMileage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
