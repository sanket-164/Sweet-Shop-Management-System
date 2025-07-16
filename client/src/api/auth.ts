import axios from 'axios';

const authAPI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`
});

export const login = (email: String, password: String) => authAPI.post('/login', { email: email, password: password });
export const register = (name: String, email: String, password: String) => authAPI.post('/register', { name: name, email: email, password: password });