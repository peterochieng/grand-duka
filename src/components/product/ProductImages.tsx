import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface ProductImagesProps {
  images: string[];
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ProductImages = ({ 
  images, 
  title, 
  isFavorite, 
  onToggleFavorite 
}: ProductImagesProps) => {
  // Use the first image as the initial selected image, or a fallback if none provided
  const initialImage = images && images.length > 0 ? images[0] : '/placeholder-image.png';
  const [selectedImage, setSelectedImage] = useState(initialImage);

  return (
    <motion.div 
      className="w-full md:w-2/3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        <img 
          src={selectedImage} 
          alt={title} 
          className="w-full aspect-[4/3] object-cover"
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 rounded-full z-10"
          onClick={onToggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
      
      {images && images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              className={`border rounded-md overflow-hidden transition-all ${
                selectedImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 dark:border-gray-800'
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="aspect-square object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};