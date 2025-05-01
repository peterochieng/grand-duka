
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { getProfileName } from '@/hooks/admin/statsHelpers';

interface InspectionReport {
  id: string;
  vehicle: string;
  inspector: string;
  date: string;
  status: 'Pending' | 'Completed' | 'Rejected';
}

export const InspectionsTab = () => {
  const [inspections, setInspections] = useState<InspectionReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInspectionReports = async () => {
      setLoading(true);
      try {
        // Use product_details table to find inspection-related data
        const { data: inspectionDetails, error: inspectionError } = await supabase
          .from('product_details')
          .select('*, products(title, seller_id)')
          .eq('detail_type', 'inspection');
          
        if (inspectionError) {
          console.error('Error fetching inspection details:', inspectionError);
          throw new Error(inspectionError.message);
        }
        
        if (!inspectionDetails || inspectionDetails.length === 0) {
          setInspections([]);
          return;
        }
        
        // Get profiles to match inspector names
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*');
          
        // Map the raw data to our InspectionReport format
        const formattedInspections = inspectionDetails.map((item: any, index: number) => {
          // Try to get inspector name from profiles
          const inspectorId = item.details?.inspector_id;
          const inspector = inspectorId && profiles 
            ? profiles.find(p => p.id === inspectorId) 
            : null;
          
          const inspectorName = inspector 
            ? getProfileName(inspector) 
            : 'Unknown Inspector';
          
          return {
            id: `IR-${9920 + index + 1}`,
            vehicle: item.products?.title || 'Unknown Vehicle',
            inspector: inspectorName,
            date: item.created_at 
              ? new Date(item.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              : 'Unknown Date',
            status: (item.details?.status as any) || 'Pending'
          } as InspectionReport;
        });
        
        setInspections(formattedInspections);
      } catch (err) {
        console.error('Error in fetchInspectionReports:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch inspection reports'));
        
        // If we can't get real data, return empty array
        setInspections([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInspectionReports();
  }, []);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Inspection Reports</h3>
      <p className="text-muted-foreground mb-4">Review and approve vehicle inspection reports.</p>
      
      {error && (
        <div className="text-center py-4 text-red-500">
          <p>Error: {error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-2">Retry</Button>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">Loading inspection reports...</div>
      ) : inspections.length === 0 ? (
        <div className="text-center py-4">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <AlertCircle className="h-10 w-10 mb-2" />
            <p>No inspection reports found in the system.</p>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Inspector</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inspections.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.vehicle}</TableCell>
                <TableCell>{report.inspector}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    {report.status === 'Pending' ? 'Approve' : 'View Report'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
