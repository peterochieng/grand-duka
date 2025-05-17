import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2,
  Car,
  Clock,
  Monitor,
  Gamepad2,
  Shirt,
  Sofa,
  Trophy,
  Dumbbell,
  Briefcase,
  Music2,
  History,
  Library,
  HeartPulse,
  Dog,
  Baby,
  Star,
  BookOpen,
  Film,
  Scissors,
  Package
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { CategoryRow } from '@/lib/types/supabaseTypes';

export const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  // We'll now store product counts per category for published items only.
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories from Supabase
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

        // Fetch only published products from Supabase to compute real counts
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('category')
          .eq('approval_status', 'published');
        
        if (productsError) throw productsError;
        
        // Build counts dictionary keyed by category id based on published products
        const counts: Record<string, number> = {};
        productsData?.forEach(product => {
          if (product.category) {
            counts[product.category] = (counts[product.category] || 0) + 1;
          }
        });
        setProductCounts(counts);
      } catch (err) {
        console.error('Error fetching categories/products:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getIcon = (iconName: string | null) => {
    const iconProps = { className: "h-6 w-6 mb-3" };
    if (!iconName) return <Package {...iconProps} />;
    switch (iconName) {
      case 'DeviceDesktop': return <Monitor {...iconProps} />;
      case 'Car': return <Car {...iconProps} />;
      case 'Building': return <Building2 {...iconProps} />;
      case 'Shirt': return <Shirt {...iconProps} />;
      case 'Clock': return <Clock {...iconProps} />;
      case 'Sofa': return <Sofa {...iconProps} />;
      case 'GamepadIcon': return <Gamepad2 {...iconProps} />;
      case 'Trophy': return <Trophy {...iconProps} />;
      case 'Dumbbell': return <Dumbbell {...iconProps} />;
      case 'Briefcase': return <Briefcase {...iconProps} />;
      case 'Music': return <Music2 {...iconProps} />;
      case 'History': return <History {...iconProps} />;
      case 'Library': return <Library {...iconProps} />;
      case 'HeartPulse': return <HeartPulse {...iconProps} />;
      case 'Paw': return <Dog {...iconProps} />;
      case 'Baby': return <Baby {...iconProps} />;
      case 'Star': return <Star {...iconProps} />;
      case 'BookOpen': return <BookOpen {...iconProps} />;
      case 'Film': return <Film {...iconProps} />;
      case 'Scissors': return <Scissors {...iconProps} />;
      case 'Package': return <Package {...iconProps} />;
      default: return <Package {...iconProps} />;
    }
  };

  // Build route using the real category id
  const getCategoryRoute = (categoryId: string) => `/category/${categoryId}`;

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse bg-gray-50 dark:bg-gray-800 border-0">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in">
      {categories.filter(category => category.is_published).map((category) => {
        // Use productCounts from the published products query
        const count = productCounts[category.id] || 0;
        return (
          <Link key={category.id} to={getCategoryRoute(category.id)}>
            <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <CardContent className="flex flex-col items-center justify-center py-6">
                {getIcon(category.icon)}
                <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{count} items</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};