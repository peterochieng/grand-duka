
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserPlus, MoreHorizontal, Users, User, Shield, Key, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'invited' | 'suspended';
  lastActive: string;
}

const TeamManagement = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'TM-001',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastActive: '2 hours ago'
    },
    {
      id: 'TM-002',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Inventory Manager',
      status: 'active',
      lastActive: '5 days ago'
    },
    {
      id: 'TM-003',
      name: 'David Lee',
      email: 'david@example.com',
      role: 'Sales Agent',
      status: 'invited',
      lastActive: 'Never'
    }
  ]);
  
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  
  const handleInviteMember = () => {
    if (!newMemberEmail || !newMemberRole) {
      toast({
        title: "Missing information",
        description: "Please provide both email and role for the new team member",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send an invitation to the email
    const newMember: TeamMember = {
      id: `TM-00${teamMembers.length + 1}`,
      name: `Invited User (${newMemberEmail})`,
      email: newMemberEmail,
      role: newMemberRole,
      status: 'invited',
      lastActive: 'Never'
    };
    
    setTeamMembers([...teamMembers, newMember]);
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newMemberEmail}`,
    });
    
    setNewMemberEmail('');
    setNewMemberRole('');
    setIsAddingMember(false);
  };
  
  const getStatusBadge = (status: 'active' | 'invited' | 'suspended') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'invited':
        return <Badge className="bg-blue-500">Invited</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500">Suspended</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-1">Team Management</h2>
          <p className="text-muted-foreground text-sm">
            Add and manage team members who can access your trading account
          </p>
        </div>
        <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation for a team member to join your trading account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="colleague@example.com" 
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Inventory Manager">Inventory Manager</SelectItem>
                    <SelectItem value="Sales Agent">Sales Agent</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingMember(false)}>Cancel</Button>
              <Button onClick={handleInviteMember}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Current Team Members
          </CardTitle>
          <CardDescription>
            {teamMembers.length} team members have access to this account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-xs text-muted-foreground">{member.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {member.role === 'Admin' ? (
                        <Shield className="h-3 w-3 mr-1 inline" />
                      ) : null}
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>{member.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          Remove Access
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Access Link</CardTitle>
          <CardDescription>
            Share this link with team members to grant access to your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input readOnly value="https://grandduka.com/wholesale/join/trader-team/ABC123" />
            <Button 
              onClick={() => {
                navigator.clipboard.writeText("https://grandduka.com/wholesale/join/trader-team/ABC123");
                toast({
                  title: "Link copied!",
                  description: "Team access link has been copied to clipboard",
                });
              }}
            >
              Copy
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This link expires in 7 days. Team members will need to create an account or sign in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
