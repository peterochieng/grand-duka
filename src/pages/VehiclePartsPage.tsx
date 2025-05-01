
import { vehicleProducts } from '@/lib/vehicles';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';

// Import refactored components
import PartsBreadcrumb from '@/components/vehicle/PartsBreadcrumb';
import SearchSortBar from '@/components/vehicle/SearchSortBar';
import PartsFilterSidebar from '@/components/vehicle/PartsFilterSidebar';
import ActiveFilters from '@/components/vehicle/ActiveFilters';
import ProductsGrid from '@/components/vehicle/ProductsGrid';
import useVehiclePartsFilter from '@/hooks/useVehiclePartsFilter';

const VehiclePartsPage = () => {
  // Get parts products (filter products with "parts" in tags)
  const allPartsProducts = vehicleProducts.filter(product => 
    product.tags.includes('parts') || 
    product.title.toLowerCase().includes('part') ||
    product.description.toLowerCase().includes('part')
  );
  
  // Use our custom hook for filtering
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRanges,
    selectedConditions,
    selectedBrands,
    sortBy,
    setSortBy,
    filtersOpen,
    setFiltersOpen,
    sortedProducts,
    togglePriceRange,
    toggleCondition,
    toggleBrand,
    clearFilters
  } = useVehiclePartsFilter(allPartsProducts);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-4">
          {/* Breadcrumb Navigation */}
          <PartsBreadcrumb />
          
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Vehicle Parts & Accessories</h1>
            <p className="text-muted-foreground">
              Find the perfect parts and accessories for your vehicle
            </p>
          </div>
          
          <Separator className="my-4" />
          
          {/* Search and Sort */}
          <SearchSortBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            handleSearch={handleSearch}
          />
          
          {/* Main content with sidebar and products */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
            {/* Sidebar for large screens / Collapsible for mobile */}
            <PartsFilterSidebar 
              filtersOpen={filtersOpen}
              setFiltersOpen={setFiltersOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPriceRanges={selectedPriceRanges}
              togglePriceRange={togglePriceRange}
              selectedConditions={selectedConditions}
              toggleCondition={toggleCondition}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              clearFilters={clearFilters}
            />
            
            {/* Products grid */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">{sortedProducts.length} Products</h2>
                <div className="flex items-center gap-2 md:hidden">
                  {(searchQuery || selectedCategory || selectedPriceRanges.length > 0 || 
                    selectedConditions.length > 0 || selectedBrands.length > 0) && (
                    <button 
                      className="text-sm text-blue-600 dark:text-blue-400 font-medium"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
              
              {/* Active filters display */}
              <ActiveFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPriceRanges={selectedPriceRanges}
                togglePriceRange={togglePriceRange}
                selectedConditions={selectedConditions}
                toggleCondition={toggleCondition}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                clearFilters={clearFilters}
              />
              
              {/* Products display */}
              <ProductsGrid 
                products={sortedProducts} 
                clearFilters={clearFilters} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehiclePartsPage;
