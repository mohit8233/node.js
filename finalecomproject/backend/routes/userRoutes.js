import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateUserSettings,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/me').get(protect, getUserProfile);
router.route('/update').patch(protect, updateUserProfile);
router.route('/settings').patch(protect, updateUserSettings);

export default router;
