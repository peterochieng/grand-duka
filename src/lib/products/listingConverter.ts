
import { Product } from '../types';
import { ProductListing } from '@/data/listings/types';

// Convert a ProductListing to a Product format
export const convertListingToProduct = (listing: ProductListing): Product => {
  // Extract propertyDetails if they exist
  const propertyDetails = listing.propertyDetails ? {
    propertyType: listing.propertyDetails.propertyType,
    propertySize: listing.propertyDetails.propertySize,
    bedrooms: listing.propertyDetails.bedrooms,
    bathrooms: listing.propertyDetails.bathrooms,
    amenities: listing.propertyDetails.amenities,
    listingType: listing.propertyDetails.listingType,
    rentalTerm: listing.propertyDetails.rentalTerm,
    lettingType: listing.propertyDetails.lettingType,
  } : undefined;

  return {
    id: listing.id,
    title: listing.name,
    price: listing.price,
    currency: listing.currency,
    image: '/placeholder.svg', // Use a placeholder since listings might not have images
    description: listing.businessDetails?.reason || 'No description available',
    seller: {
      id: listing.seller.id,
      name: listing.seller.name,
      rating: 4.5, // Default rating
      verified: true,
    },
    condition: listing.businessDetails?.businessType?.replace('_', ' ') || 'New',
    location: 'Dubai, UAE', // Default location
    category: listing.category,
    subcategory: listing.subcategory,
    tags: [],
    shipping: 0,
    listingTypes: {
      buyItNow: {
        enabled: true,
        price: listing.price,
      },
      bestOffer: {
        enabled: true,
        minOffer: listing.price * 0.8, // 80% of the price as minimum offer
      },
      auction: {
        enabled: false,
      }
    },
    createdAt: listing.createdAt,
    updatedAt: listing.createdAt, // Use createdAt as fallback if no updatedAt is available
    businessDetails: listing.businessDetails,
    propertyDetails: propertyDetails,
    fashionDetails: listing.fashionDetails,
    musicDetails: listing.musicDetails,
  };
};
