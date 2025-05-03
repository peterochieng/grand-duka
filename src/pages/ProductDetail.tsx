import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';

import { PropertyDetailsSection } from '@/components/product/PropertyDetailsSection';
import { SellerInfoSection } from '@/components/product/SellerInfoSection';
import { Product } from '@/lib/types';
import { getProductById } from '@/services/product/queries';
import { getProductsByCategory } from '../lib/products';
import { ProductDetailSkeleton } from '@/components/product/ProductDetailSkeleton';
import { ProductNotFound } from '@/components/product/ProductNotFound';
import { Header } from '@/components/Header';
import { ProductBreadcrumbs } from '@/components/product/ProductBreadcrumbs';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import { ProductImages } from '@/components/product/ProductImages';
import { ProductDescription } from '@/components/product/ProductDescription';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { Footer } from '@/components/Footer';

const ProductDetail: React.FC = () => {
  // Get product ID from URL params
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          // Fetch the product using its ID (modify getProductById to use Supabase if needed)
          const fetchedProduct = await getProductById(id);
          if (fetchedProduct) {
            setProduct(fetchedProduct);
            // Fetch related products from the same category (limit to 3)
            const allRelated = await getProductsByCategory(fetchedProduct.category);
            const related = allRelated.filter(p => p.id !== id).slice(0, 3);
            setRelatedProducts(related);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  // Determine if product belongs to a special category (e.g., Real Estate) to conditionally render extra sections
  const isRealEstate = product.category === 'Real Estate';
  const propertyDetails = isRealEstate ? product.propertyDetails || product.businessDetails?.propertyDetails : null;

  return (
    <>
      <Header />
      <Layout>
        <main className="pt-24 px-4 container mx-auto max-w-7xl">
          <ProductBreadcrumbs category={product.category} title={product.title} />
          
          <div className="flex flex-col md:flex-row gap-8">
            <ProductImages mainImage={product.image} title={product.title} isFavorite={false} onToggleFavorite={() => {}} />
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
              {/* Optional: you can add an Inspection Chatbot or additional info here */}
            </div>
          </div>

          <RelatedProducts products={relatedProducts} />
        </main>
      </Layout>
      <Footer />
    </>
  );
};

export default ProductDetail;