import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Authentication from './components/Authentication/Index'
import User from './components/User/Index';
import Admin from './components/Admin/Index';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  return (
    <>
      <BrowserRouter>
          {!loggedIn && <Authentication setLoggedIn={setLoggedIn} setAdmin={setAdmin} />}
          {loggedIn && !admin && <User setLoggedIn={setLoggedIn} />}
          {admin && <Admin setLoggedIn={setLoggedIn} />}
      </BrowserRouter>
    </>
  )
}

export default App
