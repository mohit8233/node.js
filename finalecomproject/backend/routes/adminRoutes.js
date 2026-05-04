import express from 'express';
import {
  getSellerRequests,
  updateSellerRequestStatus,
  getPendingProducts,
  updateProductStatus,
} from '../controllers/adminController.js';
import { getSubscribers } from '../controllers/newsletterController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/seller-requests').get(protect, admin, getSellerRequests);
router.route('/seller-requests/:id').patch(protect, admin, updateSellerRequestStatus);

router.route('/pending-products').get(protect, admin, getPendingProducts);
router.route('/products/:id/status').patch(protect, admin, updateProductStatus);

router.route('/newsletter').get(protect, admin, getSubscribers);

export default router;
