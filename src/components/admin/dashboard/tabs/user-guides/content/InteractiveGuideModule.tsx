
import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveGuideModuleProps {
  title: string;
  children: React.ReactNode;
}

export const InteractiveGuideModule = ({ title, children }: InteractiveGuideModuleProps) => {
  return (
    <motion.div 
      className="border rounded-md p-4 mb-6 bg-gray-50 hover:bg-white transition-colors"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        y: -2,
      }}
    >
      <h4 className="text-lg font-medium mb-3 text-slate-800">{title}</h4>
      <div className="prose prose-sm max-w-none">
        {children}
      </div>
    </motion.div>
  );
};

// Add global styles for the guide content
export const guideContentStyles = `
  .guide-content h2 {
    scroll-margin-top: 70px;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .guide-content h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: hsl(var(--primary));
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  .guide-content h2:hover::after {
    width: 80px;
  }
  
  .guide-content h3, .guide-content h4 {
    scroll-margin-top: 50px;
  }
  
  .guide-content mark.highlight {
    background-color: #fef08a;
    padding: 1px 0;
    border-radius: 2px;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      background-color: #fef08a;
    }
    50% {
      background-color: #fde047;
    }
  }
  
  .guide-content p {
    transition: background-color 0.2s ease;
  }
  
  .guide-content p:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  .guide-content img {
    transition: transform 0.3s ease;
    border-radius: 0.375rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .guide-content img:hover {
    transform: scale(1.01);
  }
  
  .guide-content ul li,
  .guide-content ol li {
    transition: transform 0.2s ease;
  }
  
  .guide-content ul li:hover,
  .guide-content ol li:hover {
    transform: translateX(3px);
  }
  
  .guide-content mark {
    border-radius: 0.125rem;
    padding: 0 0.25rem;
  }
  
  .guide-content .bg-yellow-100 {
    background-color: #fef9c3;
    border-bottom: 1px dashed #f59e0b;
  }
  
  .guide-content .bg-green-100 {
    background-color: #dcfce7;
    border-bottom: 1px dashed #22c55e;
  }
`;
