
import { useParams } from 'react-router-dom';
import { 
  Car, 
  Bike, 
  Sailboat, 
  Truck, 
  Bus,
  Gauge,
  FileCheck
} from 'lucide-react';
import Layout from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { ProductBreadcrumbs } from '@/components/product/ProductBreadcrumbs';
import { productListings } from '@/data/productListings';

const VehicleSubcategoryPage = () => {
  const { subcategory } = useParams<{ subcategory: string }>();
  
  // Format subcategory for display (e.g., "cars" -> "Cars")
  const formattedSubcategory = subcategory 
    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1) 
    : '';
  
  // Filter products by the current subcategory
  const filteredProducts = subcategory 
    ? getProductsByCategory('Vehicles').filter(product => {
        // Check if this product has vehicle metadata in our mock data
        const matchingListing = productListings.find(listing => 
          listing.id === product.id || 
          listing.name === product.title
        );
        
        return matchingListing?.subcategory?.toLowerCase() === subcategory.toLowerCase();
      })
    : [];
  
  // If no filtered products found, fallback to showing general vehicle products
  const products = filteredProducts.length > 0 
    ? filteredProducts 
    : getProductsByCategory('Vehicles').slice(0, 8);
  
  // Get the appropriate icon for the subcategory
  const getSubcategoryIcon = () => {
    switch(subcategory?.toLowerCase()) {
      case 'cars':
        return <Car className="mr-2 h-6 w-6" />;
      case 'motorcycles':
        return <Bike className="mr-2 h-6 w-6" />;
      case 'boats':
      case 'watercraft':
        return <Sailboat className="mr-2 h-6 w-6" />;
      case 'trucks':
        return <Truck className="mr-2 h-6 w-6" />;
      case 'buses':
        return <Bus className="mr-2 h-6 w-6" />;
      default:
        return <Car className="mr-2 h-6 w-6" />;
    }
  };
  
  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col gap-4">
          <ProductBreadcrumbs 
            category="Vehicles" 
            title={formattedSubcategory} 
          />
          
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold flex items-center">
              {getSubcategoryIcon()}
              {formattedSubcategory}
            </h1>
            <p className="text-muted-foreground">
              Browse our selection of {formattedSubcategory.toLowerCase()} with detailed inspection reports
            </p>
          </div>
          
          <Separator className="my-4" />
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                We couldn't find any {formattedSubcategory.toLowerCase()} in this category. Please check back later.
              </p>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-2">
              <FileCheck className="h-5 w-5" />
              <h3>Vehicle Inspection Reports</h3>
            </div>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
              All our {formattedSubcategory.toLowerCase()} come with detailed inspection reports. Click on any listing to view its full inspection details.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleSubcategoryPage;
