
import React, { useState, useEffect } from 'react';
import { getFeedbackForSeller } from '@/lib/feedback';
import { FeedbackFilter } from './feedback/FeedbackFilter';
import { FeedbackItem } from './feedback/FeedbackItem';
import { EmptyFeedbackState } from './feedback/EmptyFeedbackState';
import { LoadingFeedbackState } from './feedback/LoadingFeedbackState';

interface FeedbackListProps {
  sellerId: string;
}

export const FeedbackList = ({ sellerId }: FeedbackListProps) => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative'>('all');
  
  useEffect(() => {
    const loadFeedback = async () => {
      setLoading(true);
      try {
        const sellerFeedback = await getFeedbackForSeller(sellerId);
        setFeedback(sellerFeedback);
      } catch (error) {
        console.error('Error loading feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeedback();
  }, [sellerId]);
  
  const filteredFeedback = feedback.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'positive') return item.rating >= 4;
    if (filter === 'negative') return item.rating < 3;
    return true;
  });
  
  if (loading) {
    return <LoadingFeedbackState />;
  }
  
  if (feedback.length === 0) {
    return <EmptyFeedbackState />;
  }
  
  return (
    <div className="space-y-6">
      <FeedbackFilter 
        feedbackCount={feedback.length} 
        currentFilter={filter} 
        onFilterChange={setFilter} 
      />
      
      <div className="space-y-4">
        {filteredFeedback.map(item => (
          <FeedbackItem key={item.id} feedback={item} />
        ))}
      </div>
    </div>
  );
};
