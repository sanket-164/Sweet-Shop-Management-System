import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

type AuthenticationProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Authentication: React.FC<AuthenticationProps> = ({ setLoggedIn, setAdmin }) => {
    return (
        <div className='container'>
            <Routes>
                <Route path="/" element={<Login setLoggedIn={setLoggedIn} setAdmin={setAdmin} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

export default Authentication