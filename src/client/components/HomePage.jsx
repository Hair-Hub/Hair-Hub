import scroll1 from '../assets/red.jpg'
import scroll2 from '../assets/curly.webp'
import scroll3 from '../assets/1c8520cb5634bb92dc250fd1ee37f89d.png'
import scroll4 from '../assets/1000_F_116056127_HVwas5yIPJmO0AgL55B4VZUOPvAIfV5m.jpg'
import scroll5 from '../assets/stephylately.webp'
import scroll6 from '../assets/short.png'

export default function HomePage() {
    
    return <>
    <div>
        <h3>Discover New Products and Community Engagement,
             All While Finding What Works For You</h3>
    </div>

    <div className='scroll' >
        <ul class='hair-gallery'>
            <li>
                <img className='simg' src={scroll1} />
            </li>
            <li>
                <img className='simg' src={scroll2} />
            </li>
            <li>
                <img className='simg' src={scroll3} />
            </li>
            <li>
                <img className='simg' src={scroll4} />
            </li>
            <li>
                <img className='simg' src={scroll5} />
            </li>
            <li>
                <img className='simg' src={scroll6} />
            </li>
        </ul>
    </div>

    </>
}