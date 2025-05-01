
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Migrate from './pages/Migrate';
import Retail from './pages/Retail';
import Wholesale from './pages/Wholesale';
import RetailShopDashboard from './pages/RetailShopDashboard';
import WholesaleShopDashboard from './pages/WholesaleShopDashboard';
import { Toaster } from '@/components/ui/toaster';
import SellerDashboard from './components/seller/SellerDashboard';
import { ToastProvider } from './components/ToastProvider';
import KycVerification from './pages/KycVerification';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import { SupportAdminDashboard } from './components/admin/dashboard/tabs/SupportAdminDashboard';
import { DeveloperTasksTab } from './components/admin/dashboard/tabs/dev/DeveloperTasksTab';
import AdminSignIn from './pages/AdminSignIn';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/kyc-verification" element={<KycVerification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* New Admin Routes */}
          <Route path="/admin/dashboard/super" element={<SuperAdminDashboard />} />
          <Route path="/admin/dashboard/support" element={<SupportAdminDashboard />} />
          <Route path="/admin/dashboard/dev" element={<DeveloperTasksTab />} />
          <Route path="/migrate" element={<Migrate />} />
          <Route path="/retail" element={<Retail />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/wholesale/shop-dashboard" element={<WholesaleShopDashboard />} />
          
          {/* Seller routes */}
          <Route path="/retail/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/retail/shop-dashboard" element={<RetailShopDashboard />} />
        </Routes>
        <Toaster />
      </Router>
    </ToastProvider>
  );
}

export default App;
