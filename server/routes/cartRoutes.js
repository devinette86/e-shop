import express from 'express';
import { getCartItems, addCartItem, deleteCartItem } from '../controllers/cartController';

const router = express.Router();

router.get('/:userId/cart', getCartItems);
router.post('/:userId/add', addCartItem);
router.delete('/:userId/remove/:itemId', deleteCartItem);

export default router;
