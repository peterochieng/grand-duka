
import React from 'react';
import Layout from '@/components/Layout';
import { products } from '@/lib/products';
import { categories } from '@/lib/categories';
import RetailHeader from '@/components/retail/RetailHeader';
import RetailProductsDisplay from '@/components/retail/RetailProductsDisplay';
import RetailFiltersContainer from '@/components/retail/RetailFiltersContainer';
import { useRetailFilters } from '@/hooks/useRetailFilters';

const Retail = () => {
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
    setSortOption
  } = useRetailFilters(products);

  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
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
          categories={categories}
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
