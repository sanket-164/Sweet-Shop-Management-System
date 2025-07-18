import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SweetList from './SweetList';
import CartPage from './CartPage';
import OrderList from './OrderList';
import Home from './Home';

type UserProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const User: React.FC<UserProps> = ({ setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/');
    }

    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div>
                        <Link className="navbar-brand" to="/"><span style={{ fontSize: '2rem' }}>🪔</span></Link>
                        <Link className="navbar-brand" to="/sweets">Sweets</Link>
                        <Link className="navbar-brand" to="/orders">Orders</Link>
                    </div>
                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-primary" to="/cart">Place Order</Link>
                        <button className="btn btn-outline-danger" onClick={() => {handleLogout()}}>Logout</button>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/sweets' element={<SweetList />}/>
                <Route path="/orders" element={<OrderList />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </div>
    )
}

export default User;