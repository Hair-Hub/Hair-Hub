import {Link} from 'react-router-dom'

export default function NavBar() {
    return <div class='linkBar'><nav>
    <Link to='/'></Link>
    <Link class='loginLink' to='/login'><img class='icon' src='src/client/assets/woman.png'/></Link>
    <Link class='itemLink' to='/items'><img class='icon' src='src/client/assets/toiletries.png' /></Link>
</nav></div>
    
}