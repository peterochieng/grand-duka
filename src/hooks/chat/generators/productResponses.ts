
/**
 * Generate response based on specific product data
 */
export const generateProductSpecificResponse = (query: string, productData: any): string | null => {
  if (!productData) return null;
  
  const lcQuery = query.toLowerCase();
  
  // Price information
  if (lcQuery.includes('price') || lcQuery.includes('cost') || lcQuery.includes('how much') || lcQuery.includes('worth')) {
    if (productData.listingTypes?.buyItNow?.enabled) {
      return `This ${productData.title} is available for ${productData.currency} ${productData.listingTypes.buyItNow.price.toLocaleString()}. ${productData.shipping === 0 ? 'Shipping is free.' : `Shipping costs an additional ${productData.currency} ${productData.shipping}.`}`;
    } else if (productData.price) {
      return `This ${productData.title} is priced at ${productData.currency} ${productData.price.toLocaleString()}. ${productData.shipping === 0 ? 'Shipping is free.' : `Shipping costs an additional ${productData.currency} ${productData.shipping}.`}`;
    }
  }
  
  // Condition information
  if (lcQuery.includes('condition') || lcQuery.includes('quality') || lcQuery.includes('state') || lcQuery.includes('used')) {
    return `This ${productData.title} is in ${productData.condition} condition.`;
  }
  
  // Seller information
  if (lcQuery.includes('seller') || lcQuery.includes('who selling') || lcQuery.includes('who sells')) {
    const verificationText = productData.seller.verified ? " They are a verified seller." : "";
    return `This item is being sold by ${productData.seller.name} who has a rating of ${productData.seller.rating}/5.${verificationText}`;
  }
  
  // Location information
  if (lcQuery.includes('location') || lcQuery.includes('where') || lcQuery.includes('shipping from')) {
    return `This item is located in ${productData.location}. ${productData.shipping === 0 ? 'Shipping is free.' : `Shipping costs ${productData.currency} ${productData.shipping}.`}`;
  }
  
  // Auction details
  if (lcQuery.includes('auction') || lcQuery.includes('bid') || lcQuery.includes('bidding')) {
    if (productData.listingTypes?.auction?.enabled) {
      const reserveText = productData.listingTypes.auction.reservePrice ? 
        ` There is a reserve price of ${productData.currency} ${productData.listingTypes.auction.reservePrice.toLocaleString()} that must be met for the item to sell.` : 
        ' There is no reserve price for this auction.';
      
      const startingBidText = productData.listingTypes.auction.startingBid ? 
        ` The starting bid was ${productData.currency} ${productData.listingTypes.auction.startingBid.toLocaleString()}.` : 
        '';
        
      return `This item is available for auction with the current bid at ${productData.currency} ${productData.listingTypes.auction.currentBid.toLocaleString()}.${startingBidText}${reserveText} There are ${productData.listingTypes.auction.timeLeft} left in the auction.`;
    } else {
      return `This item is not available for auction. It is only available for ${productData.listingTypes?.buyItNow?.enabled ? 'direct purchase' : 'offer'}.`;
    }
  }
  
  // Reserve price information
  if (lcQuery.includes('reserve') || lcQuery.includes('minimum sale')) {
    if (productData.listingTypes?.auction?.enabled && productData.listingTypes.auction.reservePrice) {
      return `This auction has a reserve price of ${productData.currency} ${productData.listingTypes.auction.reservePrice.toLocaleString()}. If the final bid does not meet this amount, the item will not be sold.`;
    } else if (productData.listingTypes?.auction?.enabled) {
      return `This auction does not have a reserve price. The item will be sold to the highest bidder regardless of the final amount.`;
    } else {
      return `This item is not available for auction, so there is no reserve price.`;
    }
  }
  
  // Relisting information
  if (lcQuery.includes('relist') || lcQuery.includes('listed again')) {
    if (productData.relisted) {
      return `Yes, this item has been relisted by the seller. It was previously listed but did not sell, likely because the reserve price was not met or there were no bids.`;
    } else {
      return `This appears to be the first time this item has been listed by the seller.`;
    }
  }
  
  // Template information
  if (lcQuery.includes('template') || lcQuery.includes('listing format')) {
    if (productData.template) {
      const templateType = productData.template.type === 'standard' ? 'standard' : 
                         productData.template.type === 'custom' ? 'custom-approved' : 'local';
      
      return `This listing uses a ${templateType} template for ${productData.category} products. ${
        templateType === 'standard' ? 'This is a predefined template provided by the platform.' :
        templateType === 'custom-approved' ? 'This is a custom template that has been approved by the platform and is available to all sellers.' :
        'This is a local template created by the seller for their own use.'
      }`;
    } else {
      return `This listing does not use a specific template format.`;
    }
  }
  
  // Make offer details
  if (lcQuery.includes('offer') || lcQuery.includes('negotiate') || lcQuery.includes('counter')) {
    if (productData.listingTypes?.bestOffer?.enabled) {
      const minOfferText = productData.listingTypes.bestOffer.minOffer 
        ? ` The minimum acceptable offer is ${productData.currency} ${productData.listingTypes.bestOffer.minOffer.toLocaleString()}.` 
        : '';
      return `You can make an offer on this item.${minOfferText}`;
    } else {
      return `This item does not accept offers. It is only available for ${productData.listingTypes?.buyItNow?.enabled ? 'direct purchase' : 'auction'}.`;
    }
  }
  
  // Category and tags
  if (lcQuery.includes('category') || lcQuery.includes('type') || lcQuery.includes('kind of')) {
    return `This item belongs to the ${productData.category} category. ${productData.tags ? `It is tagged with: ${productData.tags.join(', ')}.` : ''}`;
  }
  
  // Description and features
  if (lcQuery.includes('describe') || lcQuery.includes('what is it') || lcQuery.includes('details') || lcQuery.includes('features')) {
    return `${productData.title}: ${productData.description}`;
  }
  
  // When was it listed
  if (lcQuery.includes('when') || lcQuery.includes('listed') || lcQuery.includes('date')) {
    const listedDate = new Date(productData.createdAt).toLocaleDateString();
    return `This item was listed on ${listedDate}.`;
  }
  
  return null;
};

