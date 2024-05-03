import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm'
import CommentForm from '../components/CommentForm'
import axios from 'axios';
import '../single-items.css'



export default function SingleItem({token}) {
  const { id, userId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewId, setReviewId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [error, setError] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState([]);
  
  

  useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get(`/api/items/${id}`);
        setItem(itemResponse.data);

        const reviewsResponse = await axios.get(`/api/reviews/${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  /*const handleReviewSubmit = async (itemId, event, {setToken}) => {
    event.preventDefault();
    try {
      console.log("reviewId in handleCommentSubmit:", reviewId); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(`/api/reviews/item/${itemId}`, {
        userId: userId,
        rating: rating,
        reviewId: reviewId,
        reviewText: reviewText
      }, config);
      setReviews([...reviews, response.data]);
      setToken(data.token)
      setReviewText('');
      setRating('');
      setReviewId('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };*/

 /* const handleEditReview = (reviewId, reviewText) => {
    setEditingReviewId(reviewId);
    setEditingReviewText(reviewText);
  };
  
  const handleEditReviewSubmit = async (reviewId, e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, {
        reviewText: editingReviewText
      });
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            reviewText: editingReviewText
          };
        }
        return review;
      });
      setReviews(updatedReviews);
      setEditingReviewId(null);
      setEditingReviewText('');
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };
  */
  
  

  /*const handleCommentSubmit = async (e, reviewId, {setToken}) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("reviewId in handleCommentSubmit:", reviewId); // Log reviewId to check if it's defined
    try {
        const pass = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        if (!reviewId) {
            console.error("reviewID is undefined");
            return;
        }

        const response = await axios.post(`/api/comments/review/${reviewId}`, { 
          reviewId: reviewId,
          commentText: commentText,
         }, pass);

        setComments([...comments, response.data]);
        setToken(data.token)
        setReviewId('');
        setCommentText('');
    } catch (error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with an error:', error.response.data);
          // You can display an error message to the user based on the response data
      } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from server:', error.request);
          // You can display a generic error message to the user
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
          // You can display a generic error message to the user
      }
  }
};*/



  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setReviews(reviews.map(review => ({
        ...review,
        comments: review.comments.filter(comment => comment.id !== commentId)
      })));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className='single-items-container'>
      {item && (
        <article key={item.id}>
          <h2>{item.name}</h2>
          <img src={item.picture} alt={item.name} />
          <p>Brand: {item.brand}</p>
          <p>Description: {item.description}</p>
        </article>
      )}
      
      <div className="reviews-comments-container">
  <h3>Reviews</h3>
  
        <h4>Comments</h4>
        <ul key={reviewId}>
       
              <button onClick={() => handleDelete(comments.id)}>Delete</button>
            
        </ul>
        <form onSubmit={(e) => CommentForm(reviews.reviewId, e)}>
  <textarea
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    placeholder="Add a comment...">
    </textarea>
    <button type="submit">Submit Comment</button>
  </form>

</div>

         <form onSubmit={(e) => ReviewForm(reviews.reviewId, e)}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Add a review..."
        ></textarea>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}




