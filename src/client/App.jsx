
import {Routes, Route} from 'react-router-dom'
import {useState} from 'react'
import Login from './components/Login';
import NavBar from './components/navbar'
import HomePage from './components/HomePage'
import AllItems from './components/AllItems'
import SingleItem from './components/SingleItem'
import SignUp from './components/SignUp'
import Account from './components/Account'


import './style.css'
import './single-items.css'

function App() {
 

  return (<>
    <div className='navbar'>
      <h1><a className='siteName' href='/'>Hair Haven</a></h1>
      <header>
        <img className='lotus' src='https://www.pngfind.com/pngs/m/559-5596079_lotus-art-inspiration-vector-logo-design-download-pink.png'/>
    </header>
      <div>
      <NavBar />
      </div>
      </div>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/Account' element={<Account />} />
    <Route path='/login' element={<Login />} />
    <Route path='/items' element={<AllItems/>} />
    <Route path ='/items/:id' element={<SingleItem/>} />
    <Route path ='/login/register' element={<SignUp/>} />
    </Routes>
    
    </>
  );
}

export default App;
