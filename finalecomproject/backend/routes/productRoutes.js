import express from 'express';
import {
  getProducts,
  getProductBySlug,
} from '../controllers/productController.js';
import {
  createProductReview,
  getProductReviews,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:slug').get(getProductBySlug);
router.route('/:id/reviews').post(protect, createProductReview).get(getProductReviews);

export default router;
