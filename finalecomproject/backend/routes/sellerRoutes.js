import express from 'express';
import {
  submitSellerRequest,
  getSellerRequestStatus,
  addProduct,
  getSellerProducts,
} from '../controllers/sellerController.js';
import { protect, seller } from '../middleware/authMiddleware.js';

const router = express.Router();

// User requests to become a seller
router.route('/request').post(protect, submitSellerRequest);
router.route('/request-status').get(protect, getSellerRequestStatus);

// Approved seller actions
router.route('/products').post(protect, seller, addProduct).get(protect, seller, getSellerProducts);

export default router;
