import axios from 'axios';

const ordersAPI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/orders`
});

export const createOrder = (userId: number, sweets: { sweetId: number; quantity: number }[]) => ordersAPI.post('/', { userId, sweets });
export const getOrders = () => ordersAPI.get('/', {});
export const getOrderByUserId = (id: number) => ordersAPI.get(`/${id}`, {});