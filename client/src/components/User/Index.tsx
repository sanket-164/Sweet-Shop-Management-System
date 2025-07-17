import { Routes, Route, Link } from 'react-router-dom';
import SweetList from './SweetList';
import CartPage from './CartPage';

const User: React.FC = () => {
    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                <Link className="navbar-brand" to="/">Sweet Shop</Link>
                <div>
                    <Link className="btn btn-outline-primary" to="/cart">Cart</Link>
                </div>
                </div>
            </nav>
            <Routes>
                <Route path='/' element={<SweetList />}/>
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </div>
    )
}

export default User