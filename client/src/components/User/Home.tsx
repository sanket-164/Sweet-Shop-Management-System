import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container py-5">
        <div className='d-flex justify-content-center align-items-center' style={{height: '60vh'}}>
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Welcome to 🪔 Mithai Mandir</h1>
                <p className="lead">Indulge in traditional Indian sweets made with love and authenticity.</p>
                <Link to="/sweets" className="btn btn-primary btn-lg mt-3">
                Browse All Sweets
                </Link>
            </div>
        </div>
    </div>
  );
};

export default Home;
    