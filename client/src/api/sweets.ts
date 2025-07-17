import axios from 'axios';

const sweetsAPI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/sweets`
});

export const getAllSweets = () => sweetsAPI.get('/', {});
export const addSweet = (name: String, price: number, category: String, quantity: number) => sweetsAPI.post('/', { name, price, category, quantity  });
export const getSweetById = (id: number) => sweetsAPI.get(`/${id}`, {});
export const updateSweet = (id: number, name: String, price: number, category: String, quantity: number) => sweetsAPI.put(`/${id}`, { name, price, category, quantity });
export const deleteSweet = (id: number) => sweetsAPI.delete(`/${id}`, {});
export const searchSweets = (query: string) => sweetsAPI.get(`/search?${query}`);
export const restockSweet = (id: number, quantity: number) => sweetsAPI.post(`/restock/${id}`, { quantity });
export const getRestocks = () => sweetsAPI.get('/restocks', {});