
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Product } from '@/lib/types';
import { sellers } from '@/data/sellers';
import { shops } from '@/data/shopsData';
import { products } from '@/lib/products';
import SellerHeader from '@/components/seller/SellerHeader';
import SellerStats from '@/components/seller/SellerStats';
import SellerTabs from '@/components/seller/SellerTabs';
import SellerLoadingSkeleton from '@/components/seller/SellerLoadingSkeleton';
import SellerNotFound from '@/components/seller/SellerNotFound';

const SellerProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [shop, setShop] = useState<any>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Fetch seller data
    const fetchData = () => {
      setLoading(true);
      
      const foundSeller = sellers.find(s => s.id === id);
      
      if (foundSeller) {
        setSeller(foundSeller);
        
        // If this seller has a shop, fetch shop data
        if (foundSeller.shopId) {
          const foundShop = shops.find(s => s.id === foundSeller.shopId);
          setShop(foundShop || null);
        }
        
        // Get products for this seller
        const sellerProds = products.filter(
          p => p.seller?.id === foundSeller.id
        );
        setSellerProducts(sellerProds);
      }
      
      setLoading(false);
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);
  
  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-10 min-h-[60vh]">
          <SellerLoadingSkeleton />
        </main>
        <Footer />
      </>
    );
  }
  
  if (!seller) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-10 min-h-[60vh] flex items-center justify-center">
          <SellerNotFound />
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <SellerHeader seller={seller} shop={shop} />
        <SellerStats seller={seller} />
        <SellerTabs seller={seller} shop={shop} sellerProducts={sellerProducts} />
      </main>
      <Footer />
    </>
  );
};

export default SellerProfilePage;
