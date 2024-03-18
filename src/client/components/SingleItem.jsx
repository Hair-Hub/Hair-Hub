import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SingleItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get(`/api/items/${id}`);
        setItem(itemResponse.data);

        const reviewsResponse = await axios.get(`/api/reviews/item/${id}`);
        setReviews(reviewsResponse.data);

        const reviewIds = reviewsResponse.data.map(review => review.id);
        const commentsResponse = await Promise.all(reviewIds.map(reviewId => axios.get(`/api/comments/review/${reviewId}`)));
        setComments(commentsResponse.map(res => res.data).flat());
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {item && (
        <article key={item.id}>
          <h2>{item.name}</h2>
          <p>Brand: {item.brand}</p>
          <p>Description: {item.description}</p>
        </article>
      )}
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>{review.reviewText}</p>
            <h4>Comments</h4>
            <ul>
              {comments
                .filter(comment => comment.reviewId === review.id)
                .map(comment => (
                  <li key={comment.id}>{comment.commentText}</li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

