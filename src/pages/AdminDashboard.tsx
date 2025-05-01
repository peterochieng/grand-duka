
import React, { useState } from 'react';
import AdminDashboardComponent from '@/components/admin/AdminDashboard';
import { AdminRole } from '@/lib/types/userTypes';

const AdminDashboard = () => {
  const [currentRole, setCurrentRole] = useState<AdminRole | null>('super-admin');
  
  const handleLogout = () => {
    console.log("Admin logged out");
    // Add logout logic here
  };
  
  return (
    <AdminDashboardComponent 
      currentRole={currentRole} 
      onLogout={handleLogout} 
    />
  );
};

export default AdminDashboard;
