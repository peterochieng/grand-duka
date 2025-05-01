
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <motion.div 
      className="mt-12 md:w-2/3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-medium mb-4">Description</h2>
      <div className="prose dark:prose-invert max-w-none">
        <p>{description}</p>
        
        {/* In a real app, you would have more detailed description here */}
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
        
        <ul className="mt-4">
          <li>Premium quality and materials</li>
          <li>Authentic product with manufacturer warranty</li>
          <li>Comes with original packaging and accessories</li>
          <li>Fast shipping and secure delivery</li>
        </ul>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex">
        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          This listing is covered by the GrandDuka Money Back Guarantee, ensuring you receive the item as described or your money back.
        </p>
      </div>
    </motion.div>
  );
};
