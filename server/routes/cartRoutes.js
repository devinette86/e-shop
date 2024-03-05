import express from 'express';
import { getCartItems, addCartItem, deleteCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCartItems);
router.post('/:userId/add', addCartItem);
router.delete('/:userId/delete/:productId', deleteCartItem);
router.post('/:userId/increase/:itemId', increaseCartItemQuantity);
router.post('/:userId/decrease/:itemId', decreaseCartItemQuantity);

export default router;
