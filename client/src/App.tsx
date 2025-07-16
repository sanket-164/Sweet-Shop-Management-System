import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Authentication from './components/Authentication/Index'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
          {!loggedIn && <Authentication setLoggedIn={setLoggedIn}/>}
          {loggedIn && <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
            <h1>Welcome to the Sweet Shop!</h1></div>}
      </BrowserRouter>
    </>
  )
}

export default App
