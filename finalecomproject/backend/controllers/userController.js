import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      avatar: user.avatar,
      role: user.role,
      sellerStatus: user.sellerStatus,
      notificationSettings: user.notificationSettings,
      privacySettings: user.privacySettings,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PATCH /api/profile/update
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.gender = req.body.gender || user.gender;
    user.dob = req.body.dob || user.dob;
    
    // Avatar upload logic will go here (Cloudinary integration)
    if (req.body.avatar) {
      user.avatar = req.body.avatar;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user settings (notifications/privacy)
// @route   PATCH /api/profile/settings
// @access  Private
export const updateUserSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.body.notificationSettings) {
      user.notificationSettings = req.body.notificationSettings;
    }
    if (req.body.privacySettings) {
      user.privacySettings = req.body.privacySettings;
    }

    await user.save();
    res.json({ message: 'Settings updated successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
