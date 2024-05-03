import { useState } from 'react';
import axios from 'axios';

export default function CommentForm() {
  const [commentText, setCommentText] = useState('');
  const [userId, setUserId] = useState('');
  const [reviewId, setReviewId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/comments', {
        reviewId,
        commentText,
      });
      console.log('Comment posted:', response.data);
      
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
       <form onSubmit={(e) => handleSubmit(reviewId, e)}>
        <label>
          Comment:
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}