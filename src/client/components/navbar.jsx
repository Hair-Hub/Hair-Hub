import {Link} from 'react-router-dom'

export default function NavBar() {
    return <div className='linkBar'><nav>
    <Link to='/'></Link>
    <Link to='/login/register'></Link>
    <div className='icons'>
        <div>
        <Link className='loginLink' to='/login'><img className='icon' src='src/client/assets/woman.png'/></Link>
        </div>
        <div>
        <Link to='/items'><img className='icon' src='src/client/assets/toiletries.png' /></Link>
        </div>
    </div>
    
    
</nav></div>
    
}