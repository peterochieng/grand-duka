
import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <>
      <Header />
      <main className="pt-24 px-4 container mx-auto max-w-7xl min-h-[80vh] flex items-center justify-center">
        <motion.div 
          className="w-full max-w-md px-8 py-10 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
          
          {children}
        </motion.div>
      </main>
      <Footer />
    </>
  );
};
