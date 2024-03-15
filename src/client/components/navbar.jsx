import {Link} from 'react-router-dom'

export default function NavBar() {
    return <nav className='links'>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
        </nav>
    
}