import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Migrate from './pages/Migrate';
import Retail from './pages/Retail';
import Wholesale from './pages/Wholesale';
import WholesaleShopDashboard from './pages/WholesaleShopDashboard';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from './components/ToastProvider';
import KycVerification from './pages/KycVerification';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import { SupportAdminDashboard } from './components/admin/dashboard/tabs/SupportAdminDashboard';
import { DeveloperTasksTab } from './components/admin/dashboard/tabs/dev/DeveloperTasksTab';
import AdminSignIn from './pages/AdminSignIn';
import SellerDashboard from './components/seller/SellerDashboard';
import RetailShopDashboard from './pages/RetailShopDashboard';
import EditListing from './components/seller/listing/EditListing';
import { AuthGuard } from '@/components/auth/AuthGuard';
import SearchResults from './components/SearchResults';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/kyc-verification" element={<KycVerification />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Routes that are available publicly */}
          <Route path="/retail" element={<Retail />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/wholesale/shop-dashboard" element={<WholesaleShopDashboard />} />

          {/* Protected Routes: require sign-in */}
          <Route
            path="/profile"
            element={
                <Profile />
            }
          />
          <Route
            path="/admin/signin"
            element={<AdminSignIn />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <AuthGuard>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/dashboard/super"
            element={
                <AdminDashboard />
            }
          />
          <Route
            path="/admin/dashboard/support"
            element={
                <SupportAdminDashboard />
            }
          />
          <Route
            path="/admin/dashboard/dev"
            element={
                <DeveloperTasksTab />
            }
          />
          <Route
            path="/migrate"
            element={
                <Migrate />
            }
          />

          {/* New Search Route */}
        <Route path="/search" element={<SearchResults />} />

          {/* Seller Routes */}
          <Route path="/retail/seller-dashboard/*" 
            element={
                <SellerDashboard />
            }
          >
            <Route path="listings/edit/:id" element={<EditListing />} />
          </Route>

          <Route
            path="/retail/shop-dashboard"
            element={
                <RetailShopDashboard />
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </ToastProvider>
  );
}

export default App;