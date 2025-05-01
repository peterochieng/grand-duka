
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage = ({ src, alt }: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`object-cover h-full w-full transition-all duration-500 group-hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
