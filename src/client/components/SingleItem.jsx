import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../single-items.css'

export default function SingleItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [reviews, setReviews] = useState([]);
  

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/reviews/${id}`, { reviewText });
      setReviews([...reviews, response.data]);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleCommentSubmit = async (reviewId, e) => {
    console.log("Review ID in handleCommentSubmit:", reviewId)
    e.preventDefault();
    try {
        if (!reviewId) {
            console.error("Review ID is undefined")
            return;
        }
      const response = await axios.post(`/api/comments/review/${reviewId}`, { commentText });
      const updatedReviews = reviews.map(review => {
        if (review.reviewId === reviewId) {
            return {
                ...review,
                comments: [...review.comments, response.data]
            };
        }
        
        return review;
      })
      setReviews(updatedReviews);
      setCommentText('')
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>{review.reviewtext}</p>
              <h4>Comments</h4>
              <ul>
                {review.comments && review.comments.map(comments => (
                    <li key={comments.commentId}>{comments.commentText}</li>
                  ))}
              </ul>
              <form onSubmit={(e) => {
                console.log("Review ID:", review.id) 
                handleCommentSubmit(review.reviewId, e)
                }}>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                ></textarea>
                <button type="submit">Submit Comment</button>
              </form>
            </li>
          ))}
        </ul>
      </div>

      {/* Review Submission Form */}
      {console.log('Reviews:',reviews)}
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Add a review..."
        ></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}




