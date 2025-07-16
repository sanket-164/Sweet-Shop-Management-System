import express from 'express';
import { addSweet, deleteSweet, getAllSweets, getSweetById, searchSweets, updateSweet } from '../controller/sweets';

const router = express.Router();

router.post('/', addSweet);
router.get('/', getAllSweets);
router.get('/search', searchSweets);

router.get('/:id', getSweetById);
router.put('/:id', updateSweet);
router.delete('/:id', deleteSweet);


export default router;