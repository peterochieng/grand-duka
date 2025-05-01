
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlParams = (
  setFilters: (updater: (prev: any) => any) => void,
  setSearchTerm: (term: string) => void
) => {
  const [searchParams] = useSearchParams();

  // Fetch initial query parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('q');
    const subcategoryParam = searchParams.get('subcategory');
    
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    if (subcategoryParam) {
      setFilters(prev => ({ ...prev, subcategory: subcategoryParam.split(',') }));
    }
  }, [searchParams, setFilters, setSearchTerm]);
};
