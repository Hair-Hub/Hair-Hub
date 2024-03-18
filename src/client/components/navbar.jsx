import {Link} from 'react-router-dom'

export default function NavBar() {
    return <nav className='links'>
            <Link to='/'></Link>
            <Link to='/login'>Login</Link>
            <Link to='/items'>item</Link>
        </nav>
    
}