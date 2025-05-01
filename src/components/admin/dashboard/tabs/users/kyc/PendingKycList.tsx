
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { KycStatusBadge } from "../KycStatusBadge";
import { UserRoleBadge } from "../UserRoleBadge";
import { useKycManagement } from "@/hooks/admin/useKycManagement";
import { UserSearch } from "./UserSearch";
import { KycStatus } from "@/lib/types/userTypes";

export const PendingKycList = () => {
  const { 
    pendingUsers = [], 
    approveKyc = () => Promise.resolve(), 
    rejectKyc = () => Promise.resolve(),
    loading = false
  } = useKycManagement();
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = pendingUsers.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (userId: string) => {
    approveKyc(userId);
  };

  const handleReject = (userId: string) => {
    rejectKyc(userId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Pending KYC Verifications</h3>
        <UserSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-6">
          <p>Loading pending verifications...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center p-6 border rounded-md bg-muted/30">
          <p className="text-muted-foreground">No pending KYC verifications found.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UserRoleBadge role={typeof user.role === 'string' ? user.role : 'buyer'} />
                  </TableCell>
                  <TableCell>
                    <KycStatusBadge status={(user.kyc_status || 'not_started') as KycStatus} />
                  </TableCell>
                  <TableCell>{new Date(user.updated_at || '').toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(user.id)}
                        disabled={loading}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleReject(user.id)}
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
