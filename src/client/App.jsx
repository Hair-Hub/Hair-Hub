
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Login from './components/Login';
import NavBar from './components/navbar'
import HomePage from './components/HomePage'
import AllItems from './components/AllItems'
import SingleItem from './components/SingleItem'
import SignUp from './components/SignUp'
import Account from './components/Account'
import lotus from './assets/lotus-logo.png'
import AddItem from './components/AddItem.jsx'
import CommentForm from './components/CommentForm.jsx'
import ReviewForm from './components/ReviewForm.jsx'


import './style.css'
import './single-items.css'

function App() {
 const [token, setToken] = useState('')
console.log('token', token)
 useEffect(() => {
  const loginToken = localStorage.getItem('token')
  if (loginToken)
  setToken(loginToken)
 }, [])

  return (<>
    <div className='navbar'>
      <h1><a className='siteName' href='/'>Hair Haven</a></h1>
      <header>
        <img className='lotus' src={lotus}/>
    </header>
      <div>
      <NavBar />
      </div>
      </div>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/account' element={<Account token={token} />} />
    <Route path='/login' element={<Login setToken={setToken} />} />
    <Route path='/items' element={<AllItems/>} />
    <Route path ='/items/:id' element={<SingleItem setToken={setToken}/>} />
    <Route path ='/login/register' element={<SignUp/>} />
    <Route path ='/additem' element={<AddItem/>} />
    </Routes>
    
    </>
  );
}

export default App;
