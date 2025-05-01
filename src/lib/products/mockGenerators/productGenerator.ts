
import { Product } from '../../types';
import { CategoryDetails, categoryDetailsMap } from './categoryDetails';

/**
 * Creates a mock product for a specific category
 */
export const createMockProduct = (
  category: string,
  index: number
): Product => {
  // Get details for the specified category, or create default details if category doesn't exist
  const categoryDetails = categoryDetailsMap[category] || {
    titles: [`${category} Sample Product`],
    descriptions: [`This is a sample product for the ${category} category.`],
    priceRange: [100, 1000],
    conditions: ['New', 'Used'],
    tags: [category.toLowerCase()]
  };

  const titleIndex = Math.floor(Math.random() * categoryDetails.titles.length);
  const descIndex = Math.floor(Math.random() * categoryDetails.descriptions.length);
  const conditionIndex = Math.floor(Math.random() * categoryDetails.conditions.length);
  
  const [minPrice, maxPrice] = categoryDetails.priceRange;
  const price = Math.floor(minPrice + Math.random() * (maxPrice - minPrice));
  
  // Create a more unique ID with timestamp and random component to avoid collisions
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 1000);
  const id = `mock-${category.toLowerCase().replace(/\s+/g, '-')}-${index}-${timestamp}-${randomComponent}`;
  
  // Add property details for Real Estate category
  let businessDetails;
  if (category === 'Real Estate') {
    const propertyTypes = categoryDetails.propertyTypes || ['Apartment', 'Villa', 'Townhouse'];
    const propertyTypeIndex = Math.floor(Math.random() * propertyTypes.length);
    const bedroomOptions = ['1', '2', '3', '4', '5', '5 + Maid'];
    const bedroomIndex = Math.floor(Math.random() * bedroomOptions.length);
    const bathrooms = Math.floor(Math.random() * 6) + 1;
    
    // Generate random property size
    const sqft = Math.floor(Math.random() * 10000) + 1000;
    const sqm = Math.floor(sqft * 0.092903);
    
    // Select random amenities (3-8 amenities)
    const allAmenities = categoryDetails.amenities || [];
    const amenitiesCount = Math.floor(Math.random() * 6) + 3; // 3-8 amenities
    const selectedAmenities = [];
    
    for (let i = 0; i < amenitiesCount && i < allAmenities.length; i++) {
      const randomIndex = Math.floor(Math.random() * allAmenities.length);
      const amenity = allAmenities[randomIndex];
      
      if (!selectedAmenities.includes(amenity)) {
        selectedAmenities.push(amenity);
      }
    }
    
    // Determine if this is a sale or rental property (30% chance of rental)
    const isRental = Math.random() < 0.3;
    const listingType = isRental ? 'rent' : 'sale';
    
    // If it's a rental, determine rental term
    let rentalTerm;
    let lettingType;
    
    if (isRental) {
      const rentalTerms = ['monthly', 'quarterly', 'annually', 'daily'];
      const rentalTermIndex = Math.floor(Math.random() * rentalTerms.length);
      rentalTerm = rentalTerms[rentalTermIndex];
      
      // Determine if residential or commercial (20% chance of commercial)
      lettingType = Math.random() < 0.2 ? 'commercial' : 'residential';
    }
    
    businessDetails = {
      propertyDetails: {
        propertyType: propertyTypes[propertyTypeIndex],
        propertySize: {
          sqft: sqft,
          sqm: sqm
        },
        bedrooms: bedroomOptions[bedroomIndex],
        bathrooms: bathrooms,
        amenities: selectedAmenities,
        listingType,
        ...(isRental && { rentalTerm, lettingType })
      }
    };
  }
  
  const createdAt = generateRandomCreatedAt();
  
  return {
    id,
    title: categoryDetails.titles[titleIndex],
    description: categoryDetails.descriptions[descIndex],
    price,
    currency: 'AED',
    image: '/placeholder.svg',
    seller: {
      id: 'mock-seller',
      name: 'Granduka Store',
      rating: 4.5 + (Math.random() * 0.5),
      verified: true,
    },
    condition: categoryDetails.conditions[conditionIndex],
    location: 'Dubai, UAE',
    category,
    tags: categoryDetails.tags,
    shipping: 0,
    featured: false,
    listingTypes: createMockListingTypes(price),
    createdAt,
    updatedAt: createdAt, // Added updatedAt property
    ...(businessDetails && { businessDetails }),
  };
};

/**
 * Creates mock listing types for a product
 */
const createMockListingTypes = (price: number) => {
  return {
    buyItNow: {
      enabled: true,
      price,
    },
    bestOffer: {
      enabled: Math.random() > 0.5,
      minOffer: Math.floor(price * 0.8),
    },
    auction: {
      enabled: Math.random() > 0.7,
      startingBid: Math.floor(price * 0.7),
      reservePrice: Math.floor(price * 0.9),
      currentBid: Math.floor(price * 0.75),
      timeLeft: `${Math.floor(Math.random() * 7) + 1}d ${Math.floor(Math.random() * 23)}h`
    }
  };
};

/**
 * Generates a random createdAt date within the past 30 days
 */
const generateRandomCreatedAt = (): string => {
  return new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  ).toISOString();
};
