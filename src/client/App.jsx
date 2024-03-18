
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import NavBar from './components/navbar'
import HomePage from './components/HomePage'
//import AllItems from './components/AllItems'
import SingleItem from './components/SingleItem'
import AllItems from './components/AllItems'

import './style.css'

function App() {
 

  return (<>
    <div className='navbar'>
      <h1>Hair Haven</h1>
      <header>
        <img className='lotus' src='https://www.pngfind.com/pngs/m/559-5596079_lotus-art-inspiration-vector-logo-design-download-pink.png'/>
    </header>
      <div>
      <NavBar />
      </div>
      </div>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
    <Route path='/login' element={<Login />} />
    <Route path='/items' element={<AllItems/>} />
    </Routes>
    
    </>
  );
}

export default App;
