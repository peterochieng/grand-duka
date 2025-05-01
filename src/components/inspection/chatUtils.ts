
/**
 * Get placeholder text based on item type
 */
export const getChatPlaceholder = (itemType?: string): string => {
  if (itemType === 'vehicle') {
    return "Ask about vehicle condition, history, or recommendations...";
  } else if (itemType === 'commodity') {
    return "Ask about commodity quality, specifications, or origin...";
  } else {
    return "Ask about this item's details, condition, or features...";
  }
};
