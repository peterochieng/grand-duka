
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Boxes, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to{" "}
            <span className="inline-block">
              <span className="text-white font-black" style={{ WebkitTextStroke: '2px #3cb371' }}>G</span>
              <span className="text-white font-black" style={{ WebkitTextStroke: '2px #3cb371' }}>r</span>
              <span className="text-white font-black" style={{ WebkitTextStroke: '2px #3cb371' }}>a</span>
              <span className="text-white font-black" style={{ WebkitTextStroke: '2px #3cb371' }}>n</span>
              <span className="text-white font-black" style={{ WebkitTextStroke: '2px #3cb371' }}>d</span>
              <span className="text-green-500 font-black">u</span>
              <span className="text-red-500 font-black">k</span>
              <span className="text-black font-black">a</span>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your premium marketplace for retail shopping and bulk trading in the UAE
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Retail Option */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col h-full"
          >
            <div className="relative overflow-hidden rounded-t-2xl h-48 md:h-64 bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <ShoppingBag className="w-24 h-24 text-white/90" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-4">
                <h2 className="text-2xl font-bold text-white">Retail Marketplace</h2>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-b-2xl flex-1 border border-t-0 border-muted">
              <p className="mb-6 text-muted-foreground">
                Shop for individual products from verified sellers. Find everything from electronics to vehicles.
              </p>
              <Button size="lg" className="w-full py-6 text-lg" asChild>
                <Link to="/retail/old">
                  Shop Retail
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Bulk Trading Option */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="relative overflow-hidden rounded-t-2xl h-48 md:h-64 bg-gradient-to-br from-amber-500 to-red-500">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <Boxes className="w-24 h-24 text-white/90" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-4">
                <h2 className="text-2xl font-bold text-white">Bulk Trading</h2>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-b-2xl flex-1 border border-t-0 border-muted">
              <p className="mb-6 text-muted-foreground">
                Trade commodities in bulk with verified brokers. From agricultural products to energy resources.
              </p>
              <Button size="lg" variant="outline" className="w-full py-6 text-lg" asChild>
                <Link to="/wholesale">
                  Explore Bulk Trading
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-muted-foreground mt-12 text-center max-w-xl"
        >
          Granduka is the UAE's premiere marketplace for both retail products and bulk commodities trading
        </motion.p>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Granduka. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
