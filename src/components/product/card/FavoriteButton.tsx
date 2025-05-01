
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  productId: string;
}

export const FavoriteButton = ({ productId }: FavoriteButtonProps) => {
  const navigate = useNavigate();
  const { isFavorite, loading, toggleFavorite } = useFavorites(productId);

  return (
    <AuthGuard fallback={
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 rounded-full z-10"
        onClick={() => navigate('/signin')}
      >
        <Heart className="h-5 w-5" />
      </Button>
    }>
      <Button
        variant="ghost"
        size="icon"
        disabled={loading}
        className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 rounded-full z-10"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite();
        }}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>
    </AuthGuard>
  );
};
