import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SweetList from './SweetList';
import OrderList from './OrderList';

type AdminProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Admin: React.FC<AdminProps> = ({ setLoggedIn }) => {
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
                        <Link className="navbar-brand" to="/">Sweet Shop</Link>
                        <Link className="navbar-brand" to="/sweets">Sweets</Link>
                        <Link className="navbar-brand" to="/orders">Orders</Link>
                        <Link className="navbar-brand" to="/resctocks">Restocks</Link>
                    </div>
                    <div>
                        <button className="btn btn-outline-danger" onClick={() => {handleLogout()}}>Logout</button>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path='/' element={<div> Admin Dashboard </div>} />
                <Route path='/sweets' element={<SweetList />} />
                <Route path='/orders' element={<OrderList />} />
                <Route path='/restocks' element={<div> Admin Dashboard </div>} />
            </Routes>
        </div>
    )
}

export default Admin