
import { motion } from 'framer-motion';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminSignInCard } from '@/components/admin/auth/AdminSignInCard';

const AdminSignIn = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    showPassword,
    setShowPassword,
    isLoading,
    isAuthenticated,
    handleSubmit
  } = useAdminAuth();

  // If already authenticated, the useAdminAuth hook will handle redirection
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <AdminSignInCard
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </motion.div>
    </div>
  );
};

export default AdminSignIn;
