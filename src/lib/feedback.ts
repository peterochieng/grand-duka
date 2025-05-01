
import { v4 as uuidv4 } from 'uuid';

// Define feedback interfaces
export interface Feedback {
  id: string;
  sellerId: string;
  buyerId: string;
  buyer: {
    id: string;
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  productId?: string;
  productName?: string;
  verifiedPurchase: boolean;
  sellerResponse?: string;
  helpful: number;
}

// Mock buyer for demo purposes
const mockBuyer = {
  id: 'buyer-1',
  name: 'John Smith',
  image: '',
};

// Mock feedback data
let feedbackData: Feedback[] = [
  {
    id: 'f1',
    sellerId: 'seller-1',
    buyerId: 'buyer-1',
    buyer: {
      id: 'buyer-1',
      name: 'Sarah Johnson',
      image: '',
    },
    rating: 5,
    comment: "Excellent service! The product arrived faster than expected and was exactly as described. Would definitely buy from this seller again.",
    createdAt: '2023-06-15T09:43:00Z',
    productId: '7',
    productName: 'Samsung 65" Neo QLED 4K Smart TV',
    verifiedPurchase: true,
    helpful: 12,
  },
  {
    id: 'f2',
    sellerId: 'seller-1',
    buyerId: 'buyer-2',
    buyer: {
      id: 'buyer-2',
      name: 'Michael Brown',
      image: '',
    },
    rating: 4,
    comment: "Good transaction overall. Product was as described, though shipping took a bit longer than I expected.",
    createdAt: '2023-07-22T14:15:00Z',
    productId: '8',
    productName: 'Bose QuietComfort 45 Noise Cancelling Headphones',
    verifiedPurchase: true,
    sellerResponse: "Thank you for your feedback! We apologize for the shipping delay and are working to improve our logistics.",
    helpful: 5,
  },
  {
    id: 'f3',
    sellerId: 'seller-3',
    buyerId: 'buyer-3',
    buyer: {
      id: 'buyer-3',
      name: 'Ahmed Al Mansoor',
      image: '',
    },
    rating: 5,
    comment: "Exceptional quality and service. This trader consistently delivers premium commodities on time and as specified.",
    createdAt: '2023-08-10T11:30:00Z',
    verifiedPurchase: true,
    helpful: 21,
  },
  {
    id: 'f4',
    sellerId: 'seller-2',
    buyerId: 'buyer-4',
    buyer: {
      id: 'buyer-4',
      name: 'Lisa Chen',
      image: '',
    },
    rating: 2,
    comment: "I'm disappointed with my purchase. The item had visible damage that wasn't mentioned in the listing.",
    createdAt: '2023-09-05T16:20:00Z',
    productId: '9',
    productName: 'Dyson V15 Detect Absolute Vacuum Cleaner',
    verifiedPurchase: true,
    sellerResponse: "We're very sorry to hear about your experience. Please contact our customer service so we can make this right for you.",
    helpful: 8,
  },
];

// Get feedback for a specific seller
export const getFeedbackForSeller = async (sellerId: string): Promise<Feedback[]> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const sellerFeedback = feedbackData.filter(
        feedback => feedback.sellerId === sellerId
      ).sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      resolve(sellerFeedback);
    }, 500);
  });
};

// Add new feedback
export const addFeedback = async (data: {
  sellerId: string;
  rating: number;
  comment: string;
  productId?: string;
  productName?: string;
}): Promise<Feedback> => {
  // Create new feedback object
  const newFeedback: Feedback = {
    id: uuidv4(),
    sellerId: data.sellerId,
    buyerId: mockBuyer.id,
    buyer: mockBuyer,
    rating: data.rating,
    comment: data.comment,
    createdAt: new Date().toISOString(),
    productId: data.productId,
    productName: data.productName,
    verifiedPurchase: !!data.productId, // Consider it verified if there's a product
    helpful: 0,
  };
  
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Add to our mock database
      feedbackData = [newFeedback, ...feedbackData];
      resolve(newFeedback);
    }, 800);
  });
};

// Get average rating for a seller
export const getSellerAverageRating = async (sellerId: string): Promise<number> => {
  const feedback = await getFeedbackForSeller(sellerId);
  
  if (feedback.length === 0) {
    return 0;
  }
  
  const totalRating = feedback.reduce((sum, item) => sum + item.rating, 0);
  return totalRating / feedback.length;
};

// Add seller response to feedback
export const addSellerResponse = async (
  feedbackId: string,
  response: string
): Promise<Feedback | null> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedbackIndex = feedbackData.findIndex(item => item.id === feedbackId);
      
      if (feedbackIndex !== -1) {
        feedbackData[feedbackIndex] = {
          ...feedbackData[feedbackIndex],
          sellerResponse: response,
        };
        
        resolve(feedbackData[feedbackIndex]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};
