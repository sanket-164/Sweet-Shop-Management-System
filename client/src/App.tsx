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
          {loggedIn? (admin ? <Admin setLoggedIn={setLoggedIn} /> : <User setLoggedIn={setLoggedIn} />): <Authentication setLoggedIn={setLoggedIn} setAdmin={setAdmin} />}
      </BrowserRouter>
    </>
  )
}

export default App;
