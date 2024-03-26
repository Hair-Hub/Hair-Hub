import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../single-items.css'
export default function SingleItem({token}) {
  const { id, userId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('')

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

  const handleReviewSubmit = async (itemId, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/reviews/item/${itemId}`, {
        userId: userId,
        rating: rating,
        reviewText: reviewText
      });
      setReviews([...reviews, response.data]);
      setReviewText('');
      setRating('')
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleEditReview = async (reviewId, updatedReviewText) => {
    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, { reviewText: updatedReviewText });
      console.log('Response:', response)
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            reviewText: updatedReviewText 
          };
        }
        return review;
      });
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };
  

  const handleCommentSubmit = async (reviewId, e) => {
    console.log("Review ID in handleCommentSubmit:", reviewId);
    console.log("Comment text:", commentText);
    e.preventDefault();
    try {
      if (!reviewId) {
        console.error("Review ID is undefined");
        return;
      }
      const response = await axios.post(`/api/comments/review/${reviewId}`, { commentText });
      console.log("Comment posted:", response.data);
      const updatedReviews = reviews.map(review => {
        if (review.reviewid === reviewId) {
          return {
            ...review,
            comments: [...review.comments, response.data]
          };
        }
        return review;
      });
      setReviews(updatedReviews);
      setCommentText('');
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
            <li key={review.id} className='review-item'>
              <p>Rating: {review.rating}</p>
              <p>{review.reviewtext}</p>
              <p>Posted by: {review.username}</p>
              {userId === review.userId && (
                <button onClick={() => handleEditReview(review.reviewId)}>Edit Review</button>
              )}
              <h4>Comments</h4>
              <ul>
                {review.comments && review.comments.map(comments => (
                    <li key={comments.id}className='comment-item'><p>{comments.commenttext}</p>
                    <p>Posted by: {comments.username}</p>
                    {userId === comments.userId && (
                  <button onClick={() => handleEditComment(comments.id)}>Edit Comment</button>
                )}
                    </li>
                    
                  ))}
              </ul>
              <form onSubmit={(e) => {
                console.log("Review ID:", review.id) 
                handleCommentSubmit(review.reviewid, e)
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
         <form onSubmit={(e) => handleReviewSubmit(id, e)}>
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