/**
 * Generate response related to templates and relisting
 */
export const generateTemplateResponse = (query: string): string | null => {
  const lcQuery = query.toLowerCase();
  
  // Explain templates
  if (lcQuery.includes('what are templates') || lcQuery.includes('explain templates') || lcQuery.includes('how do templates work')) {
    return `Product templates are structured formats for creating listings. There are three types:\n\n1. Standard Templates: Pre-defined by the platform for common product categories.\n2. Custom-Approved Templates: Created by sellers and approved by the platform for all to use.\n3. Local Templates: Personal templates created by sellers for their own use.`;
  }
  
  // How to create templates
  if (lcQuery.includes('create template') || lcQuery.includes('make template') || lcQuery.includes('new template')) {
    return `To create a template, go to your seller dashboard and select "Create Template". You can either create a local template for your own use or submit a custom template for platform approval. Approved templates become available to all sellers in that category.`;
  }
  
  // Template approval process
  if (lcQuery.includes('template approval') || lcQuery.includes('get template approved')) {
    return `When you submit a custom template, our admin team reviews it for quality, completeness, and category fit. This typically takes 2-3 business days. Once approved, your template becomes available to all sellers in that category.`;
  }
  
  // How to relist items
  if (lcQuery.includes('how to relist') || lcQuery.includes('relist auction') || lcQuery.includes('list again')) {
    return `To relist an item, go to your seller dashboard, find the item in your "Unsold Items" section, and click "Relist". You can make changes to the listing before relisting, such as adjusting the price, reserve, or description.`;
  }
  
  // Reserve prices
  if (lcQuery.includes('how to set reserve') || lcQuery.includes('add reserve price')) {
    return `When creating or editing an auction listing, you'll find the "Reserve Price" field in the pricing section. Enter the minimum amount you're willing to accept. If the final bid doesn't meet this amount, the item won't sell. Note that having a reserve might reduce bidder interest.`;
  }
  
  // Starting bids
  if (lcQuery.includes('starting bid') || lcQuery.includes('minimum bid') || lcQuery.includes('starting price')) {
    return `When creating an auction listing, you can set a starting bid in the pricing section. This is the minimum amount bidders must offer to participate in the auction. A lower starting bid often attracts more bidders and can lead to higher final prices.`;
  }
  
  // Using other listings
  if (lcQuery.includes('use other listing') || lcQuery.includes('copy listing') || lcQuery.includes('duplicate')) {
    return `You can use existing listings as templates for new ones. On any listing, click the "Use as Template" button. For your own listings, you'll find this in your seller dashboard. For other sellers' listings, look for this option on the listing page.`;
  }
  
  return null;
}
