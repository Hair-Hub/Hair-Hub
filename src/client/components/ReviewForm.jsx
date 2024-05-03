import { useState } from 'react';
import axios from 'axios';

export default function ReviewForm() {
  const [userId, setUserId] = useState('')
  const [itemId, setItemId] = useState('')
  const [rating, setRating] = useState('');
  const [reviewId, setReviewId] = useState('')
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(`/api/reviews/item/${itemId}`, {
        userId, 
        itemId, 
        rating, 
        reviewId, 
        reviewText,
      });
      console.log('Review posted:', response.data);
      
      setUserId('')
      setItemId('')
      setRating('');
      setReviewId('')
      setReviewText('');
      setError('');
    } catch (error) {
      console.error('Error posting review:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(reviewId, e)}>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <label>
        Review:
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
  }

