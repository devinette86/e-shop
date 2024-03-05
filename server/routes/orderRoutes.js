import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/:userId', createOrder);

export default router;