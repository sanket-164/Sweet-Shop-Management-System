import { Routes, Route } from 'react-router-dom';
import SweetList from './SweetList';

const User: React.FC = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<SweetList />}/>
            </Routes>
        </div>
    )
}

export default User