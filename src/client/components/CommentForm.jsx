import { useState } from 'react';
import axios from 'axios';

export default function CommentForm({ reviewId }) {
  const [commentText, setCommentText] = useState('');

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

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}