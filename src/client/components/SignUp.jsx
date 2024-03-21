import axios from 'axios'
import { useState } from 'react'

const SignUp = ({ setToken }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/api/users/register', {
                name,
                email,
                password
            });
            const data = response.data;
            console.log(data);
            
            setToken(data.token);
            setName('')
            setEmail('')
            setPassword('')
        } catch(error) {
            // Handle error response
           if (error.response) {
             console.log('Server responded with non-success status code');
              console.log('Status:', error.response.status);
              console.log('Data:', error.response.data);
            } else if (error.request) {
              console.log('Request made but no response received');
              console.log('Request:', error.request);
            } else {
              console.log('Error setting up request');
              console.log('Error:', error.message);
            }
          }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
           <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
           <label>Email</label>
           <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
           <label>Password</label>
           <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SignUp