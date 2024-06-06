import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import starEmoji from '../assets/star.png'
import frownEmoji from '../assets/frown.png'
import angryEmoji from '../assets/angry.png'
import ReviewForm from '../components/ReviewForm'
import CommentForm from '../components/CommentForm'
import axios from 'axios';
import '../single-items.css'



export default function SingleItem({setToken}) {
  const { id, userId } = useParams();
  const [item, setItem] = useState(null);
  const [parentId, setParentId] = useState(null)
  const [error, setError] = useState('');
  const [body, setBody] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState([]);
  
  

  useEffect(() => {

    const fetchData = async () => {
      try {
        const itemResponse = await axios.get(`/api/items/${id}`);
        setItem(itemResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } 
    }
    fetchData();
    setToken()
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
    try {
      const reviews = await ReviewForm();
      setReviews(reviews)
    } catch(error) {
      console.error(error)
    }
    fetchReviews();
  }
}, [])

useEffect(() => {
  const fetchComments = async () => {
  try {
    const comments = await CommentForm();
    setComments(comments)
  } catch(error) {
    console.error(error)
  }
  fetchComments();
}
}, [])




return (
  <div className='single-items-container'>
    {item && (
      <article key={item.id}>
        <h2>{item.name}</h2>
        <img src={item.picture} alt={item.name} />
        <h3>Brand:</h3> <p>{item.brand}</p>
        <h3>Description:</h3> <p>{item.description}</p>
      </article>
    )}

    <div className="Reviews & Comments container">
      <h1>Tell Us What's On Your Mind</h1>

      <form onSubmit={(e) => handleSubmit(reviews.id, e)}>
        <label>
          <h3>Reviews:</h3>
          <textarea
            value={""}
            onSubm={(e) => setBody(e.target.value)}
            placeholder='Leave your review...'
          />
          <div>
            <button type="submit" onClick={(e) => handleRatingClick(1)}>
              <img className='icon' src='/src/client/assets/star.png' alt='star' />
            </button>
            <button type="submit" onClick={(e) => handleRatingClick(2)}>
              <img className='icon' src='/src/client/assets/frown.png' alt='frown' />
            </button>
            <button type="submit" onClick={(e) => handleRatingClick(3)}>
              <img className='icon' src='/src/client/assets/angry.png' alt='angry' />
            </button>
          </div>
          <button >Submit Review</button>
        </label>
      </form>
    
      <form onSubmit={(e) => handleSubmit(reviews.id, e)}>
        <label>
          <h3>Comments:</h3>
          <textarea
            value={""}
            placeholder='Reply here...'
            onSubmit={(e) => setBody(e.target.value)}
            required
          />
        </label>
          <button type="submit">Submit Comment</button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  </div>
);
  }
