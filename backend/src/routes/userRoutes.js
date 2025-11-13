import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile, uploadAvatar } from '../controllers/userController.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, getProfile);

// Update user profile
router.put('/profile', authenticate, updateProfile);

// Upload avatar
router.post('/profile/avatar', authenticate, uploadAvatar);

// Get all users (admin only)
router.get('/', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'All users' });
});

export default router;