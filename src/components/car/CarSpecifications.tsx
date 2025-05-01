
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface CarSpecificationsProps {
  specifications: {
    bodyType: string;
    doors: number;
    seats: number;
    keys: number;
    steeringSide: string;
    transmission: string;
    fuelType: string;
    engineCapacity: number;
    horsepower: number;
    cylinders: number;
    drivetrain: string;
    exteriorColor: string;
    interiorColor: string;
    targetMarket: string;
    vinNumber: string;
  };
}

export const CarSpecifications = ({ specifications }: CarSpecificationsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-1/2">Body Type</TableCell>
              <TableCell>{specifications.bodyType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Doors/Seats</TableCell>
              <TableCell>{specifications.doors} doors / {specifications.seats} seats</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Keys</TableCell>
              <TableCell>{specifications.keys}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Steering</TableCell>
              <TableCell>{specifications.steeringSide}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Transmission</TableCell>
              <TableCell>{specifications.transmission}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Fuel Type</TableCell>
              <TableCell>{specifications.fuelType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">VIN Number</TableCell>
              <TableCell className="font-mono text-xs">{specifications.vinNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-1/2">Engine Capacity</TableCell>
              <TableCell>{specifications.engineCapacity} cc</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Horsepower</TableCell>
              <TableCell>{specifications.horsepower} HP</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Cylinders</TableCell>
              <TableCell>{specifications.cylinders}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Drivetrain</TableCell>
              <TableCell>{specifications.drivetrain}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Exterior Color</TableCell>
              <TableCell>{specifications.exteriorColor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Interior Color</TableCell>
              <TableCell>{specifications.interiorColor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Target Market</TableCell>
              <TableCell>{specifications.targetMarket}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
