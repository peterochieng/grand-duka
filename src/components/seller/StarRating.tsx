
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

export const StarRating = ({ 
  rating, 
  onChange,
  size = 5,
  readonly = false
}: StarRatingProps) => {
  const handleClick = (index: number) => {
    if (readonly || !onChange) return;
    onChange(index + 1);
  };
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-${size} w-${size} ${
            index < rating 
              ? 'text-amber-500 fill-amber-500' 
              : 'text-gray-300 dark:text-gray-600'
          } ${!readonly ? 'cursor-pointer' : ''}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
