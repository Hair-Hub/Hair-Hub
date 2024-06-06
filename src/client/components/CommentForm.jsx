import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommentForm() {
  const [body, setBody] = useState('');
  const [comments, setComments] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = usteState('');
  const [parentId, setParentId] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const commentResponse = await axios.get(`/api/comments/${id}`);
          setComments(commentResponse.data);
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [id])
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/comments', {
        id,
        body,
        username,
        userId,
        parentId,
      });
      console.log('Comment posted:', response.data);
        setId('')
        setBody('')
        setUsername('')
        setUserId('')
        setParentId('')
    } catch (error) {
      console.error('Error posting comment:', error);
    }
    handleSubmit()
  };

 
}
