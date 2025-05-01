
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getProductById, getProductsByCategory } from '@/lib/products';
import { Product } from '@/lib/types';
import { ProductBreadcrumbs } from '@/components/product/ProductBreadcrumbs';
import { ProductImages } from '@/components/product/ProductImages';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import { ProductDescription } from '@/components/product/ProductDescription';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { CarProductDetails } from '@/components/CarProductDetails';
import { InspectionChatbot } from '@/components/inspection/InspectionChatbot';
import { Card } from '@/components/ui/card';
import { ProductDetailSkeleton } from '@/components/product/ProductDetailSkeleton';
import { ProductNotFound } from '@/components/product/ProductNotFound';
import { PropertyDetailsSection } from '@/components/product/PropertyDetailsSection';
import { SellerInfoSection } from '@/components/product/SellerInfoSection';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const fetchedProduct = getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          
          // Get related products
          const related = getProductsByCategory(fetchedProduct.category)
            .filter(p => p.id !== id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const isRealEstate = product?.category === 'Real Estate';
  const propertyDetails = isRealEstate ? product?.propertyDetails || product?.businessDetails?.propertyDetails : null;

  return (
    <>
      <Header />
      <main className="pt-24 px-4 container mx-auto max-w-7xl">
        <ProductBreadcrumbs category={product.category} title={product.title} />
        
        <div className="flex flex-col md:flex-row gap-8">
          <ProductImages 
            mainImage={product.image} 
            title={product.title}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
          />
          <ProductSidebar product={product} />
        </div>
        
        {isRealEstate && propertyDetails && (
          <PropertyDetailsSection propertyDetails={propertyDetails} />
        )}
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-2/3">
            <ProductDescription description={product.description} />
            <SellerInfoSection product={product} />
          </div>
          <div className="lg:w-1/3">
            <Card className="shadow-md">
              <InspectionChatbot 
                itemId={product.id} 
                itemName={product.title}
                itemType={product.category === "Vehicles" ? "vehicle" : "product"}
                inspectionId={`product-${product.id}`}
                productData={product}
              />
            </Card>
          </div>
        </div>
        
        {product.category === "Vehicles" && (
          <CarProductDetails product={product} />
        )}
        
        <RelatedProducts products={relatedProducts} />
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
