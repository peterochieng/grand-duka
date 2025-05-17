import React from 'react';
import Layout from '@/components/Layout';
import RetailHeader from '@/components/retail/RetailHeader';
import RetailProductsDisplay from '@/components/retail/RetailProductsDisplay';
import RetailFiltersContainer from '@/components/retail/RetailFiltersContainer';
import { useProducts } from '@/hooks/useProducts';
import { useRetailFilters } from '@/hooks/useRetailFilters';

const Retail = () => {
  // Fetch products from the database
  const { products, loading: productsLoading, error } = useProducts();


  // Pass the fetched products to the retail filters hook
  const {
    displayProducts,
    filters,
    searchTerm,
    sortOption,
    isLoading,
    updateFilters,
    removeFilter,
    clearAllFilters,
    handleSearch,
    setSortOption,
  } = useRetailFilters(products);

  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        {error && (
          <p className="text-red-500">
            Failed to load products: {error.message}
          </p>
        )}
        {/* Hero Section */}
        <RetailHeader 
          searchTerm={searchTerm} 
          handleSearch={handleSearch} 
        />
        
        {/* Filters and Products */}
        <RetailFiltersContainer
          products={products}
          displayProducts={displayProducts}
          filters={filters}
          updateFilters={updateFilters}
          removeFilter={removeFilter}
          clearAllFilters={clearAllFilters}
          searchTerm={searchTerm}
          onClearSearch={() => handleSearch('')}
          sortOption={sortOption}
          setSortOption={setSortOption}
        >
          <RetailProductsDisplay 
            isLoading={isLoading} 
            displayProducts={displayProducts} 
          />
        </RetailFiltersContainer>
      </div>
    </Layout>
  );
};

export default Retail;