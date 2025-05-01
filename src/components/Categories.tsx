
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
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories from Supabase
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (error) {
          throw error;
        }
        
        setCategories(data || []);

        // Fetch counts of products per category
        // In a real scenario, this should be a database query
        // For now, we'll use random numbers
        const counts: Record<string, number> = {};
        data?.forEach(category => {
          // Generate random count between 0-10
          counts[category.name] = Math.floor(Math.random() * 10);
        });
        
        setCategoryCounts(counts);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
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
      case 'Toy': return <Gamepad2 {...iconProps} />; // Using Gamepad as placeholder for toy
      case 'Briefcase': return <Briefcase {...iconProps} />;
      case 'Music': return <Music2 {...iconProps} />;
      case 'History': return <History {...iconProps} />;
      case 'Library': return <Library {...iconProps} />;
      case 'HeartPulse': return <HeartPulse {...iconProps} />;
      case 'Paw': return <Dog {...iconProps} />; // Changed from Paw to Dog icon
      case 'Baby': return <Baby {...iconProps} />;
      case 'Star': return <Star {...iconProps} />;
      case 'BookOpen': return <BookOpen {...iconProps} />;
      case 'Film': return <Film {...iconProps} />;
      case 'Scissors': return <Scissors {...iconProps} />;
      case 'Package': return <Package {...iconProps} />;
      default: return <Package {...iconProps} />;
    }
  };

  // Get the appropriate route for each category
  const getCategoryRoute = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    // For vehicles, we have a dedicated page with tabs
    if (name === 'motors' || name === 'vehicles') {
      return '/category/vehicles';
    }
    // For other categories, use a standard format
    return `/category/${name}`;
  };

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
        // Get the actual count from the calculated counts, or fall back to 0
        const actualCount = categoryCounts[category.name] || 0;
        
        return (
          <Link key={category.id} to={getCategoryRoute(category.name)}>
            <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <CardContent className="flex flex-col items-center justify-center py-6">
                {getIcon(category.icon)}
                <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{actualCount} items</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
