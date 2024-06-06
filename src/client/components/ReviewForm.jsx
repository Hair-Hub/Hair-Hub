import { useState, useEffect } from 'react';
import axios from 'axios';
//import id from 'volleyball/lib/id';

export default function ReviewForm() {
  const [reviewId, setReviewId] = useState('')
  const [userId, setUserId] = useState('');
  const [itemId, setItemId] = useState('');
  const [rating, setRating] = useState('');
  const [parentId, setParentId] = useState('');
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');

  const handleRatingClick =(newRating) => {setRating(newRating)
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/item/${itemId}`, {
        
        });
        console.log(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchReviews()
  }, [itemId, userId, parentId, username, body, rating])

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(`/api/reviews/item/${itemId}`, {
        reviewId,
        userId, 
        itemId, 
        rating,
        username,
        body,

      });
      console.log('Review posted:', response.data);
      setReviewId('')
      setUserId('');
      setItemId('');
      setRating('');
      setParentId('');
      setUsername('');
      setBody('');
      setError('');
    } catch (error) {
      console.error('Error posting review:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
    handleSubmit()
  };

  
  }

