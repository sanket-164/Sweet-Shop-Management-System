import express from 'express';
import { createOrder, getOrders, getOrdersByUserId } from '../controller/orders';

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUserId);

export default router;