import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getSellerOrders,
} from '../controllers/orderController.js';
import { protect, seller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/seller').get(protect, seller, getSellerOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
