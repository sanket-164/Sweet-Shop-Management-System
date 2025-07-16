import express from 'express';
import { addSweet, deleteSweet, getAllSweets, getRestocks, getSweetById, restockSweet, searchSweets, updateSweet } from '../controller/sweets';

const router = express.Router();

router.post('/', addSweet);

router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.get('/restock', getRestocks);

router.get('/:id', getSweetById);
router.put('/:id', updateSweet);
router.delete('/:id', deleteSweet);

router.post('/restock/:id', restockSweet);

export default router;