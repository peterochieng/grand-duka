
import React from 'react';
import RealEstateFields from './RealEstateFields';
import VehiclesFields from './VehiclesFields';
import ElectronicsFields from './ElectronicsFields';
import FashionFields from './FashionFields';
import CollectiblesFields from './CollectiblesFields';
import SportingGoodsFields from './SportingGoodsFields';
import HomeGardenFields from './HomeGardenFields';
import BabyEssentialsFields from './BabyEssentialsFields';
import SpecialtyServicesFields from './SpecialtyServicesFields';
import ToysHobbiesFields from './ToysHobbiesFields';
import AntiquesFields from './AntiquesFields';
import GamingFields from './GamingFields';
import BusinessIndustrialFields from './BusinessIndustrialFields';
import MusicFields from './MusicFields';
import BooksMoviesFields from './BooksMoviesFields';

interface CategoryFieldsMapperProps {
  category: string;
}

const CategoryFieldsMapper: React.FC<CategoryFieldsMapperProps> = ({ category }) => {
  // Return appropriate component based on category
  switch(category) {
    case 'Real Estate':
      return <RealEstateFields />;
    
    case 'Vehicles':
    case 'Motors':
      return <VehiclesFields />;
    
    case 'Electronics':
      return <ElectronicsFields />;
    
    case 'Fashion':
      return <FashionFields />;
    
    case 'Collectibles & Art':
      return <CollectiblesFields />;
    
    case 'Sporting Goods':
      return <SportingGoodsFields />;
    
    case 'Home & Garden':
      return <HomeGardenFields />;
    
    case 'Baby Essentials':
      return <BabyEssentialsFields />;
    
    case 'Specialty Services':
      return <SpecialtyServicesFields />;
      
    case 'Toys & Hobbies':
      return <ToysHobbiesFields />;
      
    case 'Antiques':
      return <AntiquesFields />;
      
    case 'Gaming':
      return <GamingFields />;
      
    case 'Business & Industrial':
      return <BusinessIndustrialFields />;
      
    case 'Music':
    case 'Music Services':
    case 'Music Equipment Rental':
      return <MusicFields />;
      
    case 'Books, Movies & Music':
      return <BooksMoviesFields />;
    
    default:
      return null;
  }
};

export default CategoryFieldsMapper;
