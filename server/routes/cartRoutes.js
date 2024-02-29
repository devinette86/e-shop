import express from 'express';
import { getCartItems, addCartItem, deleteCartItem } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCartItems);
router.post('/:userId/add', addCartItem);
router.delete('/:userId/delete/:productId', deleteCartItem);

export default router;
