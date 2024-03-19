import axios from 'axios'
import { useState } from 'react'

const SignUp = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/api/users', {
                name: username,
                email: email,
                password: password,
            });
            const data = response.data;
            console.log(data);
            
            setToken(data.token);
            
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
           <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
           <label>Email</label>
           <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
           <label>Password</label>
           <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SignUp