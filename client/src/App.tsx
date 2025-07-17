import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Authentication from './components/Authentication/Index'
import User from './components/User/Index';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
          {!loggedIn && <Authentication setLoggedIn={setLoggedIn}/>}
          {loggedIn && <User />}
      </BrowserRouter>
    </>
  )
}

export default App
