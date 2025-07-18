import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { login } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

interface ResponseData {
  id: number;
  email: string;
  role: 'admin' | 'user';
}

type LoginProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setLoggedIn, setAdmin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { setUser } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    login(email, password)
      .then((response) => {
        console.log('Login successful:', response.data);
        const userData = response.data as ResponseData;
        setUser({
          id: userData.id,
          email: userData.email,
          role: userData.role
        });
        setAdmin(userData.role === 'admin');
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setError('Invalid email or password.');
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Login</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>
          <div className="text-center mt-3">
            <Link to="/register" className="text-decoration-none">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
